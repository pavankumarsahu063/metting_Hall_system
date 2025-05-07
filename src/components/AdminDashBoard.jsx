import { useEffect, useState } from "react";
import AddHall from "./AddHall";
import AllBookings from "./AllBookings";
import AllUsers from "./AllUsers";
import DisplayAllHallss from "./DisplayAllHallss";
import AdminProfile from "./AdminProfile";
import { useNavigate } from "react-router-dom";

function AdminDashBoard() {

  const navigator = useNavigate();
  const [adminData, setAdminData] = useState(null);
  const [active, setActive] = useState("displayallhalls");
  const [logout, setLogout] = useState(false);

  if (logout) {
    localStorage.removeItem("adminJwt");
    navigator("/");
  }

  // if(localStorage.getItem("adminJwt")==null){
  //   navigator("/")
  // }
  function currentSection() {
    switch (active) {
      case "adminprofile":
        return <AdminProfile />;
      case "allusers":
        return <AllUsers />;
      case "addhall":
        return <AddHall />;
      case "bookedhalls":
        return <AllBookings />;
      case "displayallhalls":
        return <DisplayAllHallss />;
      default:
        return <DisplayAllHallss />;
    }
  }

  const fetchAdminData = async () => {
    const token = localStorage.getItem("adminJwt");
    if(token==null){
      navigator("/");
    }
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

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <div className="heading">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="img"
          />
          <h4>{adminData?.name || "Admin"}</h4>
        </div>
        <div className="nav-bar">
          <button
            onClick={() => setActive("displayallhalls")}
            className={active === "displayallhalls" ? "active" : ""}
          >
            All Halls
          </button>
          <button
            onClick={() => setActive("adminprofile")}
            className={active === "adminprofile" ? "active" : ""}
          >
            My Profile
          </button>
          <button
            onClick={() => setActive("addhall")}
            className={active === "addhall" ? "active" : ""}
          >
            Add Hall
          </button>
          <button
            onClick={() => setActive("allusers")}
            className={active === "allusers" ? "active" : ""}
          >
          All Users
          </button>
          <button
            onClick={() => setActive("bookedhalls")}
            className={active === "bookedhalls" ? "active" : ""}
          >
            Booked Halls
          </button>
          <button onClick={() => setLogout(true)}>Logout</button>
        </div>
      </aside>

      <main className="main-content">{currentSection()}</main>
    </div>
  );
}

export default AdminDashBoard;
