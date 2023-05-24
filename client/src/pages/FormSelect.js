
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


import "../css/Create.css";

import NavBar from '../components/NavBar';



const FormSelect = ({setUserLogin}) => {

    const navigate = useNavigate();

    const {id} = useParams();

    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);
    // const [dataForm, setDataForm] = useState(initialDataForm);


    useEffect(() => {
        const fetchForm = async () => {
            const res = await fetch(`http://localhost:5000/posts/${id}`);
            const data = await res.json();

            console.log(data);
            setProduct(data)
        }

        setTotal(parseInt(product.price) * quantity);

        fetchForm();
        // eslint-disable-next-line
    }, [quantity, product.price])


    const handlePlus = () => {
        setQuantity(quantity + 1)
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
        alert(`You bought ${quantity} ${product.product_name} at ${total} $ `);
        navigate("/store")
      }

  return (
    <div>
        <NavBar setUserLogin={setUserLogin}/>
        <div className='cont_all'>
        <div className='form2'>
        <div className='form_title'>{product.product_name}</div>
        <div className='form_content'>{product.details}</div>
        <div className='form_content'>{product.price}</div>
        <div className='form_content'>
          <p>Quantity: {quantity}</p>
          <button onClick={handlePlus}>+</button>
          <button onClick={handleMinus}>-</button>
        </div>
        <div>
          <p>Total: {total}</p>
        </div>
        <div className='form_link'><button onClick={handleButton} className='button_link'>Buy</button></div>
    </div>
        </div>
    </div>
  )
}

export default FormSelect