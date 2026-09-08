/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";

import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resendVerification, signup } from "../../features/auth/authSlice";
import { store } from "../../app/store";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector(
    (state:any) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [validationError, setValidationError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setValidationError("");
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
    }
  };


const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  const { name, email, phone, password } = formData;

  if (
    !name.trim() ||
    !email.trim() ||
    !phone.trim() ||
    !password.trim()
  ) {
    setValidationError("Please fill in all fields.");
    return;
  }

  try {
    const result = await dispatch(
      signup({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        image: image ? image.name : "",
        role: "user",
      })
    ).unwrap();

    console.log("SIGNUP RESULT:", result);

    console.log(
      "BEFORE RESEND:",
      store.getState().auth.verificationEmail
    );

    await dispatch(
      resendVerification(email.trim())
    ).unwrap();

    console.log(
      "BEFORE NAVIGATE:",
      store.getState().auth.verificationEmail
    );
    navigate("/verify");

  } catch (error) {
    console.log("Registration error:", error);
  }
};



  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f7fb",
        px: 2,
        py: 4,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 500,
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
          }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: "primary.main",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <PersonAddIcon fontSize="large" />
          </Box>

          <Typography>
            Create Account
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Register a new user account
          </Typography>
        </Box>

        {(validationError || error) && (
          <Box
            sx={{
              mb: 2,
              p: 1.5,
              borderRadius: 1,
              backgroundColor: "#ffebee",
              color: "error.main",
            }}
          >
            <Typography variant="body2">
              {validationError || error}
            </Typography>
          </Box>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Image Field */}
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: 600 }}
            >
              Profile Image
            </Typography>

            <Button
              component="label"
              variant="outlined"
              fullWidth
              sx={{
                py: 1.5,
                borderStyle: "dashed",
              }}
            >
              {image ? image.name : "Choose Profile Image"}

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>

            {image && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: "block",
                  mt: 1,
                }}
              >
                Selected: {image.name}
              </Typography>
            )}
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.4,
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            {loading ? (
              <CircularProgress
                size={24}
                color="inherit"
              />
            ) : (
              "Create Account"
            )}
          </Button>
        </Box>

        <Box
          sx={{
            textAlign: "center",
            mt: 3,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;