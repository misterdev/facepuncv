<script>
    import { content } from '../stores/curriculum.js'
    import { selectedItem } from '../stores/navigation.js';

    let stats
    selectedItem.subscribe(({cat, item}) => {
        stats = content[cat][item].stats
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
        font-weight: bold;
    }
    .item {
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