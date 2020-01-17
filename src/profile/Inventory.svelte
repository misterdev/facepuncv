<script>
    import { inventory, drop, dragstart } from '../stores/inventory.js'
    import { play, stop } from '../stores/audio.js'
    import Item from '../components/Item.svelte'
    import DiGithubBadge from 'svelte-icons/di/DiGithubBadge.svelte'
    import FaTwitter from 'svelte-icons/fa/FaTwitter.svelte'

    let items
    inventory.subscribe((i) => items = [i[0], i[1], i[2], i[3]])
</script>

<div id="wrapper">
    <div class="row">
        <div id="title">SKILLS</div>
    </div>
    {#each items as row, r}
        <div class="row">
            {#each row as item, c}
                <Item {r} {c} {...item}/>
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
    @media (min-width: 600px) and (max-width: 700px) {
        #wrapper {
            margin-bottom: 7.5%;
        }
    }
    @media (max-width: 600px) {
        #wrapper {
            margin-bottom: 8%;
        }
    }
    .row {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    #title {
        width: calc(28% + 48px); /* harcoded row width */
        font-size: 1.7em;
        font-weight: bold;
    }
</style>