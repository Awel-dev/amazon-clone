import React from 'react'
import { useState,useContext} from 'react'
import{Link, useNavigate, useLocation, } from "react-router-dom"
import classes from './signup.module.css'
import Amazon  from '../../../assets/amazon.png'
import {auth} from "../../../assets/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { DataContext } from '../../dataProvider/dataProvider'
import {CircleLoader  } from "react-spinners"


function Auth() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState({signin:false,signup:false});
  const [{user},dispatch]=useContext(DataContext);
  console.log(user);
  const navigate=useNavigate();
  const location=useLocation();
  console.log(location);

  const authHandler=(e)=>{
    e.preventDefault();
    console.log(e.target.name);
    if(e.target.name==="signin"){
      setLoading({...loading,signin:true})
   signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
      dispatch({type:"SET_USER",user:userCredential.user})
   setLoading({...loading,signin:false})
    navigate(location?.state?.redirect || "/")
  }).catch((error)=>{
    console.log(error);
    setError(error.message)
    setLoading({...loading,signin:false})
  })}
  else if(e.target.name==="signup"){
     setLoading({...loading,signup:true})
  createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
    // console.log(userCredential);
      dispatch({type:"SET_USER",user:userCredential.user})
      setLoading({...loading,signup:false})
    navigate(location?.state?.redirect || "/")
  }).catch((error)=>{
    console.log(error);
    setError(error.message)
    setLoading({...loading,signup:false})
  })
}}
  // console.log(email,password);
  
  return (
    <section className={classes.signup_container}>
     {/* logo */}
     
<Link to="/">
<img src={Amazon} alt="amazon" style={{ width: "120px", height: "auto", marginTop:'30px' }}/>

</Link>
<div className={classes.login_container}>
  <h1>Sign-In</h1>
  {location?.state?.msg && <small style={{color:"red",marginBottom:"10px"}}>{location.state.msg}</small>}
   <form action="">
    <div>
      <label htmlFor="email">Email</label>
      <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" id='email' />
    </div>
    <div>
      <label htmlFor="password">Password</label>
      <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id='password' />
    </div>
    <button name='signin' type="submit" onClick={authHandler} className={classes.signin_btn}>
      {loading.signin?<CircleLoader  color='black' size={15}/>: ("Sign In")}
     
    </button>
   </form>
   <p>
    By sign-in you agree to the AMAZON-FAKE CLONE condition of use and sale.
    Please see our pravicy notice, our cookies notice and our interest-based Ads notice.
   </p>

   <button name='signup' type="button" onClick={authHandler} className={classes.create_account_btn}>
      {loading.signup?<CircleLoader  color='black' size={15}/>: ("Create your Amazon account")}
   </button>
   {error && <small style={{color:"red",marginTop:"10px"}}>{error}</small>}
</div>
    </section>
  )
}

export default Auth;
