import TeamMemberCard from "./TeamMemberCard";
import { developers } from "../helper/data";
const OurTeam = () => {
    return (
        <div id="ourTeam" className="bg-[#192735] px-4 sm:px-10 py-10 flex justify-center">
            <div className="max-w-[40rem]">
                <h2 className="text-white text-2xl font-bold text-center mb-4">Developer Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {developers.map(ele => <TeamMemberCard key={ele.name} data={ele} />)}
                </div>
            </div>
        </div>
    )
}

export default OurTeam;