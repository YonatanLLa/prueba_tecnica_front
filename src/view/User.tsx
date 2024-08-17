import { Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../context/UserContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  fontSize: "1rem",
  color: theme.palette.text.secondary,
  border: `.5px solid ${theme.palette.divider}`,
}));

export default function User() {
  const { userById, fetchUserById } = useUser();
  const { id } = useParams<{ id: string }>();

  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchUserById(Number(id));
    }
  }, [id, fetchUserById]);

  console.log(userById, "userById");

  const handleClick = () => {
    navigate(`/name`);
  };

  const handleClickUserName = () => {
    navigate(`/username`);
  };

  const handleClickPassword = () => {
    navigate(`/password`);
  };

  console.log(userById, "userById");

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        paddingTop: 5,
        paddingX: 2,
        height: "calc(100vh - 60px)",
        display: "flex",

        justifyContent: "center",
      }}
    >
      <Stack
        spacing={1}
        sx={{
          maxWidth: {
            width: "500px",
          },
        }}
      >
        <Box
          sx={{
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: theme.shadows[4],
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            },
          }}
          onClick={handleClick}
        >
          <Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Typography variant="subtitle1" textAlign={"start"}>
                  {userById?.name}
                </Typography>
                <Typography variant="subtitle1" textAlign={"start"}>
                  {userById?.lastName}
                </Typography>
              </div>
              <ArrowForwardIosIcon />
            </div>
          </Item>
        </Box>

        <Box
          sx={{
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: theme.shadows[4],
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            },
          }}
          onClick={handleClickUserName}
        >
          <Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Typography variant="subtitle1" textAlign={"start"}>
                  {userById?.userName === "" ? "-" : userById?.userName}
                </Typography>
              </div>
              <ArrowForwardIosIcon />
            </div>
          </Item>
        </Box>

        <Box
          sx={{
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: theme.shadows[4],
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            },
          }}
          onClick={handleClickPassword}
        >
          <Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Typography variant="subtitle1" textAlign={"start"}>
                  Change Password
                </Typography>
              </div>
              <ArrowForwardIosIcon />
            </div>
          </Item>
        </Box>
      </Stack>
    </Box>
  );
}
