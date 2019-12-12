<script>
	import { onMount } from 'svelte'
    import * as THREE from 'three'
    import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
    import { TGALoader } from 'three/examples/jsm/loaders/TGALoader'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

    import { loadCardboard,
             executeCrossFade, setWeight,
             avatar as outlinePath } from '../utils/3D.js'

    let parent, container, // DOM Elements
        scene, camera, renderer, pivot, // 3D scene
        clock = new THREE.Clock(),
        mixer, actions = [], controls; // Animations

    onMount(() => {
        init()
        render()
        animate()
    })

    const render = () => renderer.render( scene, camera )
    const onResize = (e) => {
        var positionInfo = renderer.domElement.getBoundingClientRect()
        var height = positionInfo.height
        var width = positionInfo.width
        renderer.setSize( height, width, false )
    }

    let kicked

    function animate() {
        requestAnimationFrame( animate );
        var delta = clock.getDelta();
        if ( mixer ) mixer.update( delta );
        renderer.render( scene, camera );
        if (kicked && pivot.rotation.x < 3) {
            pivot.position.z += .25
            pivot.position.y -= .04
            pivot.rotation.x += .1
            pivot.rotation.y -= .02
            pivot.rotation.z += .005
        }    
    }

    const onClick = () => {
        console.log('CLICKED', actions)
        actions[1].play()
        executeCrossFade(actions[0], actions[1], 0.5)
        setTimeout(() => kicked = true, 1000)
    }

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

        const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.3 );
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
        console.log(card)
        var pivotGeometry = new THREE.Geometry();
        pivotGeometry.vertices.push(new THREE.Vector3( 0, 0, 0));
        var pivotMaterial = new THREE.PointsMaterial( { size: 10, sizeAttenuation: false } );
        pivot = new THREE.Points( pivotGeometry, pivotMaterial );

        pivot.add( card )

        pivot.position.set(0, 0, -9)
        pivot.rotateY(-0.1)
        scene.add( pivot )

        scene.add( pivot )

        loadModel().then((object) => {
            scene.add( object )
            object.scale.set(0.13, 0.13, 0.13) 
            object.position.set(0, 0, -18)
        })
    
        render()
    }

    const loadModel = (cb) => new Promise((resolve, reject) => {
        var loader = new FBXLoader();
        loader.load( 'models/animated/idle.fbx', function ( object ) {
            mixer = new THREE.AnimationMixer( object );
            mixer.addEventListener( 'loop', (e) => {
                if ( e.action !== actions[0]) {
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
                    // child.material = new THREE.MeshPhongMaterial({
                    //     color: 0xff0000,
                    //     skinning: true
                    // })
                }
            })

            // Load kicking animation
            loader.load( 'models/animated/kicking.fbx', function ( object ) {
                actions[1] = mixer.clipAction( object.animations[ 0 ] )
                setWeight( actions[1], 0 )
                actions[1].setLoop( THREE.LoopPingPong  )
            })
            resolve(object)
        })
    })

</script>

<div id="wrapper" bind:this={parent} on:click={onClick}>
</div>

<style>
    #wrapper {
        height: 100%;
        width: 100%;
    }
</style>

