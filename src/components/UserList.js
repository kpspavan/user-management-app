// UserList.js
import React, { useEffect, useState } from "react";
import { useUserContext } from "./context/UserContext";
import Layout from "./Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import UserPagination from "./Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "./Snackbar/Snackbar";

const UserList = () => {
  const { state, dispatch } = useUserContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [isSnackbarOpendeleted, setSnackbarOpendeleted] = useState(false);
  const [isSnackbarOpenEdit, setSnackbarOpenEdit] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarMessagedeleted, setsnackbarMessagedeleted] = useState("");
  const [snackbarMessageEdit, setSnackbarMessageEdit] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        dispatch({ type: "SET_USERS", payload: response.data });

        if (state.isNewUserAdded) {
          setSnackbarMessage("New user added! 😊");
          setSnackbarOpen(true);
          setSnackbarOpendeleted(false);
          setSnackbarOpenEdit(false);
          dispatch({ type: "NEW_USER_ADDED" });
        }

        if (state.isUserDeleted) {
          setsnackbarMessagedeleted("User deleted! 😊");
          setSnackbarOpendeleted(true);
          setSnackbarOpen(false);
          setSnackbarOpenEdit(false);
          dispatch({ type: "DELETE_USER_SUCCESS" });
        }

        if (
          state.isEditSuccess &&
          !state.isNewUserAdded &&
          !state.isUserDeleted
        ) {
          // Check if an existing user is edited
          setSnackbarMessageEdit("User edited successfully! 😊");
          setSnackbarOpenEdit(true);
          setSnackbarOpen(false);
          setSnackbarOpendeleted(false);
          dispatch({ type: "EDIT_USER_SUCCESS" });
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [
    dispatch,
    state.isNewUserAdded,
    state.isUserDeleted,
    state.isEditSuccess,
  ]);
  const totalUsers = state.users.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = state.users.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarOpendeleted(false);
    setSnackbarOpenEdit(false);
  };

  return (
    <>
      <Layout />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedUsers.map((user) => (
              <TableRow
                key={user.id}
                onClick={() => handleUserClick(user.id)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserPagination
        page={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <CustomSnackbar
        open={isSnackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity="success"
      />
      <CustomSnackbar
        open={isSnackbarOpendeleted}
        onClose={handleSnackbarClose}
        message={snackbarMessagedeleted}
        severity="warning"
      />
      <CustomSnackbar
        open={isSnackbarOpenEdit}
        onClose={handleSnackbarClose}
        message={snackbarMessageEdit}
        severity="info"
      />
    </>
  );
};

export default UserList;
