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
        background-color: rgb(99,126,63);
        -webkit-animation: pulse 100ms 1;
        animation: pulse 100ms 1;
    }
    .item > img {
        max-width: 60%;
    }
    .label {
        transform: translateY(-270%) scale(1, 0);
    }
    .item:hover > .label {
        -webkit-animation: big-show 200ms 1;
        animation: big-show 200ms 1;
        transform: translateY(-270%) scale(1, 1);
    }
</style>