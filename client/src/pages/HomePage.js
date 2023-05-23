
import { useEffect } from "react";
import NavBar from "../components/NavBar";


// import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

import myImage from "../static/poza11.png"
import "../css/HomePage.css";
// import FormEx from "../components/FormEx";


const HomePage = ({userLogin , setUserLogin}) => {

    useEffect(() => {

        const sendData = async () => {
                try {

                    const res = await fetch("http://localhost:5000/userData", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({token: window.localStorage.getItem("token")})
                    });
    
                    const data = await res.json();
    
                    console.log(data);
                    console.log(data.data);
    
                    let userData = data.data;
                    setUserLogin(userData);
                    
                    
                } catch (error) {
                    console.log(error);
                }
            
            }        
        
        sendData();

    }, [setUserLogin])


    console.log(userLogin);
    console.log(userLogin.length);

    return(
        <div>
            {/* // eslint-disable-next-line */}
            <NavBar setUserLogin={setUserLogin}/>
            {/* // eslint-disable-next-line */}
            <div className="container_home">
                <div className="container_welcome">
                {/* // eslint-disable-next-line */}
                    {userLogin.length !== 0 ? <h1 className="welcome_h">Welcome <b className="welcome_b">{userLogin.first_name} {userLogin.last_name}</b></h1>:<h1> </h1>}
                    <h1>Welcome in FormsWeb</h1>
                    <p className="container_p">Here you can find forms to complete</p>
                    {/* <p>WebSchool is the best web learning platform</p> */}
                    {/* // eslint-disable-next-line */}
                    {userLogin.length !== 0 ? <h3> </h3>: <Link className="login_link" to="/login"> Login </Link>}
                </div>
                <div className="container_image">
                {/* // eslint-disable-next-line */}
                    <img src={myImage} alt=""/>
                </div>
            </div>
            
            <footer className="footer">
                <span>Created by Madalina</span>
            </footer>
        </div> 
    )
}

export default HomePage;