import * as React from "react";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";

export default function BasicMenu() {
  return (
    <Dropdown>
      <MenuButton style={{ width: "130px", color: "white" }}>
        Dashboard
      </MenuButton>
      <Menu style={{ width: "120px", height: "max-content" }}>
        <MenuItem style={{ height: "max-content" }}>Profile</MenuItem>
        <MenuItem style={{ height: "max-content" }}>Logout</MenuItem>
      </Menu>
    </Dropdown>
  );
}
