import heroImage from "../assets/homeImages/image.png";
import About from "../components/About";

const Home = () => {
    return (
        <div className="bg-darkColor min-h-[calc(100vh-4rem)] mt-0">
            <div className="flex flex-col-reverse md:flex-row p-4 sm:px-8 lg:px-[10rem] py-10 items-center">
                <div className="flex flex-col gap-4 md:w-[50vw]">
                    <h2 className="text-2xl text-white md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                        Connecting Minds through Articles & Notes
                    </h2>
                    <p className="text-neutral-400">
                        Welcome to our comprehensive collection of PDFs and articles dedicated to computer science! Whether you're a student, researcher, or simply curious about the world of computing, our website offers a wealth of resources to explore. <br />
                        We believe in the power of knowledge-sharing and continuous learning. That's why all our resources are easily accessible and free to download, empowering individuals from all backgrounds to explore and expand their knowledge of computer science.
                    </p>
                    <div className="flex gap-2">
                        <button className="cursor-pointer border border-accentOrange bg-accentOrange hover:bg-white hover:text-accentOrange text-white rounded-full py-2 px-4">
                            Contact Us
                        </button>
                        <button className="cursor-pointer border border-accentOrange bg-white hover:bg-accentOrange hover:text-white text-accentOrange rounded-full py-2 px-4">
                            Learn More
                        </button>
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
            <About />
        </div>
    );
};

export default Home;
