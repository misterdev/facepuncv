<script>
    import { content } from '../stores/curriculum.js'
    import { selectedItem } from '../stores/navigation.js';
    import { play, stop } from '../stores/audio.js'

    let items;
    let selected;

    selectedItem.subscribe(({cat, item}) => {
        items = content[cat]
        selected = item
    })

    const selectItem = (index) => {
        selectedItem.update(({cat, item}) => ({cat, item: index}))
    }
</script>

<div class="wrapper">
    {#each items as { label, icon}, i}
        <div
            class="item"
            class:active={selected === i}
            on:click={() => selectItem(i)}
            on:mouseenter={play}
            on:mouseleave={stop}>
            <div class="label">{label}</div>
            <img src={icon} alt={label} />
        </div>
    {/each}
</div>

<style>
    .wrapper {
        position: absolute;
        width: 100%;
        padding-top: 6%;
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
    .item.active {
        background-color: rgba(255,255,255,.1);
    }
    .item:before {
        content:'';
        float:left;
        padding-top:100%;
    }
    .item:hover {
        background-color: rgba(255,255,255,.2);
        cursor: pointer;
    }
    .item img {
        max-width: 60%;
        -webkit-filter: drop-shadow(5px 5px 5px #222);
        filter: drop-shadow(5px 5px 5px #222);
    }
    .label {
        transform: translateY(-270%) scale(1, 0);
    }
    .item:hover .label {
        -webkit-animation: big-show 200ms 1;
        animation: big-show 200ms 1;
        transform: translateY(-270%) scale(1, 1);
    }
</style>