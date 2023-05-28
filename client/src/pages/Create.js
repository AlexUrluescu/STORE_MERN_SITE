
import NavBar from "../components/NavBar";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../css/Create.css";

import { url } from "../static/url_server";

const initialForm = {
  product_name: '',
  details: '',
  price: ''
}

const Create = ({userLogin, setUserLogin}) => {

    const [ post, setPost ] = useState(initialForm);

    const navigate = useNavigate()

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
    
                let userData = data.data;
                setUserLogin(userData);
                
                
            } catch (error) {
                console.log(error);
            }
        }
    
        sendData();
    
    }, [setUserLogin])

    console.log(userLogin);

    initialForm.user_name = userLogin.last_name + ' ' + userLogin.first_name;
    console.log(initialForm);


    const handleChange = (e) => {
        const { name, value } = e.target;

        setPost((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(post);

        const res = await fetch(`${url}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
        });

        const data = await res.json();
        console.log(data);

        if(data.status === "ok"){
            console.log('Post created succesfully');
            setPost(initialForm)
            navigate("/store")
        }

        else if(data.status === "error"){
            alert("Nu esti logat")
        }

    }

    return(
        <div>
            <NavBar setUserLogin={setUserLogin}/>
            <div className="create_container1">
                <div>
                <div>
                    <div>
                        <h2>Add a product</h2>
                    </div>
                    <div className="create_form">
                        <form className="form_cont" onSubmit={handleSubmit}>
                            <input onChange={handleChange} value={post.product_name} type="text" placeholder="Product name" name="product_name" />
                            <input onChange={handleChange} value={post.details} type="text" placeholder="Details" name="details" />
                            <input onChange={handleChange} value={post.price} type="text" placeholder="Price" name="price" />

                            <button className="btn_create" type="submit"><b>Create</b></button>
                        </form>
                    </div>
                </div>
                </div>
            </div>
            <footer className="footer">
                <span>Created by Madalina Pantea</span>
            </footer>
            
        </div>
    )
}

export default Create;