const LoadingPage = ({ bgColor }) => {
    return (
        <div className={`min-h-[calc(100vh-5rem)] ${bgColor} flex justify-center items-center`}>
            <div className="animate-spin w-[35px] h-[35px]">
                <div className="h-full w-full border-4 border-t-purple-500 border-b-purple-700 rounded-full"></div>
            </div>
        </div>
    );
}

export default LoadingPage;