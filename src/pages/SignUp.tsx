import React, { useState } from "react";
import { Box, Button, TextField, Typography, Divider } from "@mui/material";
import GoogleIcon from "../assets/google.png";
import MicrosoftIcon from "../assets/microsoft.png";
import FormWrapper from "../Common/FormWrapper";
import signInImage from "../assets/buisness.png";
import hidden from "../assets/hidden.png";
import visible from "../assets/visible.png";
import styles from "../Common/Global.module.css";
import Globalbutton from "../Common/Globalbutton";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { InputAdornment, IconButton } from "@mui/material";
import { googleLogin } from "../utils/firebase";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passhidden, setpassHidden] = useState(true);
  const [confpasshidden, setconfpassHidden] = useState(true);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    setErrors({});
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      handleSignin();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: any = {};
        err.inner.forEach((error: Yup.ValidationError) => {
          newErrors[error.path!] = error.message;
        });
        setErrors(newErrors);
      }
    }
  };


  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Sign up successfully", {
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
        navigate("/signin");
      }, 1000);
    } catch (err) {
      toast.error("Google login error");
    }
  };

  const passwordImage = (type: string) => {
    if (type == "confirm") {
      setconfpassHidden(!confpasshidden);
    } else {
      setpassHidden(!passhidden);
    }
  };

  const navigateto = () => {
    navigate("/signin");
  };

  const handleSignin = () => {
    toast.success("Sign up successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    localStorage.setItem("userData", JSON.stringify(formData));
    setTimeout(() => {
      navigate("/signin");
    }, 1000);
  };

  return (
    <FormWrapper imageSrc={signInImage}>
      <Typography variant="h5" className={styles.mainheadertext}>
        Sign Up
      </Typography>
      <Typography variant="body2" className={styles.subheadertext}>
        Manage your workspace seamlessly. Sign in to continue.
      </Typography>
      <form>
        <Box>
          <h1 className={styles.inputheadertext}>Email Address</h1>
          <TextField
            name="email"
            placeholder="email"
            fullWidth
            className={styles.inputdesing}
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </Box>
        <Box>
          <h1 className={styles.inputheadertext}>Password</h1>
          <TextField
            name="password"
            placeholder="password"
            type={passhidden ? "password" : "text"}
            fullWidth
            className={styles.inputdesing}
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => passwordImage("password")}
                    edge="end"
                  >
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

          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </Box>
        <Box>
          <h1 className={styles.inputheadertext}>Confirm Password</h1>
          <TextField
            name="confirmPassword"
            type={confpasshidden ? "password" : "text"}
            placeholder="confirmPassword"
            fullWidth
            className={styles.inputdesing}
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => passwordImage("confirm")}
                    edge="end"
                  >
                    <img
                      src={confpasshidden ? hidden : visible}
                      className={styles.image}
                      alt="toggle visibility"
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword}</p>
          )}
        </Box>
        <Globalbutton fullWidth onClick={handleSignUp}>
          Sign Up
        </Globalbutton>
      </form>
      <Divider sx={{ my: 2, color: "gray" }}>or</Divider>
      <Button fullWidth sx={{ mb: 3 }} className={styles.socialbutton} onClick={handleGoogleLogin}>
        <img src={GoogleIcon} />    <span className={styles.social}>Sign in with Google</span>
      </Button>
      <Button
        fullWidth
        className={styles.socialbutton}
      >
       <img src={MicrosoftIcon}/>  <span className={styles.social}>Sign in with Microsoft</span>
      </Button>
      <Typography
        variant="body2"
        mt={2}
        align="center"
        className={styles.subheadertext}
      >
        Already have an account?{" "}
        <span
          style={{ color: "#a020f0", cursor: "pointer" }}
          onClick={navigateto}
        >
          Sign In
        </span>
      </Typography>
      <ToastContainer />
    </FormWrapper>
  );
};

export default SignUp;
