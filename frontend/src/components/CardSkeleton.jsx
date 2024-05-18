import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
const CardSkeleton = ({ cards, lines, width }) => {
    return (
        Array(cards).fill(0).map((_, index) =>
            <div key={index}>
                <Skeleton count={lines} style={{ marginBottom: "8px", width: width }} />
            </div>)
    )
}

export default CardSkeleton;
