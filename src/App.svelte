<script>
	import { navigation } from './stores/navigation.js'
	import Profile from './profile/Profile.svelte'
	import Curriculum from './curriculum/Curriculum.svelte'
	import Belt from './Belt.svelte'
	import NavButton from './NavButton.svelte'

	    
    const appear = (node, { delay = 0, duration = 600}) => ({
		delay,
		duration,
		css: t => `opacity: ${t}`
	});

	const blur = (node, { delay = 0, duration = 600, amount = 6}) => ({
		delay,
		duration,
		css: t => 
			`filter: blur(${t * amount}px);` +
			`-webkit-filter: blur(${t * amount}px);`
	});

	export let name;
	let src = 'videos/bg.mp4'
	// let src = 'https://sveltejs.github.io/assets/caminandes-llamigos.mp4'
	let poster = 'https://static.gamespot.com/uploads/original/1406/14063904/3353523-20180211195717_1.jpg'
	let selected = Profile
	navigation.subscribe(({profile}) => selected = profile ? Profile : Curriculum)
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Permanent+Marker&display=swap" rel="stylesheet">
</svelte:head>
<div class="wrapper">
	<div id="video-wrapper" class="rateo16-9">
		<video {src} {poster} autoplay muted transition:blur/>
	</div>
	<div id="content" transition:appear class="rateo16-9">
		<div id="header">
			<NavButton />
		</div>
		<div id="component">
			<svelte:component this={selected} />
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
		filter: blur(6px);
		-webkit-filter: blur(6px);
		transform: scale(1.05);
		background: url('http://api.thumbr.it/whitenoise-361x370.png?background=ffffff00&noise=000000&density=80&opacity=10');
	}
	#video-wrapper {
		overflow: hidden;
	}
	.rateo16-9 {
		width: 100vw;
		height: 56.25vw;
		max-width: 177.78vh;
		max-height: 100vh;
	}
	#content {
		position: absolute;
		background-color: rgba(0,0,0,.5);
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