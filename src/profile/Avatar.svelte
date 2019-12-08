<script>
	import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
    import { loadCardboard, avatar as outlinePath} from '../utils/3D.js'

    let parent, container, scene, camera, renderer

    const onResize = (e) => {
        var positionInfo = renderer.domElement.getBoundingClientRect()
        var height = positionInfo.height
        var width = positionInfo.width
        renderer.setSize( height, width, false )
    }

    const render = () => renderer.render( scene, camera )

    const loadModel = () => {
        var loader = new GLTFLoader();
        renderer.render( scene, camera )
        loader.load(
            'models/avatar2/scene.gltf',
            ( gltf, a ,b  ) => {
                console.log(gltf, a, b)
                gltf.scene.position.set(0, 0, 2)
                // gltf.scene.scale.set(10,10,10)
                gltf.scene.scale.set(0.04,0.04,0.04)
                scene.add( gltf.scene );
                render()
            }
        )
    }

    onMount(() => {
        init()
        render()	
    })


    const init = () => {
        scene = new THREE.Scene();

        var positionInfo = parent.getBoundingClientRect()
        var height = positionInfo.height
        var width = positionInfo.width

        camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 )
        camera.position.set( 0, 9, 40 );

        const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
        directionalLight.position.set( 0.75, 0.75, 25.0 ).normalize();
        scene.add( directionalLight );

        const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.2 );
        scene.add( ambientLight );

        renderer = new THREE.WebGLRenderer({alpha: true, antialias: true})
        renderer.setSize( width, height, false )
        renderer.domElement.setAttribute("style", "width: 100%; height: 100%;");
        parent.appendChild( renderer.domElement )

        // const card = loadCardboard( outlinePath )
        // card.scale.set(0.026, 0.026, 0.026)

        // var pivotGeometry = new THREE.Geometry();
        // pivotGeometry.vertices.push(new THREE.Vector3( 0, 0, 0));
        // var pivotMaterial = new THREE.PointsMaterial( { size: 10, sizeAttenuation: false } );
        // var pivot = new THREE.Points( pivotGeometry, pivotMaterial );

        // pivot.add( card )

        // card.geometry.computeBoundingBox()
        // card.position.set(-3.5, 19.7, 0)
        // pivot.position.set(0, 0, 22)
        // pivot.rotateY(-0.1)

        // scene.add( pivot )
        // var box = new THREE.BoxHelper( card, 0xffff00 );
        // scene.add( box );
        
        loadModel()
    
        render()
        window.addEventListener('resize', onResize)

        // setTimeout( () =>
        //     setInterval(update, 1000/30)
        // , 1000)

        let rotation = 0;
        function update(){
            if (rotation < 0.25) {
                rotation += rotation / 10 + 0.005
                pivot.rotateX(rotation)
                renderer.render( scene, camera );
            }
        }
    }


</script>

<div id="wrapper" bind:this={parent}>
</div>

<style>
    #wrapper {
        height: 100%;
        width: 100%;
    }
</style>

