import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => (
  <Drawer variant="permanent" anchor="left">
    <List sx={{ width: 240 }}>
      <ListItem button component={Link} to="/admin/add">
        <ListItemText primary="Add Movie" />
      </ListItem>
      <ListItem button component={Link} to="/admin/edit">
        <ListItemText primary="Edit/Delete Movies" />
      </ListItem>
    </List>
  </Drawer>
);

export default Sidebar;
