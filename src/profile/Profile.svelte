<script>
    import Inventory from './Inventory.svelte'
    import Note from './Note.svelte'
    import Avatar from './Avatar.svelte'
    
    export let show
</script>

<div id="profile-w" class:active={show}>
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
    #profile-w {
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
		overflow: hidden;
        left: -50%;
        opacity: 0;
        transition: left 200ms, opacity 200ms;
    }
    #profile-w.active {
        left: 0%;
        opacity: 1;
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