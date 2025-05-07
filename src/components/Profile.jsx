import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {
  const { user } = useContext(UserContext);

  const [updateForm, setUpdateForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    profileUrl: null
  });

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "profileUrl" ? files[0] : value
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
        <div className="text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Profile"
            className="rounded-circle mb-3"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          <h4 className="mb-1">Name: <span className="fw-normal">{user?.name}</span></h4>
          <p className="mb-1">Email: <span className="fw-normal">{user?.email}</span></p>
          <p className="mb-3">Mobile: <span className="fw-normal">{user?.mobile}</span></p>
          <button
            onClick={() => setUpdateForm(!updateForm)}
            className="btn btn-primary"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {updateForm && (
        <div className="card p-4 mt-4 shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
          <h5 className="mb-3 text-center">Update Profile</h5>
          <form onSubmit={handleOnSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                name="mobile"
                className="form-control"
                placeholder="Enter Mobile"
                value={formData.mobile}
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Upload Profile</label>
              <input
                type="file"
                name="profileUrl"
                className="form-control"
                onChange={handleOnChange}
              />
            </div>
            <button type="submit" className="btn btn-success w-100">Update</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Profile;
