import { useNavigate } from "react-router-dom";
const WrongRoute = () => {
    const navigate = useNavigate();
    function handleButton() {
        navigate("/");
    }
    return (
        <div>
            <p>You are not allowed to go this page</p>
            <button onClick={handleButton}> Go back to home </button>
        </div>
    )
}

export default WrongRoute;
