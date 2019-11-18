<script>
    import { content } from '../stores/profile.js'
    import { play, stop } from '../stores/audio.js'
    import DiGithubBadge from 'svelte-icons/di/DiGithubBadge.svelte'
    import FaTwitter from 'svelte-icons/fa/FaTwitter.svelte'

    let inventory = []
    for (let r = 0; r < 4; r++) {
        inventory[r] = []
        for (let c = 0; c < 6; c++) {
            inventory[r][c] = content[r][c]
        }
    }

    const switchI = () => {
        console.log('ciao')
        let temp = inventory[0][0] 
        inventory[0][0] = inventory[0][1]
        inventory[0][1] = temp
    }

    let draggedItem
    const dragstart = (r, c) => {
        return () => {
            draggedItem = {r, c}
        }
    }
    const drop = (toR, toC) => {
        return () => {
            let {r, c} = draggedItem
            let temp = inventory[r][c] 
            inventory[r][c] = inventory[toR][toC]
            inventory[toR][toC] = temp
            draggedItem = null
        }
    }
</script>

<div id="wrapper">
    {#each inventory as row, r}
        <div class="row">
            {#each row as item, c}
                <div class="item"
                    draggable="true"
                    on:mouseenter={play}
                    on:mouseleave={stop}
                    on:click={switchI}
                    on:dragover|preventDefault
                    on:drop|preventDefault={drop(r,c)} 
                    on:dragstart={dragstart(r, c)}>
                    {#if item}
                    <div class="label">{item.label}</div>
                    <img src={item.icon} alt={item.label}/>
                    {/if}
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    #wrapper {
        position: absolute;
        left: 0;
        margin-bottom: 7%;
        bottom: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    #wrapper:before {
        margin-left: 34%;
        content: 'SKILLS';
        font-size: 1.7em;
        font-weight: bold;
    }

    .row {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .item {
        height: 100%;
        width: 4.4%;
        margin: 0.14%;
        background-color: rgba(200, 200, 200, .2);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px;
    }
    .item:after {
        content: '';
        padding-top: 100%;
    }
    img {
        width: 70%;
        opacity: .8;
    }
    .item:hover {
        -webkit-animation: pulse 100ms 1;
        animation: pulse 100ms 1;
    }
    .label {
        position: absolute;
        text-align: center;
        background-color: #4184B7;
        color: white;
        padding: 2px 4px;
        border-radius: 1px;
        transform: translateY(-180%) scale(1, 0);
    }
    .item:hover .label {
        -webkit-animation: show 200ms 1;
        animation: show 200ms 1;
        transform: translateY(-180%) scale(1, 1);
    }
</style>