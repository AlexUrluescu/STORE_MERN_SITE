
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';



const Post = ({subject, details, price, user_name}) => {

    const handleClick = () => {
        alert("Product added")
    }

    return(
        <div className="post_container">
            <div className="post_subject">
                <h3>{subject}</h3>
                <span>
                    <FontAwesomeIcon className='user_icon' icon={faUser}  />
                    {user_name}
                </span>
            </div>
            <div className="post_details">
                <p>{details}</p>
            </div>
            <div className="post_price">
                <h4>Price: {price} RON</h4>
                <button className="buy_button" onClick={handleClick}><b>Buy</b></button>
            </div>
        </div>
    )
}

export default Post;