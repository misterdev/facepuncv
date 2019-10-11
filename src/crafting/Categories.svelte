<script>
    import { categories as cats, content, navigation } from '../stores/crafting.js';
    import MdBusinessCenter from 'svelte-icons/md/MdBusinessCenter.svelte'
    import MdSchool from 'svelte-icons/md/MdSchool.svelte'
    import MdFolder from 'svelte-icons/md/MdFolder.svelte'
    // const items = Object.keys(categories).map(k => categories[k]) 

    const selectCat = (catId) => {
        navigation.update(nav => ({cat: catId, selected: 0}))
    }
</script>

<div id="wrapper">
    <div class="item" on:click={() => selectCat(cats.EXP.id)}>
        <div class="icon">
            <MdBusinessCenter />
        </div>
        <div><b>EXPERIENCE</b></div>
        <div class="counter"><b>4</b></div>
    </div>
    <div class="item" on:click={() => selectCat(cats.EDU.id)}>
        <div class="icon">
            <MdSchool />
        </div>
        <div><b>EDUCATION</b></div>
        <div class="counter"><b>3</b></div>
    </div>
    <div class="item" on:click={() => selectCat(cats.PROJ.id)}>
        <div class="icon">
            <MdFolder />
        </div>
        <div><b>PROJECTS</b></div>
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
        overflow: hidden;
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
    .item:hover {
        background-color: #4184B7;
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
</style>