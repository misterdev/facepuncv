<script>
    import { inventory, drop, dragstart } from '../stores/inventory.js'
    import { play, stop } from '../stores/audio.js'

    export let src = null, label = '', href = null, r, c


</script>

{#if href == null}
    <div class="item"
        on:mouseenter={play}
        on:mouseleave={stop}
        on:dragover|preventDefault
        on:drop|preventDefault={drop(r,c)} 
        on:dragstart={dragstart(r, c)}>
        {#if src}
            <div class="label">{label}</div>
            <img {src} alt={label}/>
        {/if}
    </div>
{:else}
    <a class="item" {href} target="_blank"
        on:mouseenter={play}
        on:mouseleave={stop}
        on:dragover|preventDefault
        on:drop|preventDefault={drop(r,c)} 
        on:dragstart={dragstart(r, c)}>
        {#if src}
            <div class="label">{label}</div>
            <img {src} alt={label}/>
        {/if}
    </a>
{/if}

<style>
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
    img:active {
        cursor: url('https://www.google.com/intl/en_ALL/mapfiles/closedhand.cur'), all-scroll;
        cursor: -webkit-grabbing;
        cursor: -moz-grabbing;
        cursor: -o-grabbing;
        cursor: -ms-grabbing;
        cursor: grabbing;
    }
    div.item:hover {
        cursor: url('https://www.google.com/intl/en_ALL/mapfiles/openhand.cur'), all-scroll;
        cursor: -webkit-grab;
        cursor: -moz-grab;
        cursor: -o-grab;
        cursor: -ms-grab;
        cursor: grab;
    }
    a.item:hover {
        cursor: pointer;
    }
    .label {
        transform: translateY(-180%) scale(1, 0);
    }
    .item:hover .label {
        -webkit-animation: show 200ms 1;
        animation: show 200ms 1;
        transform: translateY(-180%) scale(1, 1);
    }
</style>