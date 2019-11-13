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
                    <div class="label">{content[r][c].label}</div>
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
        transform: translateY(-180%) scale(0.5, 0);
    }
    .item:hover .label {
        -webkit-animation: show 200ms 1;
        animation: show 200ms 1;
        transform: translateY(-180%) scale(1, 1);
    }
    @keyframes show {
	0% {
		transform: translateY(-180%) scale(.5, 0);
	}
	100% {
		transform: translateY(-180%) scale(1, 1);
	}
}
</style>