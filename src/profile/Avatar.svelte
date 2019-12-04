<script>
	import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
    import { loadSVG, avatar } from '../utils/3D.js'

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
            'models/avatar/scene.gltf',
            ( gltf,a ,b  ) => {
                console.log(gltf, a, b)
                gltf.scene.position.set(0, 0, 2)
                gltf.scene.scale.set(10,10,10)
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
        // scene.background = new THREE.Color( 0xb0b0b0 ); //

        var positionInfo = parent.getBoundingClientRect()
        var height = positionInfo.height
        var width = positionInfo.width

        camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 )
        camera.position.set( 0, 9, 40 );

        const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
        directionalLight.position.set( 0.75, 0.75, 1.0 ).normalize();
        scene.add( directionalLight );

        const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.2 );
        scene.add( ambientLight );

        // const helper = new THREE.GridHelper( 160, 10 );
        // helper.rotation.x = Math.PI / 2;
        // scene.add( helper );

        renderer = new THREE.WebGLRenderer({alpha: true, antialias: true})
        renderer.setSize( width, height, false )
        renderer.domElement.setAttribute("style", "width: 100%; height: 100%;");
        parent.appendChild( renderer.domElement )

        const card = loadSVG( scene, avatar )
        card.scale.set(0.026, 0.026, 0.026)
        card.position.set(-3.5, 19, 11)
        
        loadModel()
        render()
        window.addEventListener('resize', onResize)
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

