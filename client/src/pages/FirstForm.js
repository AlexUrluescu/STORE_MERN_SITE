
import NavBar from "../components/NavBar";

import "../css/FirstForm.css"

import { useState, useEffect } from "react"

const initalDataForm = {
    coleges: "",
    class_plus: "",
    teacher_help: "",
    city:"",
    hobby: "",
    study_hours: "",
    concentration: "",
    teacher_comunication: ""
}

const FirstForm = ({userLogin, setUserLogin}) => {

    const [dataForm, setDataForm] = useState(initalDataForm);

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
    
                let userData = data.data;
                setUserLogin(userData);
                
                
            } catch (error) {
                console.log(error);
            }
        }
    
        sendData();
    }, [setUserLogin])

    initalDataForm.user_name = userLogin.last_name + ' ' + userLogin.first_name;
    console.log(initalDataForm);

    const handleChange = (e) => {
        const { name, value} = e.target;

        setDataForm((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Trimis");
        alert("Formular trimis cu succes!")

    }

    return(
        <div>
            <NavBar />
            <div className="main">
                <div className="first_title">
                    <h2>FirstForm</h2>
                </div>
                <div className="div_form">
                    <form className="firstForm">
                        <label htmlFor="input1">Label pt input 1</label>
                        <input id="input1" onChange={handleChange} value={dataForm.coleges} type="text" name="coleges"/>

                        <label htmlFor="input2">Label pt input 2</label>
                        <input id="input2" onChange={handleChange} value={dataForm.class_plus} type="text" name="class_plus"/>

                        <label htmlFor="input3">Label pt input 3</label>
                        <input id="input3" onChange={handleChange} value={dataForm.teacher_help} type="text" name="teacher_help"/>

                        <label htmlFor="input4">Label pt input 4</label>
                        <input id="input4" onChange={handleChange} value={dataForm.city} type="text" name="city"/>

                        <label htmlFor="input8">Label pt input 4</label>
                        <input id="input8" onChange={handleChange} value={dataForm.hobby} type="text" name="hobby"/>

                        <label htmlFor="input5">Label pt input 3</label>
                        <input id="input5" onChange={handleChange} value={dataForm.study_hours} type="text" name="study_hours"/>

                        <label htmlFor="input6">Label pt input 3</label>
                        <input id="input6" onChange={handleChange} value={dataForm.concentration} type="text" name="concentration"/>

                        <label htmlFor="input7">Label pt input 3</label>
                        <input id="input7" onChange={handleChange} value={dataForm.teacher_comunication} type="text" name="teacher_comunication"/>

                        <div className="div_btn">
                            <input id="btn_form" type="submit" onClick={handleSubmit} value="Send"/>
                        </div>
                    </form>
                </div>

            </div>

            <footer>
                <span>Created by Madalina</span>
            </footer>
        </div>
    )
}

export default FirstForm;