import React from 'react'
import { Link } from 'react-router-dom';
import { FaMoneyBillAlt } from "react-icons/fa";

const FormEx = ({title, description, price, link}) => {

  return (
    <div className='form2'>
        <div className='product_title'>{title}</div>
        <div className='form_all_content'>
          <div className='form_content'>{description}</div>
          <div className='form_price'>
            <p>{price} </p>
            <span><FaMoneyBillAlt className='icon_dolar'/></span>
          </div>
          
        </div>
        <div className='product_link'><Link className='btn_store_view' to={`/store/${link}`}>View</Link></div>
    </div>
  )
}

export default FormEx;