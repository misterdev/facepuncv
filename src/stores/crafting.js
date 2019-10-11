import { writable } from 'svelte/store'

export const categories = {
    EXP: {
        id: 'EXPERIENCE',
        label: 'Experience',
        count: 4,
    },
    EDU: {
        id: 'EDUCATION',
        label: 'Education',
        count: 3,
    },
    PROJ: {
        id: 'PROJECTS',
        label: 'Projects',
        count: 7,
    }
}

export const navigation = writable({cat: categories.EXP.id, selected: 0})

export let content = {}
content.EXPERIENCE = [
    {
        // icon
        label: "Webpack",
        icon: "images/webpack.png",
        date: {
            start: "Dec 18",
            end: "Aug 19"
        },
        // 
        description: `
        <p>
            <b>OSS Javascript Developer</b></br>
            Webpack (Remote work)
        </p>
        After contributing to Webpack, I've been selected globally for the "Google Summer of Code 2019" to design and develop a modular output reporting system for webpack
        `,
        links: [
            {
                icon: "images/gsoc.png",
                url: "https://summerofcode.withgoogle.com/",
                label: "GSoC Website"
            },
            {
                icon: "images/github.png",
                url: "https://github.com/misterdev/webpack-reporter-plugin",
                label: "Repository"
            }
        ],
        stats: [
            {
                label: 'Javascript',
                count: 800
            },
            {
                label: 'Typescript',
                count: 800
            },
            {
                label: 'Webpack',
                count: 900
            },
            {
                label: 'Git',
                count: 600
            }
        ]
    },
    {
        // icon
        label: "Lay Lab",
        icon: "images/laylab.png",
        date: {
            start: "Dec 18",
            end: "Aug 19"
        },
        // 
        description: `
        <p>
            <b>Fullstack Javascript Developer</b></br>
            Lay Lab (Altedo, BO)
        </p>
        I worked on web projects like the company website and a mobile app with a complex backend using web technologies (Ionic, NodeJS, Firebase, elasticsearch, ...)
        `,
        links: [
            {
                icon: "images/laylab.png",
                url: "https://github.com/misterdev/webpack-reporter-plugin"
            }
        ],
        stats: [
            {
                label: 'Firebase',
                count: 1000
            },
            {
                label: 'NodeJS',
                count: 900
            },
            {
                label: 'Ionic',
                count: 900
            },
            {
                label: 'ElasticSearch',
                count: 300
            },
            {
                label: 'Google Cloud Engine',
                count: 300
            }
        ]
    },
    {
        // icon
        label: "MIT App Inventor",
        icon: "images/appinventor.png",
        date: {
            start: "Jun 15",
            end: "Sep 15"
        },
        // 
        description: `
        <p>
            <b>OSS Javascript Developer</b></br>
            MIT Media Lab (Massachusetts, US - Remote work)
        </p>
        I've been selected globally for the "Google Summer of Code 2015" to work on an organization tool for the Blockly editor of MIT App Inventor 2
        `,
        links: [
            {
                icon: "images/gsoc.png",
                url: "https://www.google-melange.com/archive/gsoc/2015/orgs/media/projects/misterdev.html"
            },
            {
                icon: "images/gdoc.png",
                url: "https://docs.google.com/document/d/1nzdrNGGjEptc7phiU6JOuV8UQTZRNH_0Ve8lukBIZuI"
            }
        ],
        stats: [
            {
                label: 'Javascript',
                count: 700
            }
        ]
    },
    {
        // icon
        label: "DMDTEK",
        icon: "images/android.png",
        date: {
            start: "Dec 18",
            end: "Aug 19"
        },
        // 
        description: `
        <p>
            <b>Android Developer</b></br>
            DMDTEK S.R.L (Imola, BO)
        </p>
        I developed a module for and Android embedded system
        `,
        links: [],
        stats: [
            {
                label: 'Android',
                count: 60
            }
        ]
    }
]

content.EDUCATION = [
    {
        // icon
        label: "CS Master",
        icon: "images/alma.png",
        date: {
            start: "Sep 16",
            end: "Mar 20"
        },
        // 
        description: `
        <p><b>University of Bologna</p></b>

        Master degree in Computer Science</br>
        Average Grade: 29.55
        `,
        links: [],
        stats: []
    },
    {
        // icon
        label: "CS Bachelor",
        icon: "images/alma.png",
        date: {
            start: "Sep 12",
            end: "Dec 16"
        },
        // 
        description: `
        <p><b>University of Bologna</p></b>

        Bachelor degree in Computer Science</br>
        Score 98/110
        `,
        links: [],
        stats: []
    },
    {
        // icon
        label: "IT Degree",
        icon: "images/itis.png",
        date: {
            start: "Sep 07",
            end: "Aug 12"
        },
        // 
        description: `
        <p><b>ITIS Odone Belluzzi</p></b>

        Bachelor degree in Computer Science</br>
        Score 86/100        
        `,
        links: [],
        stats: []
    },
]

content.PROJECTS = [
    {
        // icon
        label: "IT Degree",
        icon: "images/alma.png",
        date: "25 dicc",
        // 
        description: "...",
        links: [],
        stats: []
    },
]

// github
// twitter
// linkedin
// stackoverflow
// mail
// medium?
