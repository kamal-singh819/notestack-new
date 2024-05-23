import Skeletons from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const CardSkeleton = ({ cards, lines, width }) => {
    return (
        Array(cards).fill(0).map((_, index) =>
            <div key={index}>
                <Skeletons count={lines} style={{ marginBottom: "8px", width: width }} />
            </div>)
    )
}

export default CardSkeleton;

import Skeleton from "./Skeleton";
const ArticleSkeleton = () => {
    return (
        <div className="space-y-3">
            <Skeleton customClass={"w-[70%] h-6 rounded-xl mx-auto mb-5"} />
            {Array(25).fill(0).map((_, index) => <Skeleton key={index} customClass={"w-full h-4 rounded-xl"} />)}
        </div>
    );
}

const ArticleProfileSkeleton = () => {
    return (
        <div>
            <div className="space-y-3">
                <Skeleton customClass={"w-20 h-20 rounded-full mx-auto mb-2"} />
                <Skeleton customClass={"w-40 h-5 rounded-xl mb-4"} />
                <Skeleton customClass={"w-40 h-5 rounded-xl mb-4"} />
                <Skeleton customClass={"w-40 h-5 rounded-xl mb-4"} />
            </div>
        </div>
    )
}


export { ArticleSkeleton, ArticleProfileSkeleton };