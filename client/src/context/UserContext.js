
import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({children}) => {

    const [ userLogin, setUserLogin ] = useState([])


    const data = {userLogin, setUserLogin}

    return(
        <UserContext.Provider value={data}>{children}</UserContext.Provider>
    )
}

export {UserProvider};
export default UserContext;