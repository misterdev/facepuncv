<div id="wrapper" bind:this={parent} on:click={onClick}>
</div>

<style>
    #wrapper {
        height: 100%;
        width: 100%;
        cursor: pointer;
    }
</style>

<script>
	import { onMount } from 'svelte'
    import * as THREE from 'three'
	import { selectedPage } from '../stores/navigation.js'
    import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
	import { createEventDispatcher } from 'svelte'

    import { loadCardboard,
             executeCrossFade, setWeight,
             avatar as outlinePath } from '../utils/3D.js'

    export let started

    let parent, container, // DOM Elements
        scene, camera, renderer, cardboard, // 3D scene
        clock = new THREE.Clock(),
        mixer, actions = [], controls // Animations

    let faceTexture, blinkFaceTexture, maskMesh
    const textures = {
        blink: 'https://res.cloudinary.com/misterdev/image/upload/v1579212694/facepuncv/textures/devide-blink.png',
        face: 'https://res.cloudinary.com/misterdev/image/upload/v1577295092/facepuncv/textures/devide.png',
        cardboard: 'https://res.cloudinary.com/misterdev/image/upload/v1577295091/facepuncv/textures/cardboard.png',
        pdf: 'https://res.cloudinary.com/misterdev/image/upload/v1577294993/facepuncv/textures/pdf.png',
        base: 'textures/base.png',
        bump: 'textures/bump.png',
        emissive: 'textures/emissive.png',
    }

    let doneKick = false, kicked = false
    const dispatch = createEventDispatcher()

    let pauseAnimate
    selectedPage.subscribe((show) => {
        pauseAnimate = !show
        if (show && doneKick) setTimeout(() => animate(), 400)
    })

    $: if (started) {
        if ( mixer ) mixer.update( clock.getDelta() )
        renderer.render( scene, camera )
        setTimeout(() => animate(), 4500)
    }

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

    let now, then = Date.now(), elapsed, fpsInterval = 1000/30,
        openEyes = true, lastBlink = Date.now()

    function animate() {
        if (!pauseAnimate) requestAnimationFrame( animate )
        now = Date.now()
        elapsed = now - then

        if (openEyes) {
            if (now - lastBlink > 4100) {
                maskMesh.material.map = blinkFaceTexture
                lastBlink = Date.now()
                openEyes = false
            }
        } else {
            if (now - lastBlink > 100) {
                maskMesh.material.map = faceTexture
                openEyes = true
            }
        }

        if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval)
            var delta = clock.getDelta()
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
    }

    let lastDownload = Date.now()
    const onClick = () => {
        if (!doneKick) {
            doneKick = true
            actions[1].play()
            executeCrossFade(actions[0], actions[1], 0.5)
            setTimeout(() => {
                dispatch('shake')
                kicked = true
            }, 1000)
        } else {
            if ( Date.now() - lastDownload > 4000 ) {
                actions[2].play()
                executeCrossFade(actions[0], actions[2], 0.5)
                lastDownload = Date.now()
                fetch('docs/cv.pdf')
                    .then(resp => resp.blob())
                    .then(blob => {
                        const url = window.URL.createObjectURL(blob)
                        const a = document.createElement('a')
                        a.style.display = 'none'
                        a.href = url
                        a.download = 'cv-devid-farinelli.pdf'
                        document.body.appendChild(a)
                        a.click()
                        window.URL.revokeObjectURL(url)
                    })
            }
        }
    }

    async function init () {
        window.addEventListener('resize', onResize)

        scene = new THREE.Scene()

        var positionInfo = parent.getBoundingClientRect()
        var height = positionInfo.height
        var width = positionInfo.width

        camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 )
        camera.position.set( 0, 9, 9 )

        const directionalLight = new THREE.DirectionalLight( 0xffffff, .8 )
        directionalLight.position.set(0, 9, 9)
        scene.add( directionalLight )

        const ambientLight = new THREE.AmbientLight( 0xffffff, .5 )
        scene.add( ambientLight )

        renderer = new THREE.WebGLRenderer({alpha: true, antialias: true})
        renderer.setSize( width, height, false )
        renderer.domElement.setAttribute("style", "width: 100%; height: 100%;")
        parent.appendChild( renderer.domElement )
        
        const card = loadCardboard( outlinePath, textures.cardboard )
        card.name = 'cardboard'
        card.scale.set(0.026, 0.026, 0.026)
        
        const cardboardGeometry = new THREE.Geometry()
        cardboard = new THREE.Points( cardboardGeometry )
        cardboard.add( card )

        card.position.set(-3.5, 19.7, 0)
        cardboard.position.set(0, 0, -9)
        cardboard.rotateY(-0.1)
        scene.add( cardboard )

        const onLoadIdle = ( e ) => {
            let object = loader.parse(e.target.result)
            const map = new THREE.TextureLoader().load( textures.base )
            const normalMap = new THREE.TextureLoader().load( textures.bump )
            const emissiveMap = new THREE.TextureLoader().load( textures.emissive )
            const mat = new THREE.MeshPhongMaterial({
                skinning: true,
                map,
                normalMap,
                shininess: 30,
                color: 0xffffff
            })
            mat.emissiveMap = emissiveMap
            mat.emissive = new THREE.Color(0, 1, 0)
            mat.emissiveIntensity = 3

            object.children[1].material = mat
            object.children[0].rotation.x = 0
            object.rotation.x = -1.632231916

            // Loads mask
            const maskWidth = 336, maskHeight = 443

            faceTexture = new THREE.TextureLoader().load( textures.face )
            faceTexture.wrapS = THREE.RepeatWrapping
            faceTexture.wrapT = THREE.RepeatWrapping
            faceTexture.repeat.x = -1
            blinkFaceTexture = new THREE.TextureLoader().load( textures.blink )
            blinkFaceTexture.wrapS = THREE.RepeatWrapping
            blinkFaceTexture.wrapT = THREE.RepeatWrapping
            blinkFaceTexture.repeat.x = -1
            let maskMaterial = new THREE.MeshLambertMaterial({
                map : faceTexture,
                alphaTest: 0.5
            })

            maskMesh = new THREE.Mesh(new THREE.PlaneGeometry(maskWidth, maskHeight), maskMaterial)
            maskMesh.material.side = THREE.DoubleSide
            maskMesh.translateX( - maskWidth / 2 )
            maskMesh.translateY( - maskHeight / 2 )
            maskMesh.translateZ( -1 )
            console.log(object)
            object.children[0].children[0] // Group.pelvis
                .children[0].children[0].children[0] // spine 1, 2, 3
                .children[2].children[0].add(maskMesh)
            maskMesh.position.set(5, -14, -3.6)
            maskMesh.scale.set(.075, .065, .06)
            maskMesh.rotation.z = -1.55
            maskMesh.rotation.x = -1.5


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
            object.children[0].children[0] // Group.pelvis
                .children[0].children[0].children[0] // spine 1, 2, 3
                .children[1].children[0].children[0] // clavicle_r, upperarm, lowerarm
                .children[0] // hand
                .add(pdfMesh)
            pdfMesh.position.set(-20, -4, 10)
            pdfMesh.scale.set(.07, .07, .07)
            pdfMesh.rotation.x = .80
            pdfMesh.rotation.y = .30

            let parent = new THREE.Group()
            parent.scale.set(.13, .13, .13)
            parent.position.set(0, 0, -18)
            parent.add(object)
            scene.add(parent)

            mixer = new THREE.AnimationMixer(object)
            mixer.addEventListener( 'loop', (e) => {
                if ( e.action !== actions[0]) {
                    executeCrossFade(e.action, actions[0], 0.5)
                }
            })

            actions[0] = mixer.clipAction( object.animations[0] )
            setWeight( actions[0], 1 );
            actions[0].play()
        }

        const onLoadKicking = (e) => {
            let object = loader.parse(e.target.result)
            actions[1] = mixer.clipAction( object.animations[0] )
            setWeight( actions[1], 0 )
            actions[1].setLoop( THREE.LoopPingPong  )
       }

        const onLoadLookaround = (e) => {
            let object = loader.parse(e.target.result)
            actions[2] = mixer.clipAction( object.animations[0] )
            setWeight( actions[2], 0 )
            actions[2].setLoop( THREE.LoopRepeat )
       }
        

        let idleAnimation
        const manager = new THREE.LoadingManager()
        const loader = new FBXLoader( manager )

        let reader = new FileReader()
        reader.addEventListener( 'load', onLoadIdle, false)
        let idleBlob = await fetch( 'models/nomat/left/idle.fbx' ).then(r => r.blob())
        reader.readAsArrayBuffer(idleBlob)

        reader = new FileReader()
        reader.addEventListener( 'load', onLoadKicking, false)
        let kickingBlob = await fetch( 'models/nomat/left/kicking.fbx' ).then(r => r.blob())
        reader.readAsArrayBuffer(kickingBlob)

        reader = new FileReader()
        reader.addEventListener( 'load', onLoadLookaround, false)
        let lookaroundBlob = await fetch( 'models/nomat/left/lookaround.fbx' ).then(r => r.blob())
        reader.readAsArrayBuffer(lookaroundBlob)
    }

</script>
