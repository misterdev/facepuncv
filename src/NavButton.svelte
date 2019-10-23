<script>
    import FaRegCaretSquareLeft from 'svelte-icons/fa/FaRegCaretSquareLeft.svelte'
    import FaRegCaretSquareRight from 'svelte-icons/fa/FaRegCaretSquareRight.svelte'

    import { navigation } from './stores/navigation.js'

    let showProfile;
    navigation.subscribe(({profile, cat, selected}) => showProfile = profile)
    
    const switchPage = () => {
        navigation.update(({profile, cat, selected}) => ({profile: !profile, cat, selected}))
    }; 
</script>

<div id="wrapper" on:click={switchPage}>
    {#if showProfile}
        <div id="title">
            <b>CURRICULUM</b>
        </div>
        <div id="icon">
            <FaRegCaretSquareRight />
        </div>
    {:else}
        <div id="icon">
            <FaRegCaretSquareLeft />
        </div>
        <div id="title">
            <b>PROFILE</b>
        </div>
    {/if}
</div>

<style>
#wrapper {
    width: 18%;
    font-size: 1.3vw;
    background-color: rgba(115, 115, 114, 0.42);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
#icon {
    height: 100%;
    flex-basis: 12%;
    padding: 0% 5%;
    display: flex;
    align-items: center;
}
#title {
    flex-basis: 90%;
    text-align: center;
}
</style>