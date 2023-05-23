
import NavBar from "../components/NavBar";

import "../css/FirstForm.css"

import {useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const initialDataForm = {
  title: "",
  description: "",
  label1: "",
  label2: "",
  label3: "",
  label4: "",
  label5: "",
  label6: ""
}


const EditForm = ({setUserLogin}) => {

    const [postEdit, setPostEdit] = useState(initialDataForm);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      const fetchForm = async () => {
        const res = await fetch(`http://localhost:5000/forms/${id}`);
        const data = await res.json();

        console.log(data);
        setPostEdit(data);
    }

    fetchForm();
    // eslint-disable-next-line
}, [])


    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const title = postEdit.title;
        const description = postEdit.description;
        const label1 = postEdit.label1;
        const label2 = postEdit.label2;
        const label3 = postEdit.label3;
        const label4 = postEdit.label4;
        const label5 = postEdit.label5;
        const label6 = postEdit.label6;



        const data = await fetch(`http://localhost:5000/posts/${id}`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, description, label1, label2, label3, label4, label5, label6})
        })


        const raspuns = await data.json();
        console.log(raspuns);

        navigate('/myforms')
        
      } catch (error) {
        console.log(error);
      }
    }


    const handleChange = (e) => {
      const { name, value } = e.target;

      setPostEdit((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }

    return(
        <div>
            <NavBar setUserLogin={setUserLogin}/>
            <div className="main">
                <h2 style={{textAlign: "center", fontSize:"40px"}}>Edit form</h2>
            </div>
            <div>
              <form className="form_cont" onSubmit={handleSubmit}>
                            <input onChange={handleChange} value={postEdit.title} type="text" placeholder="Title" name="title" />
                            <input onChange={handleChange} value={postEdit.description} type="text" placeholder="Description" name="description" />
                            <input onChange={handleChange} value={postEdit.label1} type="text" placeholder="Question 1" name="label1" />
                            <input onChange={handleChange} value={postEdit.label2} type="text" placeholder="Question 2" name="label2" />
                            <input onChange={handleChange} value={postEdit.label3} type="text" placeholder="Question 3" name="label3" />
                            <input onChange={handleChange} value={postEdit.label4} type="text" placeholder="Question 4" name="label4" />
                            <input onChange={handleChange} value={postEdit.label5} type="text" placeholder="Question 5" name="label5" />
                            <input onChange={handleChange} value={postEdit.label6} type="text" placeholder="Question 6" name="label6" />

                            {/* <button onClick={handleEdit} className="btn_create"><b>Send</b></button> */}
                            <input id="btn_form" type="submit" value="Edit"/>
                </form>
            </div>

            <footer>
                <span>Created by Madalina</span>
            </footer>
        </div>
    )
}

export default EditForm;