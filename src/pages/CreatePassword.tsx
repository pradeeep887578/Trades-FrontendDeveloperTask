import React, { useState } from "react";
import { Box, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import FormWrapper from "../Common/FormWrapper";
import signInImage from "../assets/buisness.png";
import styles from "../Common/Global.module.css";
import Globalbutton from "../Common/Globalbutton";
import CommonAlertDialog from "../Common/CommonAlertDialog";
import { useNavigate } from "react-router-dom";
import hidden from "../assets/hidden.png";
import visible from "../assets/visible.png";


const passwordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New Password is required"),
});

const CreatePassword: React.FC = () => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passhidden, setpassHidden] = useState(true);
  const [confpasshidden, setconfpassHidden] = useState(true);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleClose = () => setDialogOpen(false);

  const handleAgree = () => {
    setDialogOpen(true);
  };

  const passwordImage = (type: string) => {
    if (type == "confirm") {
      setconfpassHidden(!confpasshidden);
    } else {
      setpassHidden(!passhidden);
    }
  };

  const handleSubmit = async () => {
    setErrors({});

    const storedUser = localStorage.getItem("userData");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    if (!parsedUser || parsedUser.password !== formData.oldPassword) {
      setErrors({ oldPassword: "Oops! Passwords Don’t Match" });
      return;
    }

    try {
      await passwordSchema.validate(
        {
          newPassword: formData.newPassword,
        },
        { abortEarly: false }
      );
      parsedUser.password = formData.newPassword;
      localStorage.setItem("userData", JSON.stringify(parsedUser));
      setDialogOpen(true);
      setTimeout(() => {
        navigate("/signin");
      }, 4000);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: any = {};
        err.inner.forEach((error) => {
          newErrors[error.path!] = error.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <FormWrapper imageSrc={signInImage}>
      <Box style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography variant="h5" className={styles.mainheadertext}>
          Create New Password
        </Typography>
        <Typography variant="body2" className={styles.subheadertext}>
          Choose a strong and secure password to keep your account safe. <br />
          <span>
            Make sure it’s easy for you to remember, but hard for others to
            guess!
          </span>
        </Typography>
        <Box>
          <h1 className={styles.inputheadertext}>Password</h1>
          <TextField
            name="oldPassword"
            onChange={handleChange}
            placeholder="password"
            type={passhidden ? "password" : "text"}
            className={styles.inputdesing}
            fullWidth
            margin="normal"
            value={formData.oldPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => passwordImage("password")} edge="end">
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
        <Box>
          <h1 className={styles.inputheadertext}>Re-enter your new password</h1>
          <TextField
            name="newPassword"
            type={confpasshidden ? "password" : "text"}
            placeholder="new password"
            className={styles.inputdesing}
            fullWidth
            margin="normal"
            value={formData.newPassword}
            onChange={handleChange}
            error={!!errors.oldPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => passwordImage("confirm")} edge="end">
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
          {errors.oldPassword && (
            <p  className={styles.error}>{errors.oldPassword}</p>
          )}
        </Box>
        <Globalbutton fullWidth onClick={handleSubmit}>
          Update Password
        </Globalbutton>
        <CommonAlertDialog
          open={dialogOpen}
          onClose={handleClose}
          onAgree={handleAgree}
          title="Password Created!"
          description1="Your password has been successfully updated. You can now use"
          description2="your new password to log in."
        />
      </Box>
    </FormWrapper>
  );
};

export default CreatePassword;
