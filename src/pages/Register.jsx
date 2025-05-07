import React, { useState } from 'react'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Register() {
    const navigate=useNavigate();
    const [formData,setFormData]=useState({
        name: "",
    email: "",
    mobile: "",
    password: ""
    })

    const handelOnChange=(e)=>{
            const {name,value}=e.target;

            setFormData((prev)=>({
                ...prev,
                [name]:value
            }))
    }
    console.log(formData)

    const validate=()=>{
        const {name,email,mobile,password}=formData;

        if(!name || !email || !mobile || !password){
            toast.error("All Fileds Are Required",{theme:"dark"});
            return false;
        }
        if (!/^[A-Z]/.test(name)){
            toast.error("Name must start with an uppercase",{theme:"dark"})
            return false;
        }
        if(!/^[6789]/.test(mobile)){
            toast.error("Number Should Start With 6,7,8 or 9",{theme:"dark"});
            return false;
        }
    if(mobile.length!=10){
        toast.error("Mobile Number Should conatin 10 Digits",{theme:"dark"})
        return false;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        toast.error("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character", { theme: "dark" });
        return false;
    }
    return true;
    
    }

    const handelOnSubmit=async (e)=>{
        e.preventDefault();

        if(!validate()){
            return;
        }
        console.log(formData)

        try{
        const response=await fetch("http://localhost:8080/user/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)

        });
        const data=await response.text();
        if(response.ok){
            console.log(data);
            toast.success(data,{
                autoClose:2000,
                onClose:()=>navigate("/login")
            })
          

        }
        else{
            console.log(data)
          toast.error(data,{theme:"dark"});
        }
    }
    catch(e){
        console.log(e);
    }
    }
  return (
    <div className="register-form">
        <h2>Registration Form</h2>
        <form onSubmit={handelOnSubmit}>

            <input type="text" name="name" placeholder='Enter Username' onChange={handelOnChange} />
            <input type="email" name="email" placeholder='Enter Email' onChange={handelOnChange} />
            <input type="tel" name="mobile" placeholder='Enter Mobile Number' onChange={handelOnChange} />
            <input type="password" name='password' placeholder='Enter Password' onChange={handelOnChange} />
            <button type='submit'>Register</button>
        </form>
        <span>Already Have Account <Link to='/login' >Click Here</Link></span>
    </div>
  )
}

export default Register