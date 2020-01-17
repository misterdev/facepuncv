const audio = document.getElementsByTagName('audio')[0]
let playPromise

const play = () => {
    audio.volume = 0.2
    playPromise = audio.play()
}

const pause = () => {
    audio.pause()
    audio.currentTime = 0
}

const stop = () => {
    if (playPromise) playPromise.then(_ => pause())
    else pause()
}

export {
    stop,
    play
}