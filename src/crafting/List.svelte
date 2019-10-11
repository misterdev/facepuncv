<script>
    import { navigation, content } from '../stores/crafting.js'
    let items;
    let selected;

    navigation.subscribe(nav => {
        items = content[nav.cat]
        selected = nav.selected
    })

    const selectItem = (index) => {
        navigation.update(({cat, selected}) => ({cat, selected: index}))
    }
</script>

<div class="wrapper">
    {#each items as { label, icon}, i}
        <div class="item" on:click={() => selectItem(i)}>
            <img src={icon} alt="icon" />
        </div>
    {/each}
</div>

<style>
    .wrapper {
        position: absolute;
        width: 100%;
        padding-top: 2%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-start;
    }
    .item {
        margin: 1%;
        flex-basis: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .item:before {
        content:'';
        float:left;
        padding-top:100%;
    }
    .item:hover {
        background-color: rgba(255,255,255,.2);
    }
    .item img {
        max-width: 60%;
    }
</style>