import axios from "axios";
import {
  TextField,
  Button,
  Container,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function FormChangeProfile() {
  const { actualizaUser, user } = useUser();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      userName: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es requerido"),
      lastName: Yup.string().required("El apellido es requerido"),
      userName: Yup.string().required("El nombre de usuario es requerido"),
      phoneNumber: Yup.string()
        .required("El número de teléfono es requerido")
        .matches(/^\d+$/, "El número de teléfono debe contener solo números"),
      password: Yup.string()
        .required("La contraseña es requerida")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      try {
        const response = await axios.post(`https://localhost:7113/api/Person`, {
          name: values.name,
          lastName: values.lastName,
          userName: values.userName,
          phoneNumber: values.phoneNumber,
          password: values.password,
        });

        if (user) {
          actualizaUser([...user, response.data]);
        } else {
          actualizaUser([response.data]);
        }

        // resetear el formulario
        resetForm();
        navigate("/");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          setErrorMessage("Error al actualizar el perfil.");
        } else {
          setErrorMessage("Ocurrió un error al intentar actualizar el perfil.");
        }
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseSnackbar = () => {
    setErrorMessage(null);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Ingresar Usuario
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("name")}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Apellido"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("lastName")}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Nombre de Usuario"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("userName")}
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          helperText={formik.touched.userName && formik.errors.userName}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Número de Teléfono"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("phoneNumber")}
          error={
            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
          }
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("password")}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="success"
          fullWidth
          sx={{ mb: 2 }}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </form>
      {errorMessage && (
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
}
