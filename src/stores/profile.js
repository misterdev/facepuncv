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
    },
    {
        src: "images/profile/three.png",
        label: "THREEJS"
    }
]
content[1] = [
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
        src: "images/profile/alexa.png",
        label: "ALEXA SDK"
    }
]
content[2] = [
    {
        src: "images/profile/travis.png",
        label: "TRAVIS CI"
    },
    {
        src: "images/profile/azure.png",
        label: "AZURE PIPELINES"
    },
    {
        src: "images/profile/git.png",
        label: "GIT"
    }
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
            return inv
        })
}
