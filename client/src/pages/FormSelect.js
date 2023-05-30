
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { FaMoneyBillAlt } from "react-icons/fa";

import "../css/ProductSelect.css";

import NavBar from '../components/NavBar';
import { url } from '../static/url_server';


const FormSelect = ({setUserLogin}) => {

    const navigate = useNavigate();

    const {id} = useParams();

    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);
    // const [dataForm, setDataForm] = useState(initialDataForm);


    useEffect(() => {
        const fetchForm = async () => {
            const res = await fetch(`${url}/posts/${id}`);
            const data = await res.json();

            console.log(data);
            setProduct(data)
        }

        setTotal(parseInt(product.price) * quantity);

        fetchForm();
        // eslint-disable-next-line
    }, [quantity, product.price])


    const handlePlus = () => {
        const bucProduct = parseInt(product.quantity);
        if(quantity < bucProduct) setQuantity(quantity + 1)

        else{
          setQuantity(bucProduct)
        }
        
      }
    
      const handleMinus = () => {
        if(quantity === 0){
          setQuantity(0)
        }
    
        else{
          setQuantity(quantity - 1)
        }
      }

      const handleButton = () => {

        if(quantity === 0){
          alert("Nu ai adaugat nicio bucata")
        }
        else{
          alert(`You bought ${quantity} ${product.product_name} at ${total} $ `);
          navigate("/store")
        }

      }

  return (
    <div>
        <NavBar setUserLogin={setUserLogin}/>
        <div className='container_product_select'>
          <div className='product_select'>
            <div className='product_select_text'>
              <div className='title_product_select'><p>{product.product_name}</p></div>
              <p id = "p1" className='product_details'>{product.details}</p>
              <div className='container_price'>
                <p className='product_class'>{product.price}</p>
                <span><FaMoneyBillAlt className='icon_dolar'/></span>
              </div>
              <div>
                <p>Buc: {product.quantity}</p>
              </div>
            </div>
            <div className='product_math'>
              <div className='product_quantity'>
                <p>{quantity} buc</p>
                <div className='btn_container'>
                  <button onClick={handlePlus}>+</button>
                  <button onClick={handleMinus}>-</button>
                </div>
              </div>
              <div className='product_total'>
                <p>Total: {total} RON</p>
              </div>
            </div>
            <div className='product_link'><button onClick={handleButton} className='button_link'>Buy</button></div>
          </div>
          
        </div>
    </div>
  )
}

export default FormSelect