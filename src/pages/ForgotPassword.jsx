import React, { useState } from 'react'

function ForgotPassword() {
    const [formData,setFormData]=useState({
        email:"",
        password:"",
        conformpassword:""


    })
    const handelOnChange=(e)=>{
        const{name,value}=e.target;

        setFormData((prev)=>({
                ...prev,
                [name]:value
        }))
    }

    const handelOnSubmit=(e)=>{
        e.prevenDefault();

        console.log(formData)
    }
  return (
    <div className='forgot-password-container'>
            <h2>Reset Password</h2>
        <form action="" onSubmit={handelOnSubmit}>
            <input type="email" placeholder='Enter Email' value={formData.email} name='email'onChange={handelOnChange}/>
            <input type="password" placeholder='Enter New Password' value={formData.password} name='password' onChange={handelOnChange}/>
            <input type='password' placeholder='Enter Conform Password'value={formData.conformpassword} name='conformpasseord' onChange={handelOnChange}/>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default ForgotPassword