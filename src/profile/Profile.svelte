<script>
    import Inventory from './Inventory.svelte'
    import Note from './Note.svelte'
    import Avatar from './Avatar.svelte'
    
    const slide = (node, { delay = 0, duration = 200}) => ({
            delay,
            duration,
            css: t => `left: -${(1 - t) * 100}%`
        })
</script>

<div id="wrapper" transition:slide>
    <div id="avatar">
        <Avatar />
    </div>
    <div id="inventory">
        <Inventory />
    </div>
    <div id="description">
        <Note />
    </div>
</div>

<style>
    #wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
		overflow: hidden;
    }
    #avatar {
        z-index: 3;
        width: 100%;
    }
    #inventory {
        z-index: 1;
        width: 100%;
    }
    #description {
        z-index: 2;
        width: 100%;
    }
</style>