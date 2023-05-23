import React from 'react'
import { Link } from 'react-router-dom';

const FormEx = ({title, description, link}) => {

  console.log(title);

  return (
    <div className='form'>
        <div className='form_title'>{title}</div>
        <div className='form_content'>{description}</div>
        <div className='form_link'><Link className='button_link' to={`/forms/${link}`}>Click</Link></div>
    </div>
  )
}

export default FormEx;