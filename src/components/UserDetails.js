import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useUserContext } from "./context/UserContext";
import Layout from "./Layout";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

const UserDetails = () => {
  const { id } = useParams();
  const { state, dispatch } = useUserContext();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    // Dispatch RESET_EDIT_SUCCESS action when navigating back
    dispatch({ type: "RESET_EDIT_SUCCESS" });
    navigate("/");
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${id}`)
      .then((response) => {
        const updatedUser = {
          ...response.data,
          id: response.data.id.toString(),
        };

        dispatch({
          type: "UPDATE_USER",
          payload: updatedUser,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching user with ID ${id}:`, error);
        setLoading(false);
      });
  }, [id, dispatch]);

  const user = state.users.find((u) => u.id === id);

  const handleDeleteUser = () => {
    axios
      .delete(`http://localhost:3001/users/${id}`)
      .then(() => {
        dispatch({ type: "DELETE_USER", payload: { id } });
        dispatch({ type: "USER_DELETED" });
        navigate("/");
      })
      .catch((error) => {
        console.error(`Error deleting user with ID ${id}:`, error);
      });
  };

  if (loading) {
    return (
      <>
        <Layout />
        Loading...
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Layout />
        <div>User not found</div>
        <Link to="/">Go back to User List</Link>
      </>
    );
  }

  return (
    <>
      <Layout />
      <div style={{ margin: "16px" }}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              User Details
            </Typography>
            <Typography>
              <strong>ID:</strong> {user.id}
            </Typography>
            <Typography>
              <strong>Username:</strong> {user.username}
            </Typography>
            <Typography>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography>
              <strong>Role:</strong> {user.role}
            </Typography>
            <>
              <Button
                onClick={handleNavigateBack}
                startIcon={<ArrowBackIcon />}
                variant="outlined"
              >
                Back
              </Button>
            </>
            <Link to={`/user/${user.id}/edit`}>
              {user.role === "admin" && (
                <Button startIcon={<CreateIcon />} variant="outlined">
                  Edit User
                </Button>
              )}
            </Link>
            {user.role === "admin" && (
              <Button
                startIcon={<DeleteIcon />}
                variant="outlined"
                onClick={handleDeleteUser}
              >
                Delete User
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default UserDetails;
