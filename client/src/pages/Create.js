
import NavBar from "../components/NavBar";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../css/Create.css";

const initialForm = {
    title: "",
    description: "",
    label1: "",
    label2: "",
    label3: "",
    label4: "",
    label5: "",
    label6: ""
}

const Create = ({userLogin, setUserLogin}) => {

    const [ post, setPost ] = useState(initialForm);

    const navigate = useNavigate()

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

        const res = await fetch("http://localhost:5000/form1", {
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
            navigate("/forms")
        }

        else if(data.status === "error"){
            alert("Nu esti logat")
        }

    }

    return(
        <div>
            <NavBar setUserLogin={setUserLogin}/>
            <div className="create_container1">
                <div className="cont_all">
                <div className="create_box">
                    <div>
                        <h2>Create a post</h2>
                    </div>
                    <div className="create_form">
                        <form className="form_cont" onSubmit={handleSubmit}>
                            <input onChange={handleChange} value={post.title} type="text" placeholder="Title" name="title" />
                            <input onChange={handleChange} value={post.description} type="text" placeholder="Description" name="description" />
                            <input onChange={handleChange} value={post.label1} type="text" placeholder="Question 1" name="label1" />
                            <input onChange={handleChange} value={post.label2} type="text" placeholder="Question 2" name="label2" />
                            <input onChange={handleChange} value={post.label3} type="text" placeholder="Question 3" name="label3" />
                            <input onChange={handleChange} value={post.label4} type="text" placeholder="Question 4" name="label4" />
                            <input onChange={handleChange} value={post.label5} type="text" placeholder="Question 5" name="label5" />
                            <input onChange={handleChange} value={post.label6} type="text" placeholder="Question 6" name="label6" />

                            <button className="btn_create" type="submit"><b>Create</b></button>
                        </form>
                    </div>
                </div>
                </div>
            </div>
            <footer>
                <span>Created by Madalina</span>
            </footer>
            
        </div>
    )
}

export default Create;