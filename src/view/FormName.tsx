import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import ClearIcon from "@mui/icons-material/Clear";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function FormName() {
  const { userById, updateUser } = useUser();

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: userById?.name || "",
      lastName: userById?.lastName || "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Nombre es requerido")
        .min(2, "Debe tener al menos 2 caracteres"),
      lastName: Yup.string()
        .required("Apellido es requerido")
        .min(2, "Debe tener al menos 2 caracteres"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        const response = await axios.put(
          `https://localhost:7113/api/Person/${userById?.id}/update-name-lastname`,
          {
            name: values.name,
            lastName: values.lastName,
          }
        );
        console.log(response, "response.data");

        updateUser(response.data);

        navigate(`/user/${userById?.id}`);
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    // Si `userById` cambia, actualiza el formulario
    formik.setValues({
      name: userById?.name || "",
      lastName: userById?.lastName || "",
    });
  }, [userById]);

  // useEffect(() => {
  //   formik.setValues({
  //     name: userById?.name || "",
  //     lastName: userById?.lastName || "",
  //   });
  // }, [user]);

  const handleClearLastName = () => {
    formik.setFieldValue("lastName", "");
  };

  const handleClearName = () => {
    formik.setFieldValue("name", "");
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
              label="Nombre"
              variant="outlined"
              fullWidth
              margin="normal"
              {...formik.getFieldProps("name")}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {formik.values.name && (
                      <IconButton onClick={handleClearName} edge="end">
                        <ClearIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {formik.values.lastName && (
                      <IconButton onClick={handleClearLastName} edge="end">
                        <ClearIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            {/* {formik.errors.api && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {formik.errors.api}
              </Alert>
            )} */}
          </div>
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            sx={{ mb: 2 }}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Saving..." : "Save"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}
