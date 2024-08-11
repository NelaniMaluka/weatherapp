import * as React from "react";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import { Link } from "react-router-dom";
import { useAuth } from "../Security/AuthContext";

export default function BasicMenu() {
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;

  function handleLogout() {}

  return (
    <Dropdown>
      <MenuButton style={{ width: "130px", color: "white" }}>
        Dashboard
      </MenuButton>
      <Menu style={{ width: "120px", height: "max-content" }}>
        <MenuItem style={{ height: "max-content" }}>
          <Link to="/Dashboard">Profile</Link>
        </MenuItem>
        <MenuItem style={{ height: "max-content" }}>
          {" "}
          {!isAuthenticated && <Link to="/Login">Log In</Link>}
          {isAuthenticated && <Link onClick={handleLogout}>Log Out</Link>}
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
