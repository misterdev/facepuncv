<script>
    import DiGithubBadge from 'svelte-icons/di/DiGithubBadge.svelte'
    import FaTwitter from 'svelte-icons/fa/FaTwitter.svelte'
</script>

<div id="wrapper">
    <a class="item" href="https://www.youtube.com/watch?v=z9Uz1icjwrM" target="_blank">
        <div class="label">ಠ◡ಠ</div>
        <img src="images/rock.png" alt="rock"/>
    </a>
    <a class="item" href="https://github.com/misterdev" target="_blank">
        <div class="label">Github</div>
        <img src="images/github3d.png" alt="github"/>
    </a>
    <a class="item" href="https://twitter.com/misterdev_" target="_blank">
        <div class="label">Twitter</div>
        <img src="images/twitter3d2.png" alt="twitter"/>
    </a>
    <a class="item" href="https://www.linkedin.com/in/misterdev/" target="_blank">
        <div class="label">Linkedin</div>
        <img src="images/linkedin3d.png" alt="linkedin"/>
    </a>
    <a class="item" href="https://stackoverflow.com/users/4695325/devid-farinelli" target="_blank">
        <div class="label">StackOverflow</div>
        <img src="images/so3d.png" alt="stackoverflow"/>
    </a>
    <a class="item" href="mailto:devid.farinelli@gmail.com" target="_blank">
        <div class="label">e-mail</div>
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
        width: 4.4%;
        margin: 0.14%;
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
    .item:hover {
        -webkit-animation: pulse 200ms 1;
        animation: pulse 200ms 1;
    }
    .label {
        position: absolute;
        text-align: center;
        background-color: #4184B7;
        color: white;
        padding: 2px 4px;
        border-radius: 1px;
        transform: translateY(-180%) scale(1, 0);
    }
    .item:hover .label {
        -webkit-animation: show 200ms 1;
        animation: show 200ms 1;
        transform: translateY(-180%) scale(1, 1);
    }
    @keyframes show {
        0% {
            transform: translateY(-180%) scale(1, 0);
        }
        100% {
            transform: translateY(-180%) scale(1, 1);
        }
    }
</style>