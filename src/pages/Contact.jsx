import React, { useState } from 'react';
import { toast } from 'react-toastify';
import NavBar from '../components/NavBar';

function Contact() {

  const [contactUsData, setContactUsData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setContactUsData((prev) => ({
      ...prev,
      [name]: value
    }));
   
  };

  const handleOnSubmit =async (e) => {
    e.preventDefault();
   try{

    const reponse=await fetch("http://localhost:8080/contact-us",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(contactUsData)

    })

    const data=await reponse.text();
    if(reponse.ok){
      toast.success(data,{theme:"dark"});
      setContactUsData(
        {
          name: "",
    email: "",
    subject: "",
    message: ""
        }
      )
    }
    else{
      toast.error(data)
      setContactUsData(
        {
          name: "",
    email: "",
    subject: "",
    message: ""
        }
      )
    }

   }
   catch(e){
    toast.error("Something Went Wrong.Please Try Again",{theme:"dark"})
      console.log("Something Went Wrong"+ e);
      setContactUsData(
        {
          name: "",
    email: "",
    subject: "",
    message: ""
        }
      )
   }
  };

  return (
      <>
      <NavBar/>
            <div className="container mt-5">
      <div className="mx-auto" style={{ maxWidth: '500px',maxHeight:"50vh" }}>
        <h2 className="text-center mb-4">Contact Us</h2>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={contactUsData.name}
              required
              onChange={handleOnChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="name@example.com"
              value={contactUsData.email}
              required
              onChange={handleOnChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="subject" className="form-label">Subject</label>
            <input
              type="text"
              className="form-control"
              id="subject"
              name="subject"
              placeholder="Subject of your message"
              value={contactUsData.subject}
              onChange={handleOnChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea
              className="form-control"
              id="message"
              rows="4"
              name="message"
              placeholder="Type your message here..."
              required
              value={contactUsData.message}
              onChange={handleOnChange}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100">Send Message</button>
        </form>
      </div>
    </div>
      </>
  );
}

export default Contact;
