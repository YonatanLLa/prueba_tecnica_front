import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import DarkMode from "./DarkMode";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useUser } from "../context/UserContext";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
export default function NavBar() {
  const { userById } = useUser();
  const theme = useTheme();
  const location = useLocation();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", height: "60px" }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
          // boxShadow: "none",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack direction="row" spacing={2}>
            {location.pathname !== "/" ? (
              <Link
                to={
                  location.pathname === "/user/" || userById?.id === undefined
                    ? "/"
                    : ["/name", "/username", "/password"].includes(
                        location.pathname
                      )
                    ? `/user/${userById?.id ?? ""}`
                    : "/"
                }
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ArrowBackIcon />
              </Link>
            ) : (
              <Link
                to="/addUser"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <AddCircleOutlineIcon />
              </Link>
            )}
          </Stack>
          <div>
            {location.pathname !== "/" && location.pathname !== "/addUser" ? (
              <Typography variant="h6" component="div" sx={{}}>
                Profile Setting
              </Typography>
            ) : (
              ""
            )}
          </div>
          <DarkMode />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
