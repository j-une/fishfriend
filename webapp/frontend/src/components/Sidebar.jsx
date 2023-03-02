import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import RectangleOutlinedIcon from "@mui/icons-material/RectangleOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SettingsIcon from "@mui/icons-material/Settings";
import BuildIcon from "@mui/icons-material/Build";

const items = [
  {
    value: "Home",
    href: "/",
    icon: <HomeIcon />,
  },
  {
    value: "Your Tank",
    href: "/your-tank",
    icon: <RectangleOutlinedIcon />,
  },
  {
    value: "Learn",
    href: "/learn",
    icon: <MenuBookIcon />,
  },
  {
    value: "Settings",
    href: "/settings",
    icon: <SettingsIcon />,
  },
  {
    value: "Testing",
    href: "/testing",
    icon: <BuildIcon />,
  },
];

export default function Sidebar({ children }) {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        open
        sx={{
          display: "block",
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
      >
        <Toolbar>
          <img alt="" width="200px" src={require("../logo.png")} />
        </Toolbar>
        <Divider />
        <List>
          {items.map((item) => (
            <ListItem
              key={item.value}
              disablePadding
              component={Link}
              href={item.href}
            >
              <ListItemButton
                sx={{ color: "#0000008a" }}
                selected={item.href === window.location.pathname}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.value} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
