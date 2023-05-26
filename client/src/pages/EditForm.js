
import NavBar from "../components/NavBar";

import "../css/FirstForm.css"

import {useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const initialDataForm = {
  product_name: "",
  details: "",
  price: ""
}


const EditForm = ({setUserLogin}) => {

    const [postEdit, setPostEdit] = useState(initialDataForm);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      const fetchForm = async () => {
        const res = await fetch(`http://localhost:5000/posts/${id}`);
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
        const product_name = postEdit.product_name;
        const details = postEdit.details;
        const price = postEdit.price;

        const data = await fetch(`http://localhost:5000/posts/${id}`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ product_name, details, price })
        })


        const raspuns = await data.json();
        console.log(raspuns);

        navigate('/myproducts')
        
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
                            <input onChange={handleChange} value={postEdit.product_name} type="text" placeholder="Product name" name="product_name" />
                            <input onChange={handleChange} value={postEdit.details} type="text" placeholder="Details" name="details" />
                            <input onChange={handleChange} value={postEdit.price} type="text" placeholder="Price" name="price" />

                            {/* <button onClick={handleEdit} className="btn_create"><b>Send</b></button> */}
                            <input id="btn_form" type="submit" value="Edit"/>
                </form>
            </div>

            <footer className="footer">
                <span>Created by Madalina Pantea</span>
            </footer>
        </div>
    )
}

export default EditForm;