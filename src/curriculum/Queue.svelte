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
                <div class="icon">
                    <MdAccessTime />
                </div>
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
        background-color: #A6E437;
        color: #213a01;
        padding: 2px 1px;
        margin-top: .5%;
        border-radius: 4px;
        display: flex;
        font-size: 0.8em;
        width: 11%;
        height: 20%;
        -webkit-box-shadow: 0px 2px 17px 0px rgba(0,0,0,0.57);
        -moz-box-shadow: 0px 2px 17px 0px rgba(0,0,0,0.57);
        box-shadow: 0px 2px 17px 0px rgba(0,0,0,0.57);
    }
    .icon {
        width: 23%;
    }
</style>