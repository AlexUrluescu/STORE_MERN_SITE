import React from 'react'

import "../css/Forms.css";

import NavBar from '../components/NavBar'
import FormEx from '../components/FormEx'
import Footer from '../components/Footer';

import { useState, useEffect } from 'react';

import Loader from '../components/Loader';
import { url } from '../static/url_server';


function Forms({userLogin, setUserLogin}) {

  const [ products, setProducts ] = useState([]);
  const [loaderStatus, setLoaderStatus] = useState()
  
  useEffect(() => {
    const fetchForms = async () => {

      try {
        setLoaderStatus(true);
        const res = await fetch(`${url}/posts`);
        const data = await res.json();

        // console.log(data);
        setProducts(data)
        setLoaderStatus(false);
        
      } catch (error) {
          console.log(error);
      }

    }

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

    fetchForms();
  }, [setUserLogin])


  return (
    <div>
        <NavBar setUserLogin={setUserLogin}/>
        <div className='store_products'>
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

        <Footer />
    </div>
  )
}

export default Forms