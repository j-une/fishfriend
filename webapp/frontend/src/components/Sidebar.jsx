import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
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

const drawerWidth = 240;

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
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
      }}
    >
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
      >
        <Toolbar>
          <img width="200px" src={require("../logo.png")} />
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
      <Box
        component="main"
        sx={{
          width: "100%",
          flex: 1,
          p: 6,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
