<script>
    import MdBusinessCenter from 'svelte-icons/md/MdBusinessCenter.svelte'
    import MdSchool from 'svelte-icons/md/MdSchool.svelte'
    import MdFolder from 'svelte-icons/md/MdFolder.svelte'
    import MdCasino from 'svelte-icons/md/MdCasino.svelte'

    import { play, stop } from '../stores/audio.js'
    import { categories as cats, content } from '../stores/curriculum.js';
    import { selectedItem } from '../stores/navigation.js';

    let activeCat;
    selectedItem.subscribe(({cat, item}) => {
        activeCat = cat
    });

    const selectCat = (catId) => {
        if (catId !== activeCat) {
            selectedItem.update(() => ({cat: catId, item: 0}))
        }
    }
</script>

<div id="wrapper">
    <div 
        class="item"
        class:active={activeCat === cats.EXP.id}
        on:click={() => selectCat(cats.EXP.id)}
        on:touchstart={() => selectCat(cats.EXP.id)}
        on:mouseenter={play} on:mouseleave={stop}>
        <div class="icon">
            <MdBusinessCenter />
        </div>
        <div><b>{cats.EXP.id}</b></div>
        <div class="counter"><b>4</b></div>
    </div>
    <div
        class="item"
        class:active={activeCat === cats.EDU.id}
        on:click={() => selectCat(cats.EDU.id)}
        on:touchstart={() => selectCat(cats.EDU.id)}
        on:mouseenter={play} on:mouseleave={stop}>
        <div class="icon">
            <MdSchool />
        </div>
        <div><b>{cats.EDU.id}</b></div>
        <div class="counter"><b>3</b></div>
    </div>
    <div
        class="item"
        class:active={activeCat === cats.PROJ.id}
        on:click={() => selectCat(cats.PROJ.id)}
        on:touchstart={() => selectCat(cats.PROJ.id)}
        on:mouseenter={play} on:mouseleave={stop}>
        <div class="icon">
            <MdFolder />
        </div>
        <div><b>{cats.PROJ.id}</b></div>
        <div class="counter"><b>7</b></div>
    </div>
    <div
        class="item"
        class:active={activeCat === cats.PRES.id}
        on:click={() => selectCat(cats.PRES.id)}
        on:touchstart={() => selectCat(cats.PRES.id)}
        on:mouseenter={play} on:mouseleave={stop}>
        <div class="icon">
            <MdCasino />
        </div>
        <div><b>{cats.PRES.id}</b></div>
        <div class="counter"><b>7</b></div>
    </div>
    <div
        class="item"
        class:active={activeCat === cats.MISC.id}
        on:click={() => selectCat(cats.MISC.id)}
        on:touchstart={() => selectCat(cats.MISC.id)}
        on:mouseenter={play} on:mouseleave={stop}>
        <div class="icon">
            <MdCasino />
        </div>
        <div><b>{cats.MISC.id}</b></div>
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
        font-size: 0.8em;
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
        cursor: pointer;
    }
    .item:hover, .item:hover > .counter {
        color: #DCD5CC;
    }
    .item:not(.active):hover {
        -webkti-animation: pulse 100ms 1;
        animation: pulse 100ms 1;
    }
    .icon {
        width: 1.2vw;
        height: 1.2vw;
        margin-right: 6px;
        opacity: .2;
    }
    .counter {
        flex-grow: 1;
        text-align: right;
        color: #4184B7;
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