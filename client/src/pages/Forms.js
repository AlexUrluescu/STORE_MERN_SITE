import React from 'react'

import "../css/Forms.css";

import NavBar from '../components/NavBar'
import FormEx from '../components/FormEx'

import { useState, useEffect } from 'react';

import Loader from '../components/Loader';


function Forms({userLogin, setUserLogin}) {

  const [ products, setProducts ] = useState([]);
  const [loaderStatus, setLoaderStatus] = useState()
  
  useEffect(() => {
    const fetchForms = async () => {

      try {
        setLoaderStatus(true);
        const res = await fetch("http://localhost:5000/posts");
        const data = await res.json();

        console.log(data);
        setProducts(data)
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

    fetchForms();
  }, [setUserLogin])


  return (
    <div>
        <NavBar setUserLogin={setUserLogin}/>
        <div className="container_forms">
                <div className="div_title"><h2>Store</h2></div>
                <div className='cont_content'>
                  {loaderStatus ? <div style={{textAlign: "center"}}><Loader /></div> : <div className="div_forms">
                    {products.map((product, index) => (
                        <FormEx key={index} 
                          title = {product.product_name}
                          description = {product.details}
                          price = {product.price}
                          link= {product._id}/>
                      ))}  
                  </div>}
                  
                </div>
        </div>

        <footer>
                <span>Created by Madalina</span>
        </footer>
    </div>
  )
}

export default Forms