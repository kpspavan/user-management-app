import React from "react";
import { Link } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Button from "../components/Button/Button";

const Layout = ({ children }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px",
      backgroundColor: "cadetblue",
    }}
  >
    User List
    <nav>
      <ul style={{ listStyle: "none", display: "flex", gap: "10px" }}>
        <li>
          <Link to="/create-user">
            <Button endIcon={<AddOutlinedIcon />} variant="contained">
              Create User
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Layout;
