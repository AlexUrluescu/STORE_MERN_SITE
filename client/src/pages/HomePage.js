import { useEffect } from "react";
import NavBar from "../components/NavBar";
import { AiOutlineArrowDown } from "react-icons/ai";

// import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

import myImage from "../static/planeta.png";
import "../css/HomePage.css";
// import FormEx from "../components/FormEx";
import { url } from "../static/url_server";

const HomePage = ({ userLogin, setUserLogin }) => {
  useEffect(() => {
    const sendData = async () => {
      try {
        const res = await fetch(`${url}/userData`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: window.localStorage.getItem("token") }),
        });

        const data = await res.json();

        console.log(data);
        console.log(data.data);

        let userData = data.data;
        setUserLogin(userData);
      } catch (error) {
        console.log(error);
      }
    };

    sendData();
  }, [setUserLogin]);

  console.log(userLogin);
  console.log(userLogin.length);

  return (
    <div>
      {/* // eslint-disable-next-line */}
      <NavBar setUserLogin={setUserLogin} />
      {/* // eslint-disable-next-line */}
      <div className="container_home">
        <div className="container_welcome">
          <h1 className="title_page">StoreWeb</h1>
          {/* // eslint-disable-next-line */}
          {userLogin.length !== 0 ? (
            <h1 className="welcome_h">
              Bine ai venit,{" "}
              <b className="welcome_b">
                {userLogin.first_name} {userLogin.last_name}
              </b>
            </h1>
          ) : (
            <h1> </h1>
          )}
          {userLogin.length !== 0 ? <h3> </h3> : <div>Login now and enjoy</div>}
          {/* // eslint-disable-next-line */}
          {userLogin.length !== 0 ? (
            <h3> </h3>
          ) : (
            <Link className="login_link" to="/login">
              {" "}
              Login{" "}
            </Link>
          )}
        </div>
        <div className="container_image">
          {/* // eslint-disable-next-line */}
          <img src={myImage} alt="" />
        </div>
      </div>

      <div className="container_iconArrow">
        <span><AiOutlineArrowDown className="icon_arrow"/></span>
      </div>

      <Link className="link_store" to="/store">
        <div className="view_container">
          <p>View all the products here!</p>
        </div>
      </Link>

      <footer className="footer">
        <span>Created by Madalina Pantea</span>
      </footer>
    </div>
  );
};

export default HomePage;
