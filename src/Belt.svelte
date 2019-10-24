<script>
    import DiGithubBadge from 'svelte-icons/di/DiGithubBadge.svelte'
    import FaTwitter from 'svelte-icons/fa/FaTwitter.svelte'
</script>

<div id="wrapper">
    <a class="item" href="https://www.youtube.com/watch?v=z9Uz1icjwrM" target="_blank">
        <img src="images/rock.png" alt="rock"/>
    </a>
    <a class="item" href="https://github.com/misterdev" target="_blank">
        <img src="images/github3d.png" alt="github"/>
    </a>
    <a class="item" href="https://twitter.com/misterdev_" target="_blank">
        <img src="images/twitter3d2.png" alt="twitter"/>
    </a>
    <a class="item" href="https://www.linkedin.com/in/misterdev/" target="_blank">
        <img src="images/linkedin3d.png" alt="linkedin"/>
    </a>
    <a class="item" href="https://stackoverflow.com/users/4695325/devid-farinelli" target="_blank">
        <img src="images/so3d.png" alt="stackoverflow"/>
    </a>
    <a class="item" href="mailto:devid.farinelli@gmail.com" target="_blank">
        <img src="images/envelope3d.png" alt="e-mail"/>
    </a>
</div>

<style>
    #wrapper {
        height: 10%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .item {
        height: 100%;
        width: 4.2%;
        margin: 0.18%;
        background-color: rgba(255, 255, 255, .08);
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
        width: 90%;
        opacity: .8;
    }
    img:hover {
        -webkit-animation: pulse 1s 1;
        animation: pulse 1s 1;
    }
</style>