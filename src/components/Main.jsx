import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Main() {
  const navigate = useNavigate();
  const [admindata, setAdminData] = useState({ email: "", password: "" });
 

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setAdminData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
      const response = await fetch("http://localhost:8080/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admindata)
      });

      const data = await response.text();

      if (response.ok) {
        localStorage.setItem("adminJwt", data);
        toast.success("Login Sucessfull",{
          autoClose:2000,
          onClose:()=> navigate("/admin-dashboard")
        })
       }
       else{
        toast.error(data,{theme:"dark"})
       }
      }
    catch (error) {
      console.log(error)
      toast.error("Something Went Wrong.Pleaase Try Again Later",{theme:"dark"})
      
      console.error( error);
     
    }
  };

  return (
    <div className="main-container">
      <div className="content">
        <h1>Streamline Your Meetings with Instant Hall Booking</h1>
        <h2>Reserve. Meet. Collaborate.</h2>
        <p>
          Welcome to your centralized platform for booking internal meeting rooms,
          conference halls, and discussion spaces — tailored for seamless scheduling
          within our company.
        </p>
     
      </div>

      <div className="login-form">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={admindata.email}
            onChange={handleOnChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={admindata.password}
            onChange={handleOnChange}
            required
          />
          <button type="submit">Login</button>
         
        </form>
      </div>
    </div>
  );
}

export default Main;
