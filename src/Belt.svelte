<script>
    import { play, stop } from './stores/audio.js'
    import { inventory, drop, dragstart } from './stores/inventory.js'
    import Item from './components/Item.svelte'
    import DiGithubBadge from 'svelte-icons/di/DiGithubBadge.svelte'
    import FaTwitter from 'svelte-icons/fa/FaTwitter.svelte'

    let belt
    inventory.subscribe((i) => belt = i[4])
</script>

<div id="wrapper">
    {#each belt as item, i}
        <Item r="4" c={i} {...item} />
    {/each}
</div>

<style>
    #wrapper {
        height: 10%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>