import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { SiAboutdotme } from "react-icons/si";
const TeamMemberCard = ({ data }) => {
    return (
        <div className="col-span-1 flex flex-col gap-4 border-2 border-neutral-400 rounded-lg overflow-hidden p-3 hover:bg-darkColor">
            <div className=""><img className="w-full rounded-full" src={data.image} alt="profile" /></div>
            <p className="text-xl text-white">{data.name}</p>
            <p className="text-sm text-neutral-500">{data.about}</p>
            <div className="flex gap-3 ">
                <a href={data.github} target="_blank"><FaGithub className="text-neutral-400 transition-all duration-300 ease-in hover:text-white cursor-pointer" /></a>
                <a href={data.linkedIn} target="_blank"><FaLinkedinIn className="text-neutral-400 transition-all duration-300 ease-in hover:text-white cursor-pointer" /></a>
                <a href={data.portfolio} target="_blank"><SiAboutdotme className="text-neutral-400 transition-all duration-300 ease-in hover:text-white cursor-pointer text-xl" /> </a>
            </div>
        </div>
    )
}
export default TeamMemberCard;