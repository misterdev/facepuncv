<script>
    import { categories as cats, content, navigation } from '../stores/crafting.js';
    import MdBusinessCenter from 'svelte-icons/md/MdBusinessCenter.svelte'
    import MdSchool from 'svelte-icons/md/MdSchool.svelte'
    import MdFolder from 'svelte-icons/md/MdFolder.svelte'

    let activeCat = 0;
    navigation.subscribe(({cat, selected}) => {
        activeCat = cat
        console.log(cat)    
    });

    const selectCat = (catId) => {
        navigation.update(nav => ({cat: catId, selected: 0}))
    }
</script>

<div id="wrapper">
    <div 
        class="item"
        class:active={activeCat === cats.EXP.id}
        on:click={() => selectCat(cats.EXP.id)}>
        <div class="icon">
            <MdBusinessCenter />
        </div>
        <div><b>{cats.EXP.id}</b></div>
        <div class="counter"><b>4</b></div>
    </div>
    <div
        class="item"
        class:active={activeCat === cats.EDU.id}
        on:click={() => selectCat(cats.EDU.id)}>
        <div class="icon">
            <MdSchool />
        </div>
        <div><b>{cats.EDU.id}</b></div>
        <div class="counter"><b>3</b></div>
    </div>
    <div
        class="item"
        class:active={activeCat === cats.PROJ.id}
        on:click={() => selectCat(cats.PROJ.id)}>
        <div class="icon">
            <MdFolder />
        </div>
        <div><b>{cats.PROJ.id}</b></div>
        <div class="counter"><b>7</b></div>
    </div>
</div>

<style>
    #wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        font-size: 1vw;
    }
    .item {
        padding: 10% 7%;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: rgb(170, 168, 168);
    }
    .item:hover, .item:hover > .counter {
        color: white;
    }
    .item:not(.active):hover {
        animation: pulse 1s 1;
    }
    .icon {
        width: 1.2vw;
        height: 1.2vw;
        margin-right: 6px; 
    }
    .counter {
        flex-grow: 1;
        text-align: right;
        color: rgb(98, 139, 172);
    }
    .item.active {
        background-color: #4184B7;
        color: white;
        transform: scale(1.05);
    }
    .item.active > .counter {
        color: white;
    }
</style>