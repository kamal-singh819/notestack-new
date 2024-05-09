import KamalSingh from '../assets/kamal.jpg';
const subjectOptions = [
    { value: 'Database Management System', label: 'Database Management System' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Operating System', label: 'Operating System' },
    { value: 'Object Oreinted Programming', label: 'Object Oreinted Programming' }
];


const likesOptions = [
    { value: 'Acending', label: 'Acending' },
    { value: 'Decending', label: 'Decending' }
];

const pages = [
    { name: 'Home', route: '/' },
    { name: 'Notes', route: '/notes' },
    { name: 'Articles', route: '/articles' },
    { name: 'Admin', route: '/admin' },
    { name: 'Login', route: '/login' },
];

const developers = [
    {
        name: "Kamal Singh",
        image: KamalSingh,
        about: "Software Developer in Itobuz Technologies Pvt. Ltd. Kolkata",
        linkedIn: "https://www.linkedin.com/in/kamalsinghofficial/",
        github: "https://github.com/kamal-singh819",
        portfolio: "https://kamal-singh-portfolio.vercel.app/"
    },
    {
        name: "Satyam singh",
        image: KamalSingh,
        about: "Software Developer in Itobuz Technologies Pvt. Ltd. Kolkata",
        linkedIn: "https://www.linkedin.com/in/kamalsinghofficial/",
        github: "https://github.com/kamal-singh819",
        portfolio: "https://kamal-singh-portfolio.vercel.app/"
    }
]

export { developers, pages, likesOptions, subjectOptions };