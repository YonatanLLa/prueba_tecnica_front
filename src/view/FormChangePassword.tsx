import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Box,
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

export default function FormChangePassword() {
  const { userById, updateUser } = useUser();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(
        "La contraseña actual es requerida"
      ),
      newPassword: Yup.string()
        .required("La nueva contraseña es requerida")
        .min(6, "La nueva contraseña debe tener al menos 6 caracteres")
        .matches(
          /[A-Z]/,
          "La nueva contraseña debe contener al menos una letra mayúscula"
        )
        .matches(
          /[a-z]/,
          "La nueva contraseña debe contener al menos una letra minúscula"
        )
        .matches(
          /[0-9]/,
          "La nueva contraseña debe contener al menos un número"
        ),
      confirmPassword: Yup.string()
        .required("Confirmar la nueva contraseña es requerida")
        .oneOf([Yup.ref("newPassword")], "Las contraseñas deben coincidir"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        const response = await axios.put(
          `https://localhost:7113/api/Person/${userById?.id}/update-password`,
          {
            id: Number(userById?.id),
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          }
        );
        console.log(response, "response.data");

        updateUser(response.data);

        navigate("/");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          setErrorMessage("La contraseña actual es incorrecta.");
        } else {
          setErrorMessage(
            "Ocurrió un error al intentar cambiar la contraseña."
          );
        }
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleCloseSnackbar = () => {
    setErrorMessage(null);
  };

  const validationErrors = [
    {
      key: "length",
      message: "La contraseña debe tener al menos 8 caracteres",
    },
    { key: "lowercase", message: "Debe contener al menos una letra minúscula" },
    { key: "uppercase", message: "Debe contener al menos una letra mayúscula" },
    { key: "number", message: "Debe contener al menos un número" },
  ];

  const checkValidation = (key: string) => {
    switch (key) {
      case "length":
        return formik.values.newPassword.length >= 8;
      case "lowercase":
        return /[a-z]/.test(formik.values.newPassword);
      case "uppercase":
        return /[A-Z]/.test(formik.values.newPassword);
      case "number":
        return /\d/.test(formik.values.newPassword);

      default:
        return false;
    }
  };

  const handleClickShowPassword = (field: string) => {
    switch (field) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "calc(100vh - 60px)",
          }}
        >
          <div>
            <TextField
              label="Contraseña Actual"
              type={showCurrentPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              {...formik.getFieldProps("currentPassword")}
              error={
                formik.touched.currentPassword &&
                Boolean(formik.errors.currentPassword)
              }
              helperText={
                formik.touched.currentPassword && formik.errors.currentPassword
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleClickShowPassword("current")}
                      edge="end"
                    >
                      {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Nueva Contraseña"
              type={showNewPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              {...formik.getFieldProps("newPassword")}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleClickShowPassword("new")}
                      edge="end"
                    >
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            {formik.values.newPassword && (
              <Box>
                {validationErrors.map((validation) => (
                  <Box
                    key={validation.key}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        color: checkValidation(validation.key)
                          ? "green"
                          : "red",
                        mr: 1,
                      }}
                    >
                      {checkValidation(validation.key) ? "✅" : "❌"}
                    </Typography>
                    <Typography
                      sx={{
                        color: checkValidation(validation.key)
                          ? "black"
                          : "gray",
                      }}
                    >
                      {validation.message}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
            <TextField
              label="Confirmar Nueva Contraseña"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              {...formik.getFieldProps("confirmPassword")}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleClickShowPassword("confirm")}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
          </div>
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
      </Box>
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
