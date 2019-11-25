<script>
    import MdAccessTime from 'svelte-icons/md/MdAccessTime.svelte'

    import { queue } from '../stores/curriculum.js'
</script>

<div id="queue-w">
    <div id="title">
        IN PROGRESS
    </div>
    {#each queue as {label, src, date}}
        <div class="item">
            <div class="label">{label}</div>
            <div class="end-label">
                {date}
            </div>
            <img {src} alt={label} />
        </div>
    {/each}
</div>

<style>
    #queue-w {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row-reverse;
        box-sizing: border-box;
    }
    #title {
        position: absolute;
        width: 100%;
        height: 100%;
        padding-left: 2%;
        box-sizing: border-box;
        opacity: .15;
        font-size: 4em;
        font-weight: bold;
    }
    .item {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        margin-right: 5%;
        padding: 4px;
        box-sizing: border-box;
    }
    .item:hover {
        background-color: rgba(255,255,255,.1);
    }
    img {
        height: 100%;
        transform: scale(0.7);
    }
    .label {
        transform: translateY(-100%) scale(1, 0);
    }
    .item:hover .label {
        -webkit-animation: small-show 200ms 1;
        animation: small-show 200ms 1;
        transform: translateY(-100%) scale(1, 1);
    }
    .end-label {
        z-index: 20;
        position: absolute;
        text-align: center;
        background-color: #ace440;
        color: #345b02;
        padding: 1px 3px;
        margin-top: 1%;
        border-radius: 3px;
        display: flex;
        font-size: 0.8em;
        font-weight: bold;
    }
</style>