import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminProfile() {
  const [adminData, setAdminData] = useState(null);

  const [changePassword, setChangePassword] = useState({
    email: "",
    password: ""
  });

  const [updateProfile, setUpdateProfile] = useState({
    name: "",
    email: "",
    password: ""
  });

  const fetchAdminData = async () => {
    const token = localStorage.getItem("adminJwt");
    try {
      const response = await fetch("http://localhost:8080/admin/get-admin", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAdminData(data);
      if (!response.ok) {
        console.log("Something Went Wrong");
      }
    } catch (e) {
      console.log("error" + e);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handelUpdatePasswordOnChange = (e) => {
    const { name, value } = e.target;
    setChangePassword((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handelUpdatePasswordOnSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminJwt");
    const response = await fetch("http://localhost:8080/admin/update-password", {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(changePassword)
    });

    const data = await response.text();
    document.querySelector(".message-password").textContent = data;

    setChangePassword({
      email: "",
      password: ""
    });
  };

  const updateProfileOnChnage = (e) => {
    const { name, value } = e.target;
    setUpdateProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const updateProfileOnSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminJwt");
    const response = await fetch("http://localhost:8080/admin/update", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateProfile)
    });

    const data = await response.text();
    document.querySelector(".message-profile").textContent = data;
  };

  return (
    <div className="container my-5">
      <div className="card p-4 mb-4 shadow-sm">
        <h2 className="text-center mb-4">Admin Details</h2>
        <h5><strong>Name:</strong> {adminData?.name}</h5>
        <h6><strong>Email:</strong> {adminData?.email}</h6>
      </div>

      <div className="card p-4 mb-4 shadow-sm">
        <h4 className="mb-3">Update Password</h4>
        <form onSubmit={handelUpdatePasswordOnSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={changePassword.email}
              onChange={handelUpdatePasswordOnChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              value={changePassword.password}
              onChange={handelUpdatePasswordOnChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Change Password</button>
          <div className="text-success mt-2 message-password"></div>
        </form>
      </div>

      <div className="card p-4 shadow-sm">
        <h4 className="mb-3">Update Profile</h4>
        <form onSubmit={updateProfileOnSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              value={updateProfile.name}
              onChange={updateProfileOnChnage}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={updateProfile.email}
              onChange={updateProfileOnChnage}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              value={updateProfile.password}
              onChange={updateProfileOnChnage}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Update Profile</button>
          <div className="text-success mt-2 message-profile"></div>
        </form>
      </div>
    </div>
  );
}

export default AdminProfile;
