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

export default function FormUserName() {
  const { userById, updateUser } = useUser();

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: userById?.userName || "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        const response = await axios.put(
          `https://localhost:7113/api/Person/${userById?.id}/update-username`,
          {
            id: Number(userById?.id),
            userName: values.userName,
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

  const handleClearName = () => {
    formik.setFieldValue("userName", "");
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
              label="userName"
              variant="outlined"
              fullWidth
              margin="normal"
              {...formik.getFieldProps("userName")}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {formik.values.userName && (
                      <IconButton onClick={handleClearName} edge="end">
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
