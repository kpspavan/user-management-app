// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./components/context/UserContext";
import UserList from "../src/components/UserList";
import UserDetails from "../src/components/UserDetails";
import CreateUser from "../src/components/CreateUser";
import EditUser from "../src/components/EditUser";

function App() {
  return (
    <Router>
      <UserProvider>
        <div>
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/user/:id" element={<UserDetails />} />
            <Route path="/user/:id/edit" element={<EditUser />} />
            <Route path="/create-user" element={<CreateUser />} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
