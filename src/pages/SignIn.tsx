import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import hidden from "../assets/hidden.png";
import visible from "../assets/visible.png";
import GoogleIcon from "../assets/google.png";
import MicrosoftIcon from "../assets/microsoft.png";
import FormWrapper from "../Common/FormWrapper";
import signInImage from "../assets/buisness.png";
import Globalbutton from "../Common/Globalbutton";
import CheckIcon from "@mui/icons-material/Check";
import styles from "../Common/Global.module.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { googleLogin } from "../utils/firebase";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [passhidden, setpassHidden] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
  };

  const navigateToForgot = () => {
    navigate("/forgotpassword");
  };

  const naviagteTo = () => {
    navigate("/signup");
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Sign in successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      toast.error("Google login error");
    }
  };

  const passwordImage = () => {
    setpassHidden(!passhidden);
    console.log("iidi");
  };

  const handleSignin = async () => {
    const storedData = localStorage.getItem("userData");
    if (!storedData) {
      toast.error("Invalid email or password");
      return;
    }
    const userData = JSON.parse(storedData);
    if (
      formData.email === userData.email &&
      formData.password === userData.password
    ) {
      toast.success("Login successful");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <FormWrapper imageSrc={signInImage}>
      <Typography variant="h5" className={styles.mainheadertext}>
        Sign In
      </Typography>
      <Typography variant="h5" mb={2} className={styles.subheadertext}>
        Manage your workspace seamlessly. Sign in to continue
      </Typography>
      <Box>
        <span className={styles.inputheadertext}>Email Address</span>
        <TextField
          placeholder="Email Address"
          name="email"
          fullWidth
          className={styles.inputdesing}
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <span className={styles.inputheadertext}>Password</span>
        <TextField
          placeholder="Password"
          name="password"
          className={styles.inputdesing}
          fullWidth
          margin="normal"
          type={passhidden ? "password" : "text"}
          value={formData.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={passwordImage} edge="end">
                  <img
                    src={passhidden ? hidden : visible}
                    className={styles.image}
                    alt="toggle visibility"
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControlLabel
          control={
            <Box onClick={handleToggle} className={styles.checkboxcontrol}>
              {checked && <CheckIcon sx={{ fontSize: 16, color: "#1976d2" }} />}
            </Box>
          }
          label={<Typography color="white">Remember me</Typography>}
          sx={{ margin: 2, display: "flex", gap: "8px", alignItems: "center" }}
        />
        <Typography
          variant="body2"
          sx={{ cursor: "pointer", color: "#aaa" }}
          onClick={navigateToForgot}
        >
          Forgot Password?
        </Typography>
      </Box>
      <Globalbutton fullWidth onClick={handleSignin}>
        Sign In
      </Globalbutton>
      <Divider sx={{ my: 2, color: "gray" }}>or</Divider>
      <Button
        fullWidth
        sx={{ mb: 3 }}
        className={styles.socialbutton}
        onClick={handleGoogleLogin}
      >
        <img src={GoogleIcon} />{" "}
        <span className={styles.social}>Sign in with Google</span>
      </Button>
      <Button fullWidth className={styles.socialbutton}>
        <img src={MicrosoftIcon} />{" "}
        <span className={styles.social}>Sign in with Microsoft</span>
      </Button>
      <Typography
        variant="body2"
        mt={2}
        align="center"
        className={styles.subheadertext}
      >
        Don’t have an account?{" "}
        <span
          style={{ color: "#a020f0", cursor: "pointer" }}
          onClick={naviagteTo}
        >
          Sign Up
        </span>
      </Typography>
      <ToastContainer />
    </FormWrapper>
  );
};

export default SignIn;
