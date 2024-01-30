// UserContext.js
import React, { createContext, useReducer, useContext } from "react";

const UserContext = createContext();

const initialState = {
  users: [],
  isNewUserAdded: false,
  isUserDeleted: false,
  isEditSuccess: false,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
        isNewUserAdded: false,
        isUserDeleted: false,
        isEditSuccess: false,
      };
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
        isNewUserAdded: true,
      };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id
            ? { ...user, ...action.payload.updatedUser }
            : user
        ),
        isEditSuccess: true,
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload.id),
        isUserDeleted: true,
      };
    case "NEW_USER_ADDED":
      return { ...state, isNewUserAdded: true, isUserDeleted: false, isEditSuccess: false };
    case "DELETE_USER_SUCCESS":
      return { ...state, isUserDeleted: false, isNewUserAdded: false, isEditSuccess: false };
    case "EDIT_USER_SUCCESS":
      return { ...state, isEditSuccess: false, isNewUserAdded: false, isUserDeleted: false };
    case "RESET_EDIT_SUCCESS":
      return { ...state, isEditSuccess: false };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUserContext };
