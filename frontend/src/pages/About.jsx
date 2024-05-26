const About = () => {
    return (
        <div className=" flex flex-col gap-5 p-6 sm:px-8 lg:px-[10rem] md:py-[3rem] text-white">
            <p className="text-center text-3xl font-bold">Welcome</p>
            <p className="text-neutral-300">Welcome to <span className="font-bold">NoteStack</span>, your go-to destination for accessing a treasure trove of knowledge in the realm of computer science. At <span className="font-bold">NoteStack</span>, we strive to empower individuals with the tools and resources they need to excel in their academic and professional endeavors.</p>
            <p className="text-2xl font-bold">Our Mission</p>
            <p className="text-neutral-300">Our mission is simple yet profound: to democratize education and make learning accessible to all. We believe that knowledge should be freely available to anyone with the curiosity and passion to pursue it. Through our platform, we aim to break down barriers to learning and foster a community of lifelong learners.</p>
            <p className="text-2xl font-bold">What We Offer</p>
            <ul className=" flex flex-col gap-4 list-disc">
                <li className="text-neutral-300"> <span className="text-bold text-white">Download PDFs: </span> Explore our vast collection of PDF notes covering a wide range of topics in computer science. Whether you're a student, professional, or enthusiast, you'll find valuable resources to enhance your understanding and skills.</li>
                <li className="text-neutral-300"> <span className="text-bold text-white"> Articles: </span> Dive deep into the world of computer science with our curated articles. From beginner-friendly introductions to advanced concepts, our articles cover a diverse array of topics to cater to learners of all levels.</li>
                <li className="text-neutral-300"> <span className="text-bold text-white"> Feedback and Support: </span> We value feedback from our users and are committed to continuously improving our platform. If you come across any errors or have suggestions for improvement, please don't hesitate to reach out to us. Your feedback helps us enhance the user experience for everyone.</li>
                <li className="text-neutral-300"> <span className="text-bold text-white"> Organized Notes and Search Functionality: </span> Our notes are meticulously organized by topic, making it easy for users to navigate and find the information they're looking for. Additionally, our search functionality allows users to quickly locate specific notes based on keywords or topics of interest.</li>
                <li className="text-neutral-300"> <span className="text-bold text-white"> Admin Section: </span> As the administrator of <span className="font-bold">NoteStack</span>, I have the privilege of managing and curating content for our platform. From uploading PDF notes to writing articles, I ensure that our repository remains up-to-date and relevant to our users' needs.</li>
            </ul>
        </div>
    )
}

export default About;