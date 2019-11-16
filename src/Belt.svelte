<script>
    import { play, stop } from './stores/audio.js'
    import { belt } from './stores/profile.js'
    import DiGithubBadge from 'svelte-icons/di/DiGithubBadge.svelte'
    import FaTwitter from 'svelte-icons/fa/FaTwitter.svelte'
</script>

<div id="wrapper">
    {#each belt as {href, label, src}}
        <a class="item" {href} target="_blank"
           on:mouseenter={play} on:mouseleave={stop}>
            <div class="label">{label}</div>
            <img {src} alt={label}/>
        </a>
    {/each}
</div>

<style>
    #wrapper {
        height: 10%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .item {
        height: 100%;
        width: 4.4%;
        margin: 0.14%;
        background-color: rgba(255, 255, 255, .08);
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
        width: 80%;
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