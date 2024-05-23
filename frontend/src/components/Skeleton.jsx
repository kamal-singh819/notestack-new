const Skeleton = ({ count = 1, isRounded, customClass }) => {
    return (
        Array(count).fill(0).map((_, index) => <div key={index} className={`${customClass} bg-gray-300 ${isRounded ? "rounded-full" : ""} animate-pulse rtl:space-x-reverse`}></div>)
    )
}

export default Skeleton;