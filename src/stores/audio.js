const audio = document.getElementsByTagName('audio')[0];

const play = () => audio.play();
const stop = () => {
    audio.pause();
    audio.currentTime = 0;
}

export {
    stop,
    play
}