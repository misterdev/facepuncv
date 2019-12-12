<script>
	import { navigation } from './stores/navigation.js'
	import Profile from './profile/Profile.svelte'
	import Curriculum from './curriculum/Curriculum.svelte'
	import Belt from './Belt.svelte'
	import NavButton from './NavButton.svelte'

	export let name
	let idleSrc = 'videos/idle.mp4'
	let introSrc = 'videos/intro.mp4'
	let bgSrc = 'videos/bg.mp4'
	let poster = 'https://static.gamespot.com/uploads/original/1406/14063904/3353523-20180211195717_1.jpg'
	
	let showProfile
	navigation.subscribe((nav) => showProfile = nav.profile)

	let idle, intro, bg, content 

	const playIntro = () => {
		intro.play();
		setTimeout(() => {
			intro.style.opacity = 1
			idle.remove()
		}, 100)
	}

	const playBg = () => {
		bg.play();
		setTimeout(() => {
			content.classList.remove('hidden')
			bg.style.opacity = 1
			intro.remove()
		}, 100)
	}
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Permanent+Marker&display=swap" rel="stylesheet">
</svelte:head>
<svelte:window on:keydown|once={playIntro} />
<div class="wrapper">
	<div class="rateo16-9">
		<video src={idleSrc} {poster} muted autoplay loop bind:this={idle}/>
	</div>
	<div class="rateo16-9">
		<video id="bg" src={introSrc} muted bind:this={intro} on:ended|once={playBg}/> 
	</div>
	<div class="rateo16-9">
		<video id="bg" src={bgSrc} muted bind:this={bg} /> 
	</div>
	<div id="content" class="rateo16-9 " bind:this={content}>
		<div id="header">
			<NavButton />
		</div>
		<div id="component">
			<Profile show={showProfile} />
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
	video {
		width: 100%;
		height: 100%;
		transform: scale(1.05);
	}
	#bg {
		opacity: 0;
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
		position: absolute;
		background-color: rgba(0,0,0,.5);
		overflow: hidden;
        opacity: 1;
		transform: translateX(0%);
        transition: transform 200ms, opacity 200ms, background-color 1000ms;
	}
	#content.hidden {
		transform: translateX(-50%);
        opacity: 0;
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