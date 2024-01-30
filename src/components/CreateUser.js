// CreateUser.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../components/context/UserContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Layout from "./Layout";
import AddIcon from '@mui/icons-material/Add';
import CustomInput from "./Input/Input";
import Button from "./Button/Button";
import RoleDropdown from "./Dropdown/Dropdown";
import { styled } from "@mui/system";
import axios from "axios";

const FormContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  maxWidth: "400px",
  margin: "auto",
  padding: "1rem",
});

const CreateUser = () => {
  const { state, dispatch } = useUserContext();
  console.log("stateishere", state);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Find the maximum existing ID
    const maxId = Math.max(...state.users.map((user) => parseInt(user.id)), 0);
    // Increment the maximum ID by 1 to get the next available ID
    const nextAvailableId = (maxId + 1).toString();
    // Set the next available ID in the state
    setNewUser((prevUser) => ({ ...prevUser, id: nextAvailableId }));
  }, [state.users]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // General validation for empty fields
    if (
      !newUser.username.trim() ||
      !newUser.email.trim() ||
      !newUser.role.trim()
    ) {
      setErrors({
        username: !newUser.username.trim() ? "Username is required" : null,
        email: !newUser.email.trim() ? "Email is required" : null,
        role: !newUser.role.trim() ? "Role is required" : null,
      });
      return;
    }

    // Simulate asynchronous API call with setTimeout
    setSubmitting(true);
    axios
      .post("http://localhost:3001/users", newUser)
      .then((response) => {
        dispatch({ type: "ADD_USER", payload: response.data });
        // Navigate to user list
        navigate("/");
      })
      .catch((error) => console.error("Error creating user:", error))
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <>
      <Layout />
      <h2 style={{ textAlign: "center" }}>Create User</h2>
      <FormContainer>
        <CustomInput
          label="Username"
          name="username"
          value={newUser.username}
          onChange={handleInputChange}
          error={errors.username}
          required
        />
        <CustomInput
          label="Email"
          name="email"
          type="email"
          value={newUser.email}
          onChange={handleInputChange}
          error={errors.email}
          required
        />

        <RoleDropdown
          label="Role"
          required
          value={newUser.role}
          error={errors.role}
          onChange={(e) =>
            handleInputChange({
              target: { name: "role", value: e.target.value },
            })
          }
        />

        <Button
          type="submit"
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
          style={{ cursor: "pointer" }}
        >
          {submitting ? "Creating User..." : "Create User"}
        </Button>
        <>
          <Button  startIcon={<ArrowBackIcon />} onClick={() => navigate("/")} variant="contained">
            Go back to User List
          </Button>
        </>
      </FormContainer>
    </>
  );
};

export default CreateUser;
