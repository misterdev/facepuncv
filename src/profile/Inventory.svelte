<script>
    const content = [
        [{icon: "images/rock.png", label: "dio"},{icon: "images/rock.png", label: "dio"},{icon: "images/rock.png", label: "dio"},{icon: "images/rock.png", label: "dio"},{icon: "images/youtube.ico", label: "dio"}],
        [{icon: "images/alexa.png", label: "dio"},{icon: "images/rock.png", label: "dio"},{icon: "images/rock.png", label: "dio"},{icon: "images/ld.png", label: "dio"}],
        [{icon: "images/alma.png", label: "dio"},{icon: "images/android.png", label: "dio"},{icon: "images/rock.png", label: "dio"},{icon: "images/medium.png", label: "dio"},{icon: "images/webpack.png", label: "dio"},{icon: "images/rock.png", label: "dio"}],
        [{icon: "images/rock.png", label: "dio"},{icon: "images/gdoc.png", label: "dio"},{icon: "images/github.png", label: "dio"},{icon: "images/so.png", label: "dio"},{icon: "images/github.png", label: "dio"}]
    ]
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
        bottom: 12.2%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    #wrapper:before {
        margin-left: 34%;
        content: 'SKILLS';
        font-size: 2vw;
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
        margin: .5px;
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
        width: 100%;
        opacity: .8;
    }
    img:hover {
        -webkit-animation: pulse 1s 1;
        animation: pulse 1s 1;
    }
</style>