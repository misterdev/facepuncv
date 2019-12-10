import { writable } from 'svelte/store'

const content = []
content[0] = [
    {
        src: "images/profile/node.png",
        label: "NODEJS"
    },
    {
        src: "images/profile/js.png",
        label: "JAVASCRIPT"
    },
    {
        src: "images/profile/ts.png",
        label: "TYPESCRIPT"
    },
    {
        src: "images/profile/react.png",
        label: "REACT"
    },
    {
        src: "images/profile/svelte.png",
        label: "SVELTE"
    }
]
content[1] = [
    {
        src: "images/profile/three.png",
        label: "THREEJS"
    },
    {
        src: "images/profile/aframe.png",
        label: "AFRAME"
    },
    {
        src: "images/profile/blender.png",
        label: "BLENDER"
    },
    {},
    {},
    {
        src: "images/profile/note.png",
        label: "> DRAG ME <",
        hint: true
    }
]
content[2] = [
    {
        src: "images/profile/firebase.png",
        label: "FIREBASE"
    },
    {
        src: "images/profile/gcp.png",
        label: "GCP"
    },
    {
        src: "images/profile/aws.png",
        label: "AWS"
    },
    {
        src: "images/profile/travis.png",
        label: "TRAVIS CI"
    },
]
content[3] = [
    {
        src: "images/profile/python.png",
        label: "PYTHON"
    },
    {
        src: "images/profile/c++.png",
        label: "C++"
    },
    {
        src: "images/profile/rust.png",
        label: "RUST (THE LANG)"
    },
    {
        src: "images/profile/rust-game.png",
        label: "RUST (THE GAME)"
    },
    {
        src: "images/profile/dart.png",
        label: "DART"
    },
    {
        src: "images/profile/java.png",
        label: "JAVA"
    }
]
content[4] = [
    {
        href: 'https://www.youtube.com/watch?v=z9Uz1icjwrM',
        label: 'ROCK',
        src: 'images/rock.png',
    },
    {
        href: 'https://github.com/misterdev',
        label: 'GITHUB',
        src: 'images/github3d.png'
    },
    {
        href: 'https://twitter.com/misterdev_',
        label: 'TWITTER',
        src: 'images/twitter3d2.png'
    },
    {
        href: 'https://www.linkedin.com/in/misterdev',
        label: 'LINKEDIN',
        src: 'images/linkedin3d.png'
    },
    {
        href: 'https://stackoverflow.com/users/4695325/devid-farinelli',
        label: 'STACKOVERFLOW',
        src: 'images/so3d.png'
    },
    {
        href: 'mailto:devid.farinelli@gmail.com',
        label: 'E-MAIL',
        src: 'images/envelope3d.png'
    }
]

let items = []
let draggedItem
for (let r = 0; r < 5; r++) {
    items[r] = []
    for (let c = 0; c < 6; c++) {
        items[r][c] = content[r][c]
    }
}

export const inventory = writable(items)
export const dragstart = (r, c) => {
    return () => {
        draggedItem = {r, c}
    }
}
export const drop = (toR, toC) => {
    return () =>
        inventory.update((inv) => {
            let {r, c} = draggedItem
            let temp = inv[r][c]
            inv[r][c] = inv[toR][toC]
            inv[toR][toC] = temp
            draggedItem = null
            if (inv[r][c].hint) inv[r][c].hint = false
            else if (inv[toR][toC].hint) inv[toR][toC].hint = false
            return inv
        })
}
