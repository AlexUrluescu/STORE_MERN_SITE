
import { Link } from "react-router-dom";
import "../css/NavBar.css"


const NavBar = ({setUserLogin}) => {

    const isLoggedIn = window.localStorage.getItem("loggedIn");
    const isAdmin = window.localStorage.getItem("isAdmin");

    const handleClick = () => {
        window.localStorage.clear();
        setUserLogin([]);
        // navigate("/login")
        // window.location.href = "./login"
    }

    return(
        <div className="navbar">
            <div className="title">
                <h2>StoreWeb</h2>
            </div>
            <div className="links">
                <Link className="link" to="/"> Home </Link>
                <Link className="link" to="/store"> Store </Link>
                
                {isAdmin ? <Link className="link" to="/create"> Add </Link> : " "}
                {isAdmin ? <Link className="link" to="/myproducts"> Admin Store </Link> : " "}
                {isLoggedIn ? <Link className="logout" to="/login" onClick={handleClick}>Log out</Link>: <Link className="login" to="/login"> Login </Link>}

            </div>
        </div>
    )
}

export default NavBar;