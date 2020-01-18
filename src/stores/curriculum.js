export const categories = {
    EXP: {
        id: 'EXPERIENCE',
        count: 4,
    },
    EDU: {
        id: 'EDUCATION',
        count: 3,
    },
    PROJ: {
        id: 'PROJECTS',
        count: 5,
    },
    PRES: {
        id: 'PRESENTATIONS',
        count: 5,
    },
    MISC: {
        id: 'MISC',
        count: 3,
    }
}

export let queue = [
    {
        label: "FINAL THESIS",
        src: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1578614075/facepuncv/curriculum/d.png",
        date: "Feb 2020"
    },
    {
        label: "MASTER GRADUATION",
        src: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/alma.png",
        date: "Mar 2020"
    }
]

export let content = {}
content.EXPERIENCE = [
    {
        label: "WEBPACK",
        icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/webpack.png",
        date: {
            start: "Dec 2018",
            end: "Aug 2019"
        },
        description: `
        <p>
            <b>OSS Javascript Developer</b></br>
            Webpack (Remote work)
        </p>
        After contributing for some months to Webpack, I've been selected globally for the "Google Summer of Code 2019" to design and develop a modular output reporting system for webpack
        `,
        links: [
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/github.png",
                url: "https://github.com/misterdev/webpack-reporter-plugin",
                label: "PROJECT REPO"
            },
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/medium.png",
                url: "https://medium.com/webpack/summer-2019-with-webpack-840c7f7b97c4",
                label: "PRESENTATION ARTICLE"
            },
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/medium.png",
                url: "https://medium.com/webpack/summer-2019-with-webpack-5cd3ddbc9a05",
                label: "FINAL ARTICLE"
            },
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/gsoc.png",
                url: "https://summerofcode.withgoogle.com/",
                label: "GSOC WEBSITE"
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
        label: "LAY LAB",
        icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/laylab.png",
        date: {
            start: "Oct 2015",
            end: "Aug 2017"
        },
        description: `
        <p>
            <b>Fullstack Javascript Developer</b></br>
            Lay Lab (Altedo, BO)
        </p>
        I worked on web projects like the company website and a mobile app with a complex backend, using web technologies (Ionic, NodeJS, Firebase, ElasticSearch, ...)
        `,
        links: [
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/laylab.png",
                url: "https://github.com/misterdev/webpack-reporter-plugin",
                label: "COMPANY WEBSITE"
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
        label: "MIT APP INVENTOR",
        icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/appinventor.png",
        date: {
            start: "Jun 2015",
            end: "Sep 2015"
        },
        description: `
        <p>
            <b>OSS Javascript Developer</b></br>
            MIT Media Lab (Massachusetts, US - Remote work)
        </p>
        I've been selected globally for the "Google Summer of Code 2015" to work on an organization tool for the Blockly editor of MIT App Inventor 2
        `,
        links: [
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/gsoc.png",
                url: "https://www.google-melange.com/archive/gsoc/2015/orgs/media/projects/misterdev.html",
                label: "GSOC WEBSITE"
            },
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/gdoc.png",
                url: "https://docs.google.com/document/d/1nzdrNGGjEptc7phiU6JOuV8UQTZRNH_0Ve8lukBIZuI",
                label: "OVERVIEW"
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
        label: "DMDTEK",
        icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/android.png",
        date: {
            start: "Dec 2018",
            end: "Aug 2019"
        },
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
        label: "CS MASTER",
        icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/alma.png",
        date: {
            start: "Sep 2016",
            end: "Mar 2020"
        },
        description: `
        <p><b>University of Bologna</p></b>

        Master degree in Computer Science</br>
        Average Grade: 29.64/30</br>

        Planned graduation: March 2020
        `,
        links: [],
        stats: [
            {
                label: 'Computer Graphic',
                count: 1200
            },
            {
                label: 'UI & UX',
                count: 1000
            },
            {
                label: 'ML & AI',
                count: 1200
            },
            {
                label: 'Emerging Programming Paradigms',
                count: 1000
            },
            {
                label: 'Blockchain',
                count: 900
            },
            {
                label: 'Compilers & Interpreters',
                count: 900
            }
        ]
    },
    {
        label: "CS BACHELOR",
        icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/alma.png",
        date: {
            start: "Sep 2012",
            end: "Dec 2016"
        },
        description: `
        <p><b>University of Bologna</p></b>

        Bachelor degree in Computer Science</br>
        Score 98/110
        `,
        links: [],
        stats: [
            {
                label: 'Operating Systems',
                count: 1100
            },
            {
                label: 'Algorithms & Data Structures',
                count: 1000
            },
            {
                label: 'Web Development',
                count: 1000
            },
        ]
    },
    {
        label: "IT DIPLOMA",
        icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/itis.png",
        date: {
            start: "Sep 2007",
            end: "Aug 2012"
        },
        description: `
        <p><b>ITIS Odone Belluzzi</p></b>

        Secondary School Diploma in IT</br>
        Score 86/100        
        `,
        links: [],
        stats: [
            {
                label: 'Programming',
                count: 900
            },
            {
                label: 'Computer Architectures',
                count: 900
            }
        ]
    },
]

content.PROJECTS = [
    {
        label: "FACEPUNCV",
        icon: "https://res.cloudinary.com/misterdev/image/upload/v1578614075/facepuncv/curriculum/d.png",
        description: `
        When I decided to apply for Facepunch (in order to get hopefully noticed) I wanted to do
        something different from the usual CV to show my skills and attitude.
        The idea was to create something unique just for this application, so I recreated Rust's in
        game menu in a browser and adapted it to display my CV. </br>
        `,
        links: [
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/github.png",
                url: "https://github.com/misterdev/facepuncv",
                label: "PROJECT REPO"
            }
        ],
        stats: [
            {
                label: 'Svelte',
                count: 800
            },
            {
                label: 'ThreeJS',
                count: 600
            },
            {
                label: 'Video Editing',
                count: 300
            },
            {
                label: 'DnD API',
                count: 500
            }
        ]
    },
    {
        label: "MESOPOTAMIA JONES",
        icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/mj.png",
        date: {
            start: "Jul 2017",
            end: "Nov 2017"
        },
        description: "One of my favorite projects, a 2D browser game aimed at teaching programming to children. I made this with a friend, as a university project for the Usability and User Experience course, we used Phaser for the game, React with Typescript for the website, Blockly for the code editor and Webpack for the bundling.",
        links: [
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/mj.png",
                url: "https://loopingdoge.github.io/mesopotamia-jones",
                label: "WEBSITE"
            },
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/github.png",
                url: "https://github.com/loopingdoge/mesopotamia-jones",
                label: "PROJECT REPO"
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
        label: "WOWTARIA",
        icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/ld.png",
        date: {
            start: "Jan 2014",
            end: "Jul 2014"
        },
        description: `
        A browser app that allows making semantic annotations on scientific documents. This has been my first web project, where I learned a lot about Javascript development. We used Bootstrap for the UI and Python for the backend.</br>
        The database was shared and it is not available anymore, resulting in an infinite loading :(</br>
        `,
        links: [
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/ld.png",
                url: "http://ltw1423.web.cs.unibo.it/",
                label: "WEBSITE"
            },
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/github.png",
                url: "https://github.com/loopingdoge/wowtaria.git",
                label: "PROJECT REPO"
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
            {
                label: 'JS Animations',
                count: 100
            }
        ]
    },
    {
        label: "SENSORSPEAK",
        icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/alexa.png",
        date: {
            start: "Jan 2019",
            end: "Mar 2019"
        },
        description: `
        I developed an Alexa Skill that was able to obtain informations from the sensors of the Informatic Department of the University of Bologna.</br>
        The skill allows users to query a semantic database through Alexa only using natural language, the skill was implemented using AWS Lambda as backend.
        `,
        links: [
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/github.png",
                url: "https://github.com/misterdev/sensorspeak",
                label: "PROJECT REPO"
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
        label: "ETHEREUM GALAXY",
        icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/ld.png",
        date: {
            start: "Mar 2018",
            end: "Apr 2018"
        },
        description: `
        Visualizer of Ethereum transactions as a graph, inspired by <a href="https://anvaka.github.io/pm/#/?_k=qeo12l" target="_blank">pm</a>, developed using React and Typescript.</br>

        The database is not available anymore, resulting in no data visualized :(</br>
        `,
        links: [
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/ld.png",
                url: "http://www.devid.io/ethereum-galaxy/",
                label: "WEBSITE"
            },
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/github.png",
                url: "https://github.com/loopingdoge/ethereum-galaxy",
                label: "PROECT REPO"
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
        label: "[WIP] MIND PALACE",
        icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/ld.png",
        description: `
        A WIP 3D mnemonic device, developed using Aframe and webpack. </br>
        `,
        links: [
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/ld.png",
                url: "http://www.devid.io/mind-palace/",
                label: "WEBSITE"
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

content.PRESENTATIONS = [
    {
        label: "DARTLANG OVERVIEW",
        icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/inventory/dart.png",
        description: `
        This presentation is a complete overview of the Dart language, covering the history, the sintax and the runtime.
        `,
        links: [
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/gslides.png",
                url: "https://docs.google.com/presentation/d/1NCymVWktSoUsZ4rsjR3rN8XXyDDODzxRVD63PKUqpuM",
                label: "SLIDES"
            },
        ],
        stats: [
            {
                label: 'Dart',
                count: 'Almost everything about'
            }
        ]
    },
    {
        label: "FLUTTER",
        icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/flutter.png",
        description: `
        This is a comparison of the major hybrid mobile frameworks runtimes
        `,
        links: [
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/gslides.png",
                url: "https://docs.google.com/presentation/d/1qgDBWO59F1qPMsLaMF2ByFWGJaHWldYdkagDL5BvdPk/",
                label: "SLIDES"
            },
        ],
        stats: [
            {
                label: 'Hybrid Frameworks',
                count: 'How are implemented'
            }
        ]
    },
    {
        label: "BLOCKCHAIN APPLICATIONS",
        icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/btc.png",
        description: `
        In this presentation I covered the blockchain principles and the existing applications in different fields
        `,
        links: [
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/gslides.png",
                url: "https://docs.google.com/presentation/d/1nndT6NgdV06IRuf_CMwRHHQxpaJgGe1pb9f-YpB2lkc",
                label: "SLIDES"
            },
        ],
        stats: [
            {
                label: 'Blockchain',
                count: '1500'
            },
            {
                label: '€ Lost while trading',
                count: '300'
            }
        ]
    },
    {
        label: "GOOGLE I/O WEB NEWS",
        icon: "https://res.cloudinary.com/misterdev/image/upload/v1578614075/facepuncv/curriculum/d.png",
        description: `
        I made this presentation for the Google I/O Extended 19 in Bologna, I talked about the latest development regarding the Web (PWA, WebAssembly & Web API)
        `,
        links: [
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/gslides.png",
                url: "https://docs.google.com/presentation/d/1B6qLC-8F_93nQu7agUzkoK_eUW89zL4GNbUh02RPIN8",
                label: "SLIDES"
            },
        ],
        stats: [
            {
                label: 'WEB API',
                count: '800'
            },
            {
                label: 'WebAssembly',
                count: '500'
            },
            {
                label: 'PWA',
                count: '300'
            }
        ]
    }
]

content.MISC = [
    {
        label: "MEDIUM ARTICLES",
        icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/medium.png",
        description: `
        I wrote some articles about Webpack and the Google Summer of Code on Medium
        `,
        links: [
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/medium.png",
                url: "https://medium.com/@misterdev/how-to-write-a-webpack-scaffold-ace202775572",
                label: "How to write a Webpack scaffold"
            },
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/medium.png",
                url: "https://medium.com/webpack/summer-2019-with-webpack-840c7f7b97c4",
                label: "Summer 2019 with webpack"
            },
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/medium.png",
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
        label: "STACKOVERFLOW",
        icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/so.png",
        description: `
        I used to answer questions on Stack Overflow, mostly about Firebase and Javascript
        `,
        links: [
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/so.png",
                url: "https://stackoverflow.com/users/4695325/devid-farinelli",
                label: "MY PROFILE"
            }
        ],
        stats: [
            {
                label: 'Firebase Knowledge',
                count: 'Used to be a lot of'
            }
        ]
    },
    {
        label: "GDG",
        icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/GDGBO.png",
        description: `
        I organize, attend and speak at technical events. I manage the local GDG (Google Developers Group) community which I founded some years ago with some friends.
        `,
        links: [
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/metup.png",
                url: "https://www.meetup.com/gdgbologna/",
                label: "GDG BOLOGNA"
            },
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/GDGBO.png",
                url: "https://erdevfest18.firebaseapp.com/",
                label: "DEVFESTER 2018"
            }
        ],
        stats: [
            {
                label: 'Events Organization.',
                count: 'Very'
            },
            {
                label: 'Public Speaking.',
                count: 'Such'
            },
            {
                label: 'Wow.',
                count: ''
            }
        ]
    },
    {
        label: "VIDEO EDITING",
        icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1579313560/facepuncv/curriculum/youtube.png",
        description: `
        I wanted to learn how to make video editing and english voice over.</br> 
        I've achieved a decent result, I planned to make 3 videos of my GSoC experience but I failed to maintain my expectation. I enjoyed doing that, but I don't have anything to talk about.
        `,
        links: [
            {
                icon: "https://res.cloudinary.com/misterdev/image/upload/w_100,h_100,c_fill/v1576712983/facepuncv/curriculum/youtube.ico",
                url: "https://www.youtube.com/watch?v=7nS7MIKoHSI",
                label: "DEVLOG #1"
            }
        ],
        stats: [
            {
                label: 'Premiere',
                count: '700'
            },
            {
                label: 'Audacity',
                count: '600'
            },
            {
                label: 'English Diction',
                count: '18'
            }
        ]
    },
]