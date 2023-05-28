

import { useEffect, useContext } from "react";
import NavBar from "../components/NavBar";
import UserContext from "../context/UserContext";
import { url } from "../static/url_server";


const UserData = () => {

    const {userLogin, setUserLogin} = useContext(UserContext)

    useEffect(() => {
        const sendData = async () => {
            try {
                const res = await fetch(`${url}/userData`, {
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
                console.log(userData);
                setUserLogin(userData);
                
            } catch (error) {
                console.log(error);
            }
        }

        sendData();

    }, [setUserLogin])

    console.log(userLogin);

    return(
        <div>
            <NavBar />
            <h2>Name {userLogin.first_name}</h2>
            <h2>Email {userLogin.email}</h2>
        </div>
    )
}

export default UserData;