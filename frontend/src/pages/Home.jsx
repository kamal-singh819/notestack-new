import heroImage from "../assets/homeImages/image.png";
import OurTeam from "../components/OurTeam";
import { animated, useTrail } from '@react-spring/web';

const Home = () => {
    const heading = "Connecting Minds Through Articles And Notes".split(' ');
    const springText = useTrail(heading.length, {
        from: { opacity: 0, transform: 'translate3d(0,40px,40px)' },
        to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
        delay: 200
    })
    return (
        <div className="min-h-[calc(100vh-5rem)] mt-0">
            <div className="flex flex-col-reverse gap-10 md:flex-row p-4 sm:px-8 lg:px-[10rem] md:py-[3rem] xl:py-[9rem] items-center">
                <div className="flex flex-col gap-4 md:w-[50vw]">
                    <h2 className="text-2xl text-white md:text-3xl lg:text-4xl xl:text-5xl font-bold font-mono">
                        {springText.map((prop, idx) => <animated.span key={idx} style={prop} className={`inline-block mr-4`}>{heading[idx]}</animated.span>)}
                    </h2>
                    <p className="text-neutral-400">
                        Welcome to our comprehensive collection of PDFs and articles dedicated to computer science! Whether you're a student, researcher, or simply curious about the world of computing, our website offers a wealth of resources to explore. <br />
                        We believe in the power of knowledge-sharing and continuous learning. That's why all our resources are easily accessible and free to download, empowering individuals from all backgrounds to explore and expand their knowledge of computer science.
                    </p>
                    <div className="flex gap-2">
                        <a href="#footer" className="cursor-pointer border border-accentOrange bg-accentOrange hover:bg-white hover:text-accentOrange text-white rounded-full py-2 px-4">
                            Contact Us
                        </a>
                        <a href="#ourTeam" className="cursor-pointer border border-accentOrange bg-white hover:bg-accentOrange hover:text-white text-accentOrange rounded-full py-2 px-4">
                            Our Team
                        </a>
                    </div>
                </div>
                <div className="md:w-[50vw] flex justify-center">
                    <img
                        className="md:w-[100%] lg:w-[80%] lg:h-[80%]"
                        src={heroImage}
                        alt="HERO IMAGE"
                    />
                </div>
            </div>
            <OurTeam />
        </div>
    );
};

export default Home;
