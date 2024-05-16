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
        about: "MERN Stack Developer",
        linkedIn: "https://www.linkedin.com/in/kamalsinghofficial/",
        github: "https://github.com/kamal-singh819",
        portfolio: "https://kamal-singh-portfolio.vercel.app/"
    },
    {
        name: "Satyam singh",
        image: SatyamSingh,
        about: "Backend Developer",
        linkedIn: "https://www.linkedin.com/in/satyam-kumar-singh-381977203/",
        github: "https://github.com/satyams00",
        portfolio: "https://kamal-singh-portfolio.vercel.app/"
    }
]

export { developers, pages };