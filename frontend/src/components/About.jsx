import TeamMemberCard from "./TeamMemberCard";
import { developers } from "../helper/data";
const About = () => {
    return (
        <div id="about" className="bg-[#192735] px-4 sm:px-10 py-10 flex justify-center">
            <div className="max-w-[40rem]">
                <h2 className="text-white text-2xl text-center mb-4">Developer Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {developers.map(ele => <TeamMemberCard key={ele.name} data={ele} />)}
                </div>
            </div>
        </div>
    )
}

export default About;