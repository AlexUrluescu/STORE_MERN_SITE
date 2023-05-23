import { NotFoundPage, HomePage, Register, Login, FirstForm, Create, FormSelect, MyForms, EditForm } from "./pages";
import {Routes, Route } from "react-router-dom";
import UserData from "./pages/UserData";
import { useState, useEffect } from "react";
import Forms from "./pages/Forms";


function App() {

  const [ userLogin, setUserLogin ] = useState([])

  useEffect(() => {

    const sendData = async () => {
      try {
          const res = await fetch("http://localhost:5000/userData", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({token: window.localStorage.getItem("token")})
          });

          const data = await res.json();

          let userData = data.data;
          setUserLogin(userData);

        if(userLogin.email === "admin@gmail.com"){
            window.localStorage.setItem("isAdmin", true);
        }
          
          
      } catch (error) {
          console.log(error);
      }
  }

  sendData();
  }, [setUserLogin, userLogin.email])


  return (
   <div>
      <Routes>
        <Route path = '/' element = {<HomePage userLogin={userLogin} setUserLogin={setUserLogin} />} />
        <Route path="/register" element = {<Register />} />
        <Route path = '/forms' element = {<Forms userLogin={userLogin} setUserLogin={setUserLogin}/>} />
        <Route path="/forms/:id" element = {<FormSelect setUserLogin={setUserLogin} />}/>
        <Route path="/myforms/:id" element = {<EditForm setUserLogin={setUserLogin} />}/>
        <Route path='/login' element = {<Login userLogin = {userLogin} setUserLogin={setUserLogin}/>}/>
        <Route path='/userData' element = {<UserData/>} />
        <Route path='/create' element = {<Create userLogin={userLogin} setUserLogin={setUserLogin}/>} />
        <Route path='/myforms' element = {<MyForms userLogin={userLogin} setUserLogin={setUserLogin}/>} />
        <Route path="/firstForm" element = {<FirstForm userLogin={userLogin} setUserLogin={setUserLogin}/>} />
        <Route path = '*' element = {<NotFoundPage />} />
      </Routes>
   </div>
  );
}  

export default App;
