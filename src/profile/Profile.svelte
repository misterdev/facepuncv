<script>
    import Inventory from './Inventory.svelte'
</script>

<div id="wrapper">
    <div id="avatar">
    </div>
    <div id="inventory">
        <Inventory />
    </div>
    <div id="description">
    </div>
</div>

<style>
    #wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
    }
    #avatar {
        z-index: 3;
        /* background-color: red; */
        width: 100%;
    }
    #inventory {
        z-index: 1;
        width: 100%;
    }
    #description {
        z-index: 2;
        /* background-color: green; */
        width: 100%;
    }
</style>