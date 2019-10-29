<script>
	import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

    let parent
    let camera
    let renderer

    const onResize = (e) => {
        var positionInfo = renderer.domElement.getBoundingClientRect()
        var height = positionInfo.height
        var width = positionInfo.width
        renderer.setSize( height, width, false )
    }

    onMount(() => {
        var scene = new THREE.Scene()

        var positionInfo = parent.getBoundingClientRect()
        var height = positionInfo.height
        var width = positionInfo.width

        camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 )

        renderer = new THREE.WebGLRenderer({alpha: true})
        renderer.setSize( width, height, false )
        renderer.domElement.setAttribute("style", "width: 100%; height: 100%;");
        parent.appendChild( renderer.domElement )

        var directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
        scene.add( directionalLight );

        var loader = new GLTFLoader();

        camera.position.z = 4
        camera.position.y = 1
        renderer.render( scene, camera )

        loader.load(
            'models/avatar/scene.gltf',
            ( gltf,a ,b  ) => {
                console.log(gltf, a, b)
                gltf.scene.position.set(0, 0, 2)
                gltf.scene.scale.set(1,1,1)
                scene.add( gltf.scene );
                renderer.render( scene, camera )   
            }
        )
            
        window.addEventListener('resize', onResize)
    })
</script>

<div id="wrapper" bind:this={parent}>
</div>

<style>
    #wrapper {
        height: 100%;
        width: 100%;
    }
</style>

