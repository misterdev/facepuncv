<script>
    import Categories from './Categories.svelte'
    import List from './List.svelte'
    import Description from './Description.svelte'
    import Links from './Links.svelte'
    import Stats from './Stats.svelte'
</script>

 <!-- https://www.youtube.com/watch?v=tJ3nGtooxoM&t=656s -->
<div id="wrapper">
    <div id="content">
        <div id="categories">
            <Categories />
        </div>
        <div id="list">
            <List />
        </div>
        <div id="description">
            <Description />
        </div>
        <div id="queue"></div>
        <div id="links">
            <Links />
        </div>
        <div id="stats">
            <Stats />
        </div>
    </div>
</div>

<style>
    #wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        padding-top: 3.84%;
        padding-right: 5.76%;
        padding-bottom:  9.61%;
        padding-left: 5.76%;
        background: rgba(0, 0, 0, 0.5);
        box-sizing: border-box;
    }
    #content > div {
        background-color: rgba(115, 115, 114, 0.42);
    }
    #categories {
        position: relative;
        grid-area: cats;
    }
    #list {
        position: relative;
        grid-area: list;
        opacity: .8;
    }
    #description {
        position: relative;
        grid-area: desc;
        opacity: .8;
    }
    #queue {
        position: relative;
        grid-area: queu;
    }
    #links {
        position: relative;
        grid-area: link;
        opacity: .8;
    }
    #stats {
        position: relative;
        grid-area: stat;
        opacity: .8;
    }
    #content {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-areas: 
            "cats list list list desc desc desc desc"
            "cats list list list desc desc desc desc"
            "cats list list list desc desc desc desc"
            "cats list list list desc desc desc desc"
            "cats list list list link link link link"
            "cats list list list link link link link"
            "cats list list list stat stat stat stat"
            "cats list list list stat stat stat stat"
            "queu queu queu queu stat stat stat stat";
        grid-column-gap: .29%;
        grid-row-gap: .7%;
    }
</style>