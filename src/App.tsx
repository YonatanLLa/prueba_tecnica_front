import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import User from "./view/User";
// import { Datos } from "./components/Datos";
import FormName from "./view/FormName";
import { useTheme } from "@mui/material/styles";
import Profile from "./view/Profile";
import FormChangePassword from "./view/FormChangePassword";
import FormUserName from "./view/FormUserName";
import FormChangeProfile from "./view/FromPost";

function App() {
  const theme = useTheme();
  return (
    <div
      style={{
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#e4f4fd",
      }}
    >
      <nav>
        <NavBar />
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/name" element={<FormName />} />
          <Route path="/username" element={<FormUserName />} />
          <Route path="/password" element={<FormChangePassword />} />
          <Route path="/addUser" element={<FormChangeProfile />} />
        </Routes>
        <div>{/* <Datos /> */}</div>
      </main>
    </div>
  );
}

export default App;
