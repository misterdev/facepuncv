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
        count: 5,
    },
    MISC: {
        id: 'MISC',
        label: 'Misc',
        count: 3,
    }
}

export const navigation = writable({
    profile: false,
    cat: categories.EXP.id,
    selected: 0
})

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
                icon: "images/github.png",
                url: "https://github.com/misterdev/webpack-reporter-plugin",
                label: "Project Repo"
            },
            {
                icon: "images/medium.png",
                url: "https://medium.com/webpack/summer-2019-with-webpack-840c7f7b97c4",
                label: "Presentation Article"
            },
            {
                icon: "images/medium.png",
                url: "https://medium.com/webpack/summer-2019-with-webpack-5cd3ddbc9a05",
                label: "Final Article"
            },
            {
                icon: "images/gsoc.png",
                url: "https://summerofcode.withgoogle.com/",
                label: "GSoC Website"
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
            start: "Oct 15",
            end: "Aug 17"
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
                url: "https://github.com/misterdev/webpack-reporter-plugin",
                label: "Company Website"
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
                label: 'Google Cloud Engine',
                count: 600
            },
            {
                label: 'PouchDB',
                count: 400
            },
            {
                label: 'ElasticSearch',
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
                url: "https://www.google-melange.com/archive/gsoc/2015/orgs/media/projects/misterdev.html",
                label: "GSoC Website"
            },
            {
                icon: "images/gdoc.png",
                url: "https://docs.google.com/document/d/1nzdrNGGjEptc7phiU6JOuV8UQTZRNH_0Ve8lukBIZuI",
                label: "Overview"
            }
        ],
        stats: [
            {
                label: 'Javascript',
                count: 700
            },
            {
                label: 'SVG',
                count: 200
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
        label: "Mesopotamia Jones",
        icon: "images/mj.png",
        date: "25 dicc",
        // 
        description: "One of my favorite projects, a 2D browser game aimed at teaching programming to children. I made this with a friend, as a university project for the Usability and User Experience course, we used Phaser for the game, React with Typescript for the website, Blockly for the code editor and Webpack for the bundling.",
        links: [
            {
                icon: "images/mj.png",
                url: "https://loopingdoge.github.io/mesopotamia-jones",
                label: "Website"
            },
            {
                icon: "images/github.png",
                url: "https://github.com/loopingdoge/mesopotamia-jones",
                label: "Project Repo"
            }
        ],
        stats: [
            {
                label: 'Usability & UX',
                count: 1500
            },
            {
                label: 'Phaser',
                count: 800
            },
            {
                label: 'Game Design & Development',
                count: 800
            },
            {
                label: 'Typescript',
                count: 700
            },
            {
                label: 'Blockly',
                count: 500
            },
        ]
    },
    {
        label: "Wowtaria",
        icon: "images/ld.png",
        date: "25 dicc",
        // 
        description: `
        A browser app that allows making semantic annotations on scientific documents. This has been my first web project, where I learned a lot about Javascript development. We used Bootstrap for the UI and Python for the backend. 

        The database is not available anymore, resulting in an infinite loading 
        `,
        links: [
            {
                icon: "images/ld.png",
                url: "http://ltw1423.web.cs.unibo.it/",
                label: "Website"
            },
            {
                icon: "images/github.png",
                url: "https://github.com/loopingdoge/wowtaria.git",
                label: "Project Repo"
            }
        ],
        stats: [
            {
                label: 'UI Design & UX',
                count: 1200
            },
            {
                label: 'Bootstrap',
                count: 800
            },
            {
                label: 'Python',
                count: 400
            },
        ]
    },
    {
        label: "SensorSpeak",
        icon: "images/alexa.png",
        date: "25 dicc",
        // 
        description: `
        I developed an Alexa Skill that was able to obtain informations from the sensors of the Informatic Department of the University of Bologna.
        The skill allows users to query a semantic database through Alexa only using natural language, the skill was implemented using AWS Lambda as backend.
        `,
        links: [
            {
                icon: "images/github.png",
                url: "https://github.com/misterdev/sensorspeak",
                label: "Project Repo"
            }
        ],
        stats: [
            {
                label: 'AWS Lambda',
                count: 800
            },
            {
                label: 'Alexa Skills',
                count: 800
            },
            {
                label: 'RDF (Semantic Web Standard)',
                count: 800
            },
            {
                label: 'IoT',
                count: 300
            }
        ]
    },
    {
        label: "Ethereum Galaxy",
        icon: "images/ld.png",
        date: "25 dicc",
        // 
        description: `
        Visualizer of Ethereum transactions as a graph, inspired by <a href="https://anvaka.github.io/pm/#/?_k=qeo12l" target="_blank">pm</a>, developed using React and Typescript.

        The database is not available anymore, resulting in no data visualized
        `,
        links: [
            {
                icon: "images/ld.png",
                url: "http://www.devid.io/ethereum-galaxy/",
                label: "Website"
            },
            {
                icon: "images/github.png",
                url: "https://github.com/loopingdoge/ethereum-galaxy",
                label: "Project Repo"
            }
        ],
        stats: [
            {
                label: 'UI Design & UX',
                count: 1000
            },
            {
                label: 'Graph Drawing Algorithms',
                count: 700
            },
            {
                label: 'Ethereum Graph Navigation',
                count: 300
            },
            {
                label: 'D3',
                count: 300
            },
            {
                label: 'WebGL',
                count: 300
            }
        ]
    },
    {
        label: "[WIP] Mind Palace",
        icon: "images/ld.png",
        description: `
        A WIP 3D mnemonic device, developed using Aframe and webpack. For this project, I've written a webpack loader for .obj files
        `,
        links: [
            {
                icon: "images/ld.png",
                url: "http://www.devid.io/mind-palace/",
                label: "Website"
            }
        ],
        stats: [
            {
                label: 'AFrame',
                count: 1000
            }
        ]
    },
]

content.MISC = [
    {
        label: "Medium Articles",
        icon: "images/medium.png",
        description: `
        I wrote some articles about Webpack
        `,
        links: [
            {
                icon: "images/medium.png",
                url: "https://medium.com/@misterdev/how-to-write-a-webpack-scaffold-ace202775572",
                label: "How to write a Webpack scaffold"
            },
            {
                icon: "images/medium.png",
                url: "https://medium.com/webpack/summer-2019-with-webpack-840c7f7b97c4",
                label: "Summer 2019 with webpack"
            },
            {
                icon: "images/medium.png",
                url: "https://medium.com/webpack/summer-2019-with-webpack-5cd3ddbc9a05",
                label: "</Summer 2019 with webpack>"
            }
        ],
        stats: [
            {
                label: 'English',
                count: 'OVER 9000'
            }
        ]
    },
    {
        label: "Stack Overflow",
        icon: "images/so.png",
        description: `
        I used to answer questions on Stack Overflow, mostly about Firebase and Javascript
        `,
        links: [
            {
                icon: "images/so.png",
                url: "https://stackoverflow.com/users/4695325/devid-farinelli",
                label: "StackOverflow Profile"
            }
        ],
        stats: [
            {
                label: 'Firebase Knowledge',
                count: 'Used to be a lot'
            }
        ]
    },
    {
        label: "Video Editing",
        icon: "images/youtube.ico",
        description: `
        I decided to learn how to make video editing and english voice over. 
        I've achieved a decent result, I planned to make 3 videos of my GSoC experience but I failed to maintain my expectation. I would like to keep doing that, but I don't have anything to talk about.
        `,
        links: [
            {
                icon: "images/youtube.ico",
                url: "https://www.youtube.com/watch?v=7nS7MIKoHSI",
                label: "DEVLOG #1"
            }
        ],
        stats: [
            {
                label: 'Firebase Knowledge',
                count: 'Used to be a lot'
            }
        ]
    },
]