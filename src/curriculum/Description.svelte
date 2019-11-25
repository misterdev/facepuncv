<script>
    import MdAccessTime from 'svelte-icons/md/MdAccessTime.svelte'
    import MdAlarm from 'svelte-icons/md/MdAlarm.svelte'
    
    import { content } from '../stores/curriculum.js'
    import { navigation } from '../stores/navigation.js';

    let item;
    navigation.subscribe(({cat, selected}) => {
        item = content[cat][selected];
    });
</script>

<div id="wrapper">
    <div id="header">
        <img src={item.icon} alt="logo" />
        <div id="title"><b>{item.label}</b></div>
        {#if item.date}
            <div id="time">
                <div id="start">
                    <div class="icon">
                        <MdAccessTime />
                    </div>
                    <span class="date">
                        {item.date.start}
                    </span>
                </div>
                <div id="end">
                    <div class="icon">
                        <MdAlarm />
                    </div>
                    <span class="date">
                        {item.date.end}
                    </span>
                </div>
            </div>
        {/if}
    </div>
    <div id="description">{@html item.description}</div>
</div>

<style>
    #wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    #header {
        height: 25%;
        padding: 1% 2%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    img {
        height: 70%;
    }
    #title {
        font-size: 1.7em;
        flex-grow: 1;
        text-align: center;
    }
    #description {
        text-justify: distribute;
        padding: 2.5% 5%;
    }
    #time {
        position: absolute;
        right: 2px;
        top: 2px;
        width: 16%;
        height: 2%;
        opacity: .6;
        display: flex;
        flex-direction: column;
    }
    #time div.icon {
        width: 20%;
        margin-right: 4px;
    }
    #time > div {
        margin: 1px;
        background-color: rgba(0,0,0,.4);
        border-radius: 5%;
        font-size: 0.7em;
        padding: 2px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .date {
        font-size: 1.4em;
    }
</style>