<script>
	import { onMount } from 'svelte';
    import * as THREE from 'three';

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

        var geometry = new THREE.BoxGeometry( 1, 1, 1 )
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
        var cube = new THREE.Mesh( geometry, material )
        scene.add( cube )

        camera.position.z = 5

        var animate = function () {
            requestAnimationFrame( animate )

            cube.rotation.x += 0.01
            cube.rotation.y += 0.01

            renderer.render( scene, camera )
        }
        animate()

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

