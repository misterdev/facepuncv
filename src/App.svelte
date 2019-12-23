<script>
	import { navigation } from './stores/navigation.js'
	import Profile from './profile/Profile.svelte'
	import Curriculum from './curriculum/Curriculum.svelte'
	import Belt from './Belt.svelte'
	import NavButton from './NavButton.svelte'

	export let name
	let idleSrc = 'videos/idle.mp4',
		introSrc = 'videos/intro.mp4',
		bgSrc = 'videos/bg-loop.mp4',
		poster = 'images/idle.jpeg'
	
	let showProfile
	navigation.subscribe((nav) => showProfile = nav.profile)

	let idle, intro,introParent, bg, content
	let isStarted = false

	const playIntro = () => {
		if (isStarted) return
		isStarted = true
		intro.play();
		setTimeout(() => {
			intro.style.opacity = 1
			idle.remove()
			document.getElementById('loading-w').remove()
		}, 100)
		setTimeout(() => {
			content.classList.remove('hidden')
			intro.classList.add('blurred')
		}, 4500)
	}

	const playBg = () => {
		bg.play();
		setTimeout(() => {
			bg.style.opacity = 1
			introParent.remove()
		}, 100)
	}

	let shake = false
	const onShake = () => shake = true
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Permanent+Marker&display=swap" rel="stylesheet">
</svelte:head>
<svelte:window on:keydown|once={playIntro} on:click|once={playIntro}/>
<div class={shake ? 'wrapper shake' : 'wrapper'} >
	<div class="rateo16-9" bind:this={idle}>
		<video src={idleSrc} {poster} muted autoplay loop />
	</div>
	<div class="rateo16-9" bind:this={introParent}>
		<video class="hidden" src={introSrc} muted bind:this={intro} on:ended|once={playBg}/> 
	</div>
	<div class="rateo16-9">
		<video class="hidden blurred" src={bgSrc} loop muted bind:this={bg} /> 
	</div>
	<div id="content" class="rateo16-9 hidden" bind:this={content}>
		<div id="header">
			<NavButton />
		</div>
		<div id="component">
			<Profile show={showProfile} on:shake={onShake} />
			<Curriculum show={!showProfile} />
		</div>
		<div id="footer">
			<Belt />
		</div>
	</div>
</div>

<style>
	.wrapper {
		position: absolute;
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
    .shake {
		transform: translate3d(0, 0, 0);
		animation: shake 0.6s cubic-bezier(.36,.07,.19,.97) both;
    }
	video {
		width: 100%;
		height: 100%;
		transform: scale(1.05);
	}
	.hidden {
		opacity: 0;
	}
	.blurred {
		-webkit-filter: blur(7px);
		filter: blur(7px);
	}
	.rateo16-9 {
		position: absolute;
		overflow: hidden;
		width: 100vw;
		height: 56.25vw;
		max-width: 177.78vh;
		max-height: 100vh;
	}
	#content {
		transform: translate3d(0, 0, 0);
		position: absolute;
		background-color: rgba(0,0,0,.5);
		overflow: hidden;
        opacity: 1;
		transform: translateX(0%);
        transition: transform 200ms, opacity 200ms, background-color 1000ms;
	}
	#content.hidden {
		opacity: 0;
		transform: translateX(-50%);
		background-color: rgba(0,0,0,0);
	}
	#header {
		position: absolute;
		top: 0;
		width: 100%;
		height: 6.3%;
		display: flex;
		justify-content: center;
		z-index: 100;
	}
	#component {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	#footer {
		position: absolute;
		bottom: 2%;
		width: 100%;
		z-index: 100;
	}
</style>