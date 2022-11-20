import Login from "./Login";
import { useMoralis } from "react-moralis";
import Doctor from "./Doctor";
import Navbar from "../component/Navbar";

const Doctorlogin = () => {
    const { isAuthenticated, logout, user } = useMoralis();
    return (
        <div>
      <Navbar/>
        
      {isAuthenticated ?
        <div >
          <Doctor username={user.get("username")} />
        </div>
        : (
          <Login />
        )}


       
    </div>
    )
}
export default Doctorlogin;