<script>
    import { content } from '../stores/curriculum.js'
    import { navigation } from '../stores/navigation.js';
    import { play, stop } from '../stores/audio.js'

    let links;
    navigation.subscribe(({cat, selected}) => {
        links = content[cat][selected].links
    })
</script>


<div id="wrapper">
    <div id="title"><b>LINKS</b></div>
    <div id="links">
        {#each links as {icon, url, label}}
            <a class="item"
                href={url}
                target="_blank"
                on:mouseenter={play}
                on:mouseleave={stop}>
                <div class="label">{label}</div>
                <img src={icon} alt={'link'} />
            </a>
        {/each}
    </div>
</div>

<style>
    #wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 1%;
    }
    #title {
        position: absolute;
        top: 2.5%;
    }
    #links {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .item {
        flex-basis: 15%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .item:before {
        content:'';
        float:left;
        padding-top:100%;
    }
    .item:hover {
        background-color: rgba(255,255,255,.2);
    }
    .item > img {
        max-width: 60%;
    }
    .item:hover > img {
        -webkit-animation: pulse 1s 1;
        animation: pulse 1s 1;
    }
    .label {
        position: absolute;
        text-align: center;
        background-color: #4184B7;
        color: white;
        padding: 2px 4px;
        border-radius: 1px;
        transform: translateY(-270%) scale(1, 0);
    }
    .item:hover > .label {
        -webkit-animation: show 200ms 1;
        animation: show 200ms 1;
        transform: translateY(-270%) scale(1, 1);
    }
</style>