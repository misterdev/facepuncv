<script>
    import { content } from '../stores/curriculum.js'
    import { navigation } from '../stores/navigation.js';

    let items;
    let selected;

    navigation.subscribe(nav => {
        items = content[nav.cat]
        selected = nav.selected
    })

    const selectItem = (index) => {
        navigation.update(({profile, cat, selected}) => ({profile, cat, selected: index}))
    }
</script>

<div class="wrapper">
    {#each items as { label, icon}, i}
        <div
            class="item"
            class:active={selected === i}
            on:click={() => selectItem(i)}>
            <div class="label">{label}</div>
            <img src={icon} alt={label} />
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
    }
    .item:hover img {
        -webkit-animation: pulse 1s 1;
        animation: pulse 1s 1;
    }
    .label {
        position: absolute;
        text-align: center;
        background-color: #4184B7;
        color: white;
        font-size: 1vw;
        padding: 2px 4px;
        border-radius: 1px;
        transform: translateY(-250%) scale(0.5, 0);
    }
    .item:hover .label {
        -webkit-animation: show 500ms 1;
        animation: show 500ms 1;
        transform: translateY(-250%) scale(1, 1);
    }
</style>