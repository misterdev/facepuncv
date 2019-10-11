<script>
	import Inventory from './inventory/Inventory.svelte'
	import Crafting from './crafting/Crafting.svelte'
	import Equipped from './Equipped.svelte'
	export let name;
	let src = 'https://sveltejs.github.io/assets/caminandes-llamigos.mp4'
	// let src = 'https://video.xx.fbcdn.net/v/t42.9040-2/68135311_2342255342534112_4239331015497089024_n.mp4?_nc_cat=108&efg=eyJ2ZW5jb2RlX3RhZyI6InN2ZV9zZCJ9&_nc_oc=AQnD8UbJiLvZ7DpjjSWnxGYR_HSynb8VXzKOwyjkyvpEW_NiLXnDJqGTFA5FGj6Go4E&_nc_ht=video-mxp1-1.xx&oh=70776a3ab340b170f6c9e49d80f9fce7&oe=5D98ECE8'
	let img = 'https://static.gamespot.com/uploads/original/1406/14063904/3353523-20180211195717_1.jpg'
	let selected = Crafting
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet">
</svelte:head>
<div class="wrapper">
	<video {src} poster={img} muted/>
	<div id="content">
		<svelte:component this={selected} />
		<div id="footer">
			<Equipped />
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
		background-color: black;
	}
	video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		filter: blur(6px);
		-webkit-filter: blur(6px);
	}
	#content {
		position: absolute;
		width: 100vw;
		height: 56.25vw;
		max-width: 177.78vh;
		max-height: 100vh;
	}
	#footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		margin-bottom: 1%;
	}
</style>