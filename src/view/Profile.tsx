import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Divider,
  Button, // Importa Button para la eliminación
} from "@mui/material";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import { User } from "../interfaces/user";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

const Profile = () => {
  const { user, loading, error, deleteUser } = useUser();

  const theme = useTheme();

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(
        `https://localhost:7113/api/Person/${id}`
      );
      if (response.status === 204) {
        deleteUser(id); // Actualiza el estado del contexto después de eliminar
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="calc(100vh - 60px)"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="calc(100vh - 60px)"
      >
        <Alert severity="error">Error al cargar los datos: {error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      paddingTop={5}
      maxWidth="1200px"
      paddingX={2}
      margin="0 auto"
      minHeight="calc(100vh - 60px)"
    >
      <Typography variant="h4" gutterBottom>
        Perfil de Usuario
      </Typography>
      <Divider sx={{ width: "100%", mb: 3 }} />
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        justifyContent="center"
        width="100%"
      >
        {user && user.length > 0 ? (
          user.map((item: User) => (
            <Box
              key={item.id}
              flexBasis={{ xs: "100%", sm: "48%", md: "30%", lg: "22%" }}
              p={1}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#1A2027" : "#b4ff9a",
                }}
              >
                <Link
                  to={`/user/${item.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <CardContent>
                    <Box
                      display="flex"
                      alignItems="center"
                      flexDirection="column"
                    >
                      <Typography variant="h6" align="center" gutterBottom>
                        {item.name} {item.lastName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                      >
                        {item.userName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                      >
                        {item.phoneNumber}
                      </Typography>
                    </Box>
                  </CardContent>
                </Link>
                <Button
                  color="error"
                  sx={{ mt: 3 }}
                  onClick={() => handleDelete(item.id)}
                >
                  Eliminar
                </Button>
              </Card>
            </Box>
          ))
        ) : (
          <Typography variant="h6" align="center">
            No se encontraron usuarios.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
