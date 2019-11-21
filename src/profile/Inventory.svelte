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
</style>