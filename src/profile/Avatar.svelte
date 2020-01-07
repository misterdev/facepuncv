<script>
	import { onMount } from 'svelte'
    import * as THREE from 'three'
    import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
    import { TGALoader } from 'three/examples/jsm/loaders/TGALoader'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
	import { createEventDispatcher } from 'svelte';
    
    import { loadCardboard,
             executeCrossFade, setWeight,
             avatar as outlinePath } from '../utils/3D.js'

    let parent, container, // DOM Elements
        scene, camera, renderer, cardboard, // 3D scene
        clock = new THREE.Clock(),
        mixer, actions = [], controls // Animations

    const textures = {
        face: 'https://res.cloudinary.com/misterdev/image/upload/v1577295092/facepuncv/textures/devide.png',
        cardboard: 'https://res.cloudinary.com/misterdev/image/upload/v1577295091/facepuncv/textures/cardboard.png',
        pdf: 'https://res.cloudinary.com/misterdev/image/upload/v1577294993/facepuncv/textures/pdf.png'
    }

    let doneIntro = false
	const dispatch = createEventDispatcher()

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
        requestAnimationFrame( animate )
        var delta = clock.getDelta();
        if ( mixer ) mixer.update( delta )
        renderer.render( scene, camera )
        if (kicked && cardboard.rotation.x < 3) {
            cardboard.position.z += .25
            cardboard.position.y -= .04
            cardboard.rotation.x += .1
            cardboard.rotation.y -= .02
            cardboard.rotation.z += .005
        } else if (kicked) {
            scene.remove( cardboard )
        }
    }

    const onClick = () => {
        if (!doneIntro) {
            doneIntro = true
            actions[1].play()
            executeCrossFade(actions[0], actions[1], 0.5)
            setTimeout(() => {
                dispatch('shake')
                kicked = true
            }, 1000)
        } else {
            fetch('docs/cv.pdf')
                .then(resp => resp.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    // the filename you want
                    a.download = 'cv-devid-farinelli.pdf';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                })
        }
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
        
        const card = loadCardboard( outlinePath, textures.cardboard )
        card.name = 'cardboard'
        card.scale.set(0.026, 0.026, 0.026)
        
        const cardboardGeometry = new THREE.Geometry();
        cardboard = new THREE.Points( cardboardGeometry );
        cardboard.add( card )

        card.position.set(-3.5, 19.7, 0)
        cardboard.position.set(0, 0, -9)
        cardboard.rotateY(-0.1)
        // scene.add( cardboard )

        loadModel().then((model) => {
            scene.add( model )
            model.scale.set(.13, .13, .13) 
            model.position.set(0, 0, -18)
        })
        render()
    }

    const loadModel = () => new Promise((resolve, reject) => {
        var loader = new FBXLoader();
        loader.load( 'models/animated/idle.fbx', ( object ) => {
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
                }
            })

            // Load kicking animation
            loader.load( 'models/animated/kicking.fbx', function ( object ) {
                actions[1] = mixer.clipAction( object.animations[ 0 ] )
                setWeight( actions[1], 0 )
                actions[1].setLoop( THREE.LoopPingPong  )
            })
            
            // Loads mask
            let maskTexture, maskMaterial, maskMesh
            const maskWidth = 336, maskHeight = 443

            maskTexture = new THREE.TextureLoader().load( textures.face )
            maskTexture.wrapS = THREE.RepeatWrapping
            maskTexture.wrapT = THREE.RepeatWrapping
            maskMaterial = new THREE.MeshLambertMaterial({
                map : maskTexture,
                alphaTest: 0.5
            })

            maskMesh = new THREE.Mesh(new THREE.PlaneGeometry(maskWidth, maskHeight), maskMaterial)
            maskMesh.material.side = THREE.DoubleSide
            maskMesh.translateX( - maskWidth / 2 )
            maskMesh.translateY( - maskHeight / 2 )
            maskMesh.translateZ( -1 )
            object.children[1].skeleton.getBoneByName("mixamorigHead").add(maskMesh)
            maskMesh.position.set(0, 6, 14)
            maskMesh.scale.set(.07, .07, .07)

            // Load PDF Icon
            let pdfTexture, pdfMaterial, pdfMesh
            const pdfWidth = 336, pdfHeight = 336

            pdfTexture = new THREE.TextureLoader().load( textures.pdf )
            pdfTexture.wrapS = THREE.RepeatWrapping
            pdfTexture.wrapT = THREE.RepeatWrapping
            pdfMaterial = new THREE.MeshLambertMaterial({
                map : pdfTexture,
                alphaTest: 0.5
            })

            pdfMesh = new THREE.Mesh(new THREE.PlaneGeometry(pdfWidth, pdfHeight), pdfMaterial)
            pdfMesh.material.side = THREE.DoubleSide
            pdfMesh.translateX( - pdfWidth / 2 )
            pdfMesh.translateY( - pdfHeight / 2 )
            pdfMesh.translateZ( -1 )
            object.children[1].skeleton.getBoneByName("mixamorigRightHandIndex1").add(pdfMesh)
            pdfMesh.position.set(-6, 0, 3.5)
            pdfMesh.scale.set(.07, .07, .07)
            pdfMesh.rotation.x = .80

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
        cursor: pointer;
    }
</style>

