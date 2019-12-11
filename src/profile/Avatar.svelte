<script>
	import { onMount } from 'svelte'
    import * as THREE from 'three'
    import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
    import { TGALoader } from 'three/examples/jsm/loaders/TGALoader'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

    import { loadCardboard, setWeight, executeCrossFade,
             avatar as outlinePath } from '../utils/3D.js'

    let parent, container, scene, camera, renderer
    let clock = new THREE.Clock();
    let mixer, actions = [], controls;

    onMount(() => {
        init()
        render()
        animate()
    })

    const onClick = () => {
        console.log('CLICKED', actions)
        actions[1].play()
        executeCrossFade(actions[0], actions[1], 0.5)
    }

    const onResize = (e) => {
        var positionInfo = renderer.domElement.getBoundingClientRect()
        var height = positionInfo.height
        var width = positionInfo.width
        renderer.setSize( height, width, false )
    }

    const render = () => renderer.render( scene, camera )

    const loadModel = () => new Promise((res, rej) => {
        var loader = new FBXLoader();
        loader.load( 'models/animated/idle.fbx', function ( object ) {
            mixer = new THREE.AnimationMixer( object );
            mixer.addEventListener( 'loop', (e) => {
                if ( e.action !== actions[0]) {
                    console.log('LOOP')
                    executeCrossFade(e.action, actions[0], 0.5)
                }
            })
            object.animations[ 2 ] = object.animations[ 0 ]
            actions[0] = mixer.clipAction( object.animations[ 0 ] );
            setWeight( actions[0], 1 );
            actions[0].play()

            object.traverse( function ( child ) {
                if ( child.isMesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.material = new THREE.MeshPhongMaterial({
                        color: 0xff0000,
                        skinning: true
                    })
                }
            })

            loader.load( 'models/animated/kicking.fbx', function ( object ) {
                actions[1] = mixer.clipAction( object.animations[ 0 ] )
                setWeight( actions[1], 0 )
                actions[1].setLoop( THREE.LoopPingPong  )
            })

            res(object)
        })
    })

    const init = () => {
        window.addEventListener('resize', onResize)

        scene = new THREE.Scene();

        var positionInfo = parent.getBoundingClientRect()
        var height = positionInfo.height
        var width = positionInfo.width

        camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 )
        camera.position.set( 0, 9, 9 );

        const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
        directionalLight.position.set( 0.75, 0.75, 25.0 ).normalize();
        scene.add( directionalLight );

        const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.2 );
        scene.add( ambientLight );

        renderer = new THREE.WebGLRenderer({alpha: true, antialias: true})
        renderer.setSize( width, height, false )
        renderer.domElement.setAttribute("style", "width: 100%; height: 100%;");
        parent.appendChild( renderer.domElement )

        // controls = new OrbitControls( camera, renderer.domElement );
        // controls.target.set( 0, 0, 0 );
        // controls.update();

        const pivotGeometry = new THREE.Geometry();
        pivotGeometry.vertices.push(new THREE.Vector3( 0, 0, 0));
        const pivotMaterial = new THREE.PointsMaterial( { size: 10, sizeAttenuation: false } );
        const pivot = new THREE.Points( pivotGeometry, pivotMaterial );
        
        const card = loadCardboard( outlinePath )
        card.scale.set(0.026, 0.026, 0.026)
        card.position.set(-3.5, 19.7, 0)
        pivot.add( card )

        pivot.position.set(0, 0, -9)
        pivot.rotateY(-0.1)
        scene.add( pivot )

        loadModel().then((object) => {
            object.scale.set(0.1, 0.1, 0.1) 
            object.position.set(0, 0, -16)
            scene.add( object )
        })
    
        render()
    }

    const animate = () => {
        requestAnimationFrame( animate );
        var delta = clock.getDelta();
        if ( mixer ) mixer.update( delta );
        renderer.render( scene, camera );
        // stats.update();
    }

</script>

<div id="wrapper" bind:this={parent} on:click|once={onClick}>
</div>

<style>
    #wrapper {
        height: 100%;
        width: 100%;
    }
</style>

