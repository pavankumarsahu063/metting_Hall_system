import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function Login() {

    const[formData,setFormData]=useState({
        email:"",
        password:""
    });

    

    const navigate=useNavigate();


    const handelOnChange=(e)=>{
            const {name,value}=e.target;
            setFormData((prev)=>({
                ...prev,
                [name]:value
            }))
    }

    const handelSubmit=async (e)=>{
        e.preventDefault();
        console.log(formData)
        try{
        const response=await fetch("http://localhost:8080/user/login",{
            method:'POST',
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify(formData)
        });
        
        const data=await response.text();
        if(response.ok){
           console.log(data)
            console.log(data.token)
            localStorage.setItem("jwtToken",data);
            toast.success("Login successful", { theme: "light" , autoClose:1000 ,onClose:()=> navigate('/user/dashboard')});
           
        }
        else{
           
            toast.error(data,{theme:"dark"});
        }
    }
    catch(e){
        console.log(e);
       
        toast.error("Something Went Wrong")
    }
    }
  
  return (
   
        <div className="login-form">
            <h2>Login Form</h2>
            <form onSubmit={handelSubmit}>
                <input type="email" placeholder='Enter Email' name="email" value={formData.email} onChange={handelOnChange} required/>
                <input type="password" placeholder='Enter Password' name='password' value={formData.password} onChange={handelOnChange} required/>
                <button type='submit' >Login</button>
           
            </form>
            <span>Don't Have Account <Link to='/register'>Click Here</Link></span>
            <span>Forgot Password <Link to='/forgot'>Click Here</Link> </span>
           
        </div>

        
   
  )
}

export default Login