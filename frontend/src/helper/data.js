import KamalSingh from '../assets/homeImages/kamal.jpg';
import SatyamSingh from '../assets/homeImages/satyam.jpg';

const pages = [
    { name: 'Home', route: '/' },
    { name: 'Notes', route: '/notes' },
    { name: 'Articles', route: '/articles' },
    { name: 'About', route: '/about' },
    { name: 'Admin', route: '/admin' },
    { name: 'Login', route: '/login' },
];

const developers = [
    {
        name: "Kamal Singh",
        image: KamalSingh,
        role: "MERN Stack Developer",
        about: "I'm a Problem Solver, have good knowledge of Data Structure and Algorithms. Currently exploring MERN Stack for developeing Web apps.",
        linkedIn: "https://www.linkedin.com/in/kamalsinghofficial/",
        github: "https://github.com/kamal-singh819",
        portfolio: "https://kamal-singh-portfolio.vercel.app/"
    },
    {
        name: "Satyam singh",
        image: SatyamSingh,
        role: "Backend Developer",
        about: "I'm a Problem Solver, have good knowledge of Data Structure and Algorithms. Currently exploring Laravel & Php for backend development.",
        linkedIn: "https://www.linkedin.com/in/satyam-kumar-singh-381977203/",
        github: "https://github.com/satyams00",
        portfolio: "https://kamal-singh-portfolio.vercel.app/"
    }
]

export { developers, pages };