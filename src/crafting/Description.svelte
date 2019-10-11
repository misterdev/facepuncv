<script>
    import MdAccessTime from 'svelte-icons/md/MdAccessTime.svelte'
    import MdAlarm from 'svelte-icons/md/MdAlarm.svelte'
    import {navigation, content} from '../stores/crafting.js'
    let item;
    navigation.subscribe(({cat, selected}) => {
        item = content[cat][selected];
    });
</script>

<div id="wrapper">
    <div id="header">
        <img src={item.icon} alt="logo" />
        <div id="title"><b>{item.label}</b></div>
        <div id="time">
            <div id="start">
                <div class="icon">
                    <MdAccessTime />
                </div>
                {item.date.start}
            </div>
            <div id="end">
                <div class="icon">
                    <MdAlarm />
                </div>
                {item.date.end}
            </div>
        </div>
    </div>
    <div id="description">{@html item.description}</div>
</div>

<style>
    #wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        color: white;
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
        font-size: calc(60% + 1vmin);
        flex-grow: 1;
        text-align: center;
    }
    #description {
        font-size: calc(10% + 1vmin);
        text-justify: distribute;
        padding: 2.5% 5%;
    }
    #time {
        position: absolute;
        right: 2px;
        top: 2px;
        width: 20%;
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
        font-size: calc(20% + 1vmin);
        padding: 2px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>