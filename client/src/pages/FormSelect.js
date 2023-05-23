
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import "../css/Create.css";

import NavBar from '../components/NavBar';

const initialDataForm = {
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    answer5: "",
    answer6: ""
}

const FormSelect = ({setUserLogin}) => {

    const {id} = useParams();

    const [formular, setFormular] = useState('');
    const [dataForm, setDataForm] = useState(initialDataForm);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Formular trimis cu succes")
        setDataForm(initialDataForm);
    }

    const handleChange = (e) => {
        const { name, value} = e.target;

        setDataForm((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));
    }

    useEffect(() => {
        const fetchForm = async () => {
            const res = await fetch(`http://localhost:5000/forms/${id}`);
            const data = await res.json();

            console.log(data);
            setFormular(data);
        }

        fetchForm();
        // eslint-disable-next-line
    }, [])

  return (
    <div>
        <NavBar setUserLogin={setUserLogin}/>
        <div className='cont_all'>
            <div className='create_box'>
                <div>
                    <h2>{formular.title}</h2>
                </div>
                <div className='create_form'>
                    <form onSubmit={handleSubmit} className='form_cont'>
                    <label htmlFor="input1">{formular.label1}</label>
                        <input id="input1" onChange={handleChange} value={dataForm.answer1} type="text" name="answer1"/>

                        <label htmlFor="input2">{formular.label2}</label>
                        <input id="input2" onChange={handleChange} value={dataForm.answer2} type="text" name="answer2"/>

                        <label htmlFor="input3">{formular.label3}</label>
                        <input id="input3" onChange={handleChange} value={dataForm.answer3} type="text" name="answer3"/>

                        <label htmlFor="input4">{formular.label4}</label>
                        <input id="input4" onChange={handleChange} value={dataForm.answer4} type="text" name="answer4"/>

                        <label htmlFor="input8">{formular.label5}</label>
                        <input id="input8" onChange={handleChange} value={dataForm.answer5} type="text" name="answer5"/>

                        <label htmlFor="input5">{formular.label6}</label>
                        <input id="input5" onChange={handleChange} value={dataForm.answer6} type="text" name="answer6"/>

                        <button type='submit' className='btn_create'>Send</button>
                        {/* <input type='submit' value="Send" /> */}
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormSelect