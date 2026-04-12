import react,{useContext,useEffect}from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../dataProvider/dataProvider";
const ProtectedRouting=({children,msg,redirect})=>{
    const navigate=useNavigate();
    const [{user}, dispatch] = useContext(DataContext);
    useEffect(()=>{
        if(!user){
           navigate("/auth",{state:{msg:msg, redirect:redirect}}) 
        }
    },[user])
    return children
}
export default ProtectedRouting;