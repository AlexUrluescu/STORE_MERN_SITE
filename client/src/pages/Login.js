
import { Link } from "react-router-dom";
import { useState } from "react";

import NavBar from "../components/NavBar";
import "../css/Login.css";
import { url } from "../static/url_server";

const initialUser = {
    email: "",
    password: ""
}

const Login = ({setUserLogin}) => {

    const [user, setUser] = useState(initialUser);
    const error_alert = document.getElementById("error_alert");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(user);

        const res = await fetch(`${url}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
        });

        const data = await res.json();
        console.log(data);

        if(data.error === 'Password incorrect'){
            // alert('Parola incorecta');
            error_alert.textContent = "Parola incorecta";
        }

        if(data.error === 'user not found'){
            // alert('Nu s-a putut gasi user-ul');
            error_alert.textContent = "Email incorect";
        }

        if(data.status === "ok"){
            console.log('Login succesful');
            window.localStorage.setItem("token", data.data);
            setUserLogin(data.data)
            window.localStorage.setItem("loggedIn", true);
            window.location.href = "./";
        }

    }

    return(
        <div>
            <NavBar setUserLogin={setUserLogin}/>
            <div className="container-fr">
                <div className="login_container">
                    <div className="form_text">
                        <h1><b>Welcome in StoreWeb</b></h1>
                        <h3>Login with your email and password</h3>
                    </div>
                    <form onSubmit={handleSubmit} className="login_form">
                        <h4 className="error_h" id="error_alert"> </h4>
                        <input
                            onChange={handleChange}
                            className="input_login" 
                            type="text" 
                            placeholder="Email"
                            name="email" />
                
                        <input
                            onChange={handleChange}
                            className="input_login" 
                            type="password" 
                            placeholder="Password"
                            name="password" />

                        <input className="login_button" type="submit" value="Login"/>
                    </form>
                    <div className="register_cont">
                        <h2>Don't have an account?<Link className="link_register" to="/register"> Register </Link></h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;