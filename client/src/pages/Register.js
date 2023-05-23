import Form from "../components/Form";
import NavBar from "../components/NavBar";

import "../css/Register.css"

const Register = () => {
    return(
        <div>
            <NavBar />
            <div className="main_cont_register">
                <div className="cont_register">
                    <div className="text_register"><h2>Register</h2></div>
                    <Form />
                </div>
            </div>
        </div>
    )
}

export default Register;