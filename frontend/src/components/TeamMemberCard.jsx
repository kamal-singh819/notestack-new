import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { SiAboutdotme } from "react-icons/si";
const TeamMemberCard = ({ data }) => {
    return (
        <div className="col-span-1 flex flex-col lg:flex-row items-center gap-6 border-2 border-neutral-400 rounded-lg p-3 hover:bg-darkColor">
            <div className="h-40 w-40 lg:w-60"><img className="w-full aspect-square rounded-full" src={data.image} alt="profile" /></div>
            <div className="flex flex-col items-center lg:items-start gap-2">
                <h4 className="text-2xl text-white">{data.name}</h4>
                <p className="text-lg text-neutral-200 font-mono">{data.role}</p>
                <p className="text-sm text-neutral-400 px-6 lg:px-0">{data.about}</p>
                <div className="flex items-center gap-3 ">
                    <a href={data.github} target="_blank"><FaGithub className="text-neutral-300 transition-all duration-300 ease-in hover:text-white shadow-2xl cursor-pointer" /></a>
                    <a href={data.linkedIn} target="_blank"><FaLinkedinIn className="text-neutral-300 transition-all duration-300 ease-in hover:text-white shadow-2xl cursor-pointer" /></a>
                    <a href={data.portfolio} target="_blank"><SiAboutdotme className="text-neutral-300 transition-all duration-300 ease-in hover:text-white shadow-2xl cursor-pointer text-2xl" /> </a>
                </div>
            </div>
        </div>
    )
}
export default TeamMemberCard;