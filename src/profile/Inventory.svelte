<script>
    import { content } from '../stores/profile.js'
    import DiGithubBadge from 'svelte-icons/di/DiGithubBadge.svelte'
    import FaTwitter from 'svelte-icons/fa/FaTwitter.svelte'
</script>

<div id="wrapper">
    {#each [...Array(4).keys()] as r}
        <div class="row">
            {#each [...Array(6).keys()] as c}
                <div class="item">
                    {#if content[r][c]}
                    <img src={content[r][c].icon} alt={content[r][c].label}/>
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
        color: white;
    }

    .row {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .item {
        height: 100%;
        width: 4.2%;
        margin: 1px;
        background-color: rgba(255, 255, 255, .2);
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
        width: 60%;
        opacity: .8;
    }
    img:hover {
        -webkit-animation: pulse 1s 1;
        animation: pulse 1s 1;
    }
</style>