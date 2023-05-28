import { Link } from "react-router-dom";
import { FaMoneyBillAlt } from "react-icons/fa";
import { url } from "../static/url_server";


const FormEdit = ({title, description, price, id}) => {

  const handleDelete = async () => {
    // console.log("delete");
    try {

      const data = await fetch(`${url}/posts/${id}`, {
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


        <div className="myproduct">
          <div className='product_title'>{title}</div>
          <div className='form_all_content'>
            <div className='form_content'>{description}</div>
            <div className='form_price'>
              <p>{price} </p>
              <span><FaMoneyBillAlt className='icon_dolar'/></span>
            </div>
            
          </div>
          <div className='product_link'>
            <button className='btn_delete' onClick ={handleDelete}>Delete</button>
            <Link className='button_link_edit' to={`/myproducts/${id}`}>Edit</Link>
            {/* <Link className='btn_store_view' to={`/store/${link}`}>View</Link> */}
          </div>
        </div>

  )
}

export default FormEdit;