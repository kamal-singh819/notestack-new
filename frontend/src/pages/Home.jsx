import heroImage from "../assets/homeImages/image.png";
const Home = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row p-4 md:px-8 lg:px-[10rem] md:mt-[2rem] items-center">
      <div className="flex flex-col gap-4 md:w-[50vw]">
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
          Connecting Minds through Articles & Notes
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
          repellendus quasi fuga nesciunt dolorum nulla magnam veniam sapiente,
          fugiat! fuga nesciunt dolorum nulla magnam veniam sapiente, fugiat!
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
  );
};

export default Home;
