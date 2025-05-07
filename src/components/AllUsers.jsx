import React, { useEffect, useState } from 'react';
import '../styles/AllUsers.css';


function AllUsers() {
  const [users, setUsers] = useState([]); 
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [searchKey, setSearchKey] = useState('');

  const fetchAllUsers = async () => {
   try{
    const token=localStorage.getItem("adminJwt");
    const response = await fetch("http://localhost:8080/user/allusers",{
      method:"GET",
      headers:{
        "Authorization":`Bearer ${token}`
      }
    });
    const usersData = await response.json();
    setUsers(usersData);
    setFilteredUsers(usersData); 
   }
   catch(e){
    
    console.log(e)
   }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    const filteredData = users.filter((user) =>
      user.name.toLowerCase().includes(searchKey.toLowerCase()) ||
      user.email.toLowerCase().includes(searchKey.toLowerCase())
    );
    setFilteredUsers(filteredData);
  }, [searchKey, users]);

  const handleSearch = (e) => {
    setSearchKey(e.target.value);
  };

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter Username or Email"
          name="searchKey"
          onChange={handleSearch}
        />
      </div>

      <div className="users-container">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div className="user" key={user.id}>
              <img
                src={user.profileUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt=""
              />
              <h1><strong>Name: </strong> {user.name}</h1>
              <h3><strong>Email: </strong>{user.email}</h3>
              <h3><strong>Mobile Number: </strong>{user.mobile}</h3>
              <button>Block</button>
            </div>
          ))
        ) : (
          <h1>No User Found</h1>
        )}
      </div>
    </>
  );
}

export default AllUsers;
