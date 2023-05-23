import React from 'react'

import NavBar from '../components/NavBar';
import Loader from '../components/Loader';
import FormEdit from '../components/FormEdit';

import {useState, useEffect} from "react"
import "../css/FormsEdit.css"

const MyForms = ({userLogin, setUserLogin}) => {

    const [ forms, setForms ] = useState([]);
    const [loaderStatus, setLoaderStatus] = useState()
  
  useEffect(() => {
    const fetchForms = async () => {

      try {
        setLoaderStatus(true);
        const res = await fetch("http://localhost:5000/forms");
        const data = await res.json();

        console.log(data);
        setForms(data)
        setLoaderStatus(false);
        
      } catch (error) {
          console.log(error);
      }

    }

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

    // fetchForms();
  }, [setUserLogin])
  return (
    <div>
        <NavBar setUserLogin={setUserLogin}/>
        <div className="create_container1">
            <h2>My Forms</h2>
        </div>
        <div className='cont_formsEdit'>
            {forms.map((form, index) => (
                <FormEdit key={index} 
                title = {form.title}
                description = {form.description}
                id = {form._id}/>
            ))}
        </div>
        <footer>
            <span>Created by Madalina</span>
        </footer>
    </div>
   
  )
}

export default MyForms