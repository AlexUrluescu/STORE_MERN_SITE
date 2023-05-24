import React from 'react'
import { Link } from 'react-router-dom';

const FormEx = ({title, description, price, link}) => {

  return (
    <div className='form2'>
        <div className='form_title'>{title}</div>
        <div className='form_content'>{description}</div>
        <div className='form_content'>{price}</div>
        <div className='form_link'><Link className='button_link' to={`/store/${link}`}>View</Link></div>
    </div>
  )
}

export default FormEx;