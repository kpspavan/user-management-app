import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "./Layout";
import Button from "./Button/Button";
import RoleDropdown from "./Dropdown/Dropdown";
import axios from "axios";
import { styled } from "@mui/system";
import { TextField, FormHelperText } from "@mui/material";
import { useUserContext } from "./context/UserContext";

const FormContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  maxWidth: "400px",
  margin: "auto",
  padding: "1rem",
});

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useUserContext();
  const user = state.users.find((u) => u.id === id);

  const [editedUser, setEditedUser] = useState({
    username: user?.username || "",
    email: user?.email || "",
    role: user?.role || "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      // Handle user not found, redirect to user list or show an error message
      console.log("User not found. Redirecting to /");
      navigate("/");
    }
  }, [id, user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Email validation
    if (name === "email" && value.trim() !== "") {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setErrors({
        ...errors,
        [name]: isValidEmail ? null : "Invalid email address",
      });
    } else {
      setErrors({ ...errors, [name]: null });
    }

    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleEditUser = (e) => {
    e.preventDefault();

    // General validation for empty fields
    if (!editedUser.username.trim() || !editedUser.email.trim()) {
      setErrors({
        username: !editedUser.username.trim() ? "Username is required" : null,
        email: !editedUser.email.trim() ? "Email is required" : null,
      });
      return;
    }

    const hasErrors = Object.values(errors).some((error) => error !== null);

    if (hasErrors) {
      return;
    }

    // Simulate asynchronous API call with setTimeout
    setSubmitting(true);
    setTimeout(() => {
      axios
        .put(`http://localhost:3001/users/${id}`, editedUser)
        .then((response) => {
          // Update user in the state directly
          dispatch({
            type: "UPDATE_USER",
            payload: { id: parseInt(id, 10), updatedUser: editedUser },
          });
          // Inside the handleSubmit function, after successfully editing the user:
          dispatch({ type: "USER_EDITED" });

          setTimeout(() => {
            dispatch({ type: "RESET_USER_EDITED" });
          }, 2000);
          navigate(`/`);
        })
        .catch((error) =>
          console.error(`Error updating user with ID ${id}:`, error)
        )
        .finally(() => {
          setSubmitting(false);
        });
    }, 1000); // Simulating a 1-second delay (adjust as needed)
  };

  return (
    <>
      <Layout />
      <h2>Edit User</h2>
      <>
        <FormContainer>
          <TextField
            label="Username"
            name="username"
            value={editedUser.username}
            onChange={handleInputChange}
            error={Boolean(errors.username)}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={editedUser.email}
            onChange={handleInputChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            required
          />

          {/* Assuming RoleDropdown is a reusable component */}
          <RoleDropdown
            label="Role"
            required
            value={editedUser.role}
            error={errors.role}
            onChange={(e) =>
              handleInputChange({
                target: { name: "role", value: e.target.value },
              })
            }
          />

          <Button
            type="submit"
            variant="contained"
            onClick={handleEditUser}
            disabled={submitting}
            style={{ cursor: "pointer" }}
          >
            {submitting ? "Updating User..." : "Update User"}
          </Button>
        </FormContainer>
      </>
    </>
  );
};

export default EditUser;
