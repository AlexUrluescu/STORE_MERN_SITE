import { Link } from "react-router-dom";


const FormEdit = ({title, description, price, id}) => {

  const handleDelete = async () => {
    // console.log("delete");
    try {

      const data = await fetch(`http://localhost:5000/posts/${id}`, {
          method:'DELETE'
      })


  const res = await data.json()
  console.log(res);

  if(res.message === "Deleted"){
      window.location.reload();
  }    
      
  } catch (error) {
      console.log(error);
  }
  }

  return (
    <div className='formEdit'>
        <div className='form_title'>{title}</div>
        <div className='form_content'>{description}</div>
        <div className='form_content'>{price}</div>
        <div className="btn_cont">
            <button className='btn_delete' onClick ={handleDelete}>Delete</button>
            <Link className='button_link' to={`/myproducts/${id}`}>Edit</Link>
        </div>
    </div>
  )
}

export default FormEdit;