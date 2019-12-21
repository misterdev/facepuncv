import { writable } from 'svelte/store'

const content = []
content[0] = [
    {
        src: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712293/facepuncv/inventory/node.png",
        label: "NODEJS"
    },
    {
        src: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712293/facepuncv/inventory/js.png",
        label: "JAVASCRIPT"
    },
    {
        src: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712293/facepuncv/inventory/ts.png",
        label: "TYPESCRIPT"
    },
    {
        src: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576946550/facepuncv/inventory/react.png",
        label: "REACT"
    },
    {
        src: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712293/facepuncv/inventory/svelte.png",
        label: "SVELTE"
    }
]
content[1] = [
    {
        src: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712293/facepuncv/inventory/three.png",
        label: "THREEJS"
    },
    {
        src: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712293/facepuncv/inventory/aframe.png",
        label: "AFRAME"
    },
    {
        src: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712293/facepuncv/inventory/blender.png",
        label: "BLENDER"
    },
    {},
    {},
    {
        src: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712293/facepuncv/inventory/note.png",
        label: "> DRAG ME <",
        hint: true
    }
]
content[2] = [
    {
        src: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712293/facepuncv/inventory/firebase.png",
        label: "FIREBASE"
    },
    {
        src: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712293/facepuncv/inventory/gcp.png",
        label: "GCP"
    },
    {
        src: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712293/facepuncv/inventory/aws.png",
        label: "AWS"
    },
    {
        src: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712293/facepuncv/inventory/travis.png",
        label: "TRAVIS CI"
    },
]
content[3] = [
    {
        src: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712293/facepuncv/inventory/python.png",
        label: "PYTHON"
    },
    {
        src: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712293/facepuncv/inventory/cpp.png",
        label: "C++"
    },
    {
        src: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712293/facepuncv/inventory/rust.png",
        label: "RUST (THE LANG)"
    },
    {
        src: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712293/facepuncv/inventory/rust-game.png",
        label: "RUST (THE GAME)"
    },
    {
        src: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712293/facepuncv/inventory/dart.png",
        label: "DART"
    },
    {
        src: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712293/facepuncv/inventory/java.png",
        label: "JAVA"
    }
]
content[4] = [
    {
        href: 'https://www.youtube.com/watch?v=z9Uz1icjwrM',
        label: 'ROCK',
        src: 'https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576711580/facepuncv/belt/rock.png',
    },
    {
        href: 'https://github.com/misterdev',
        label: 'GITHUB',
        src: 'https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576711580/facepuncv/belt/github3d.png'
    },
    {
        href: 'https://twitter.com/misterdev_',
        label: 'TWITTER',
        src: 'https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576711580/facepuncv/belt/twitter3d.png'
    },
    {
        href: 'https://www.linkedin.com/in/misterdev',
        label: 'LINKEDIN',
        src: 'https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576711580/facepuncv/belt/linkedin3d.png'
    },
    {
        href: 'https://stackoverflow.com/users/4695325/devid-farinelli',
        label: 'STACKOVERFLOW',
        src: 'https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576711580/facepuncv/belt/so3d.png'
    },
    {
        href: 'mailto:devid.farinelli@gmail.com',
        label: 'E-MAIL',
        src: 'https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576711580/facepuncv/belt/envelope3d.png'
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
            if (inv[r][c] && inv[r][c].hint) inv[r][c].hint = false
            else if (inv[toR][toC] && inv[toR][toC].hint) inv[toR][toC].hint = false
            return inv
        })
}
