<script>
    import {navigation, content} from '../stores/crafting.js'

    let stats
    navigation.subscribe(({cat, selected}) => {
        stats = content[cat][selected].stats
    })
</script>

<div id="wrapper">
    <div id="header" class="item">
        <div>AMOUNT</div>
        <div>SKILL</div>
    </div>
    {#each stats as {label, count}}
        <div class="item">
            <div>{count}</div>
            <div>{label}</div>
        </div>
    {/each}
</div>

<style>
    #wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    #header {
        font-size: calc(5% + 1vmin);
        font-weight: bold;
    }
    .item {
        font-size: calc(70% + 1vmin);
        display: flex;
        flex-direction: row;
    }
    .item > div {
        margin: .5px;
        padding: .5% 1%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
    }
    .item:not(#header) > div {
        background-color: rgba(0,0,0,.3);
        font-size: 50%;
    }
    #header.item > div:nth-child(1) {
        justify-content: center;
    }
    .item > div:nth-child(1) {
        flex-basis: 25%;
        justify-content: flex-end;
    }
    .item > div:nth-child(2) {
        flex-basis: 75%;
    }
</style>