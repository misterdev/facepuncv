<script>
    import Inventory from './Inventory.svelte'
    import Note from './Note.svelte'
    import Avatar from './Avatar.svelte'
    
    export let show
    export let started
</script>

<div id="profile-w" class:active={show}>
    <div id="avatar">
        <Avatar {started} on:shake />
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
        transition: left 100ms;
    }
    #profile-w.active {
        left: 0%;
        opacity: 1;
    }
    #avatar {
        z-index: 3;
        width: 100%;
    }
    #avatar:after{
        content: 'Devid Farinelli';
        position: fixed;
        top: 11%;
        right: 66%;
        font-size: 1.3em;
        font-weight: bold;
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