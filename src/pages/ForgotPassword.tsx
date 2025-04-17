
import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import FormWrapper from "../Common/FormWrapper";
import signInImage from "../assets/buisness.png";
import styles from "../Common/Global.module.css";
import Globalbutton from "../Common/Globalbutton";
import CommonAlertDialog from "../Common/CommonAlertDialog";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClose = () => setDialogOpen(false);
  const handleAgree = () => {
    setDialogOpen(true);
  };

  const handleforgotpassowrd = () => {
    const storedData = JSON.parse(localStorage.getItem("userData") || "{}");
    if (storedData?.email !== email) {
      setError("Invalid email");
    } else {
      setDialogOpen(true)
      setError("");
      const mockOTP = "123456";
      localStorage.setItem("otp", mockOTP);
      setTimeout(() => {
        navigate("/otp");
      }, 4000);
    }
  };

  return (
    <FormWrapper imageSrc={signInImage}>
      <Box style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography variant="h5" className={styles.mainheadertext}>
          Forgot Your Password?
        </Typography>
        <Typography variant="body2" className={styles.subheadertext}>
          Don’t worry! Enter your email address, and we’ll send you a link to
          reset it.
        </Typography>
        <form style={{ width: "100%" }}>
          <Box>
            <h1 className={styles.inputheadertext}>Email Address</h1>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="email address"
              value={email}
              className={styles.inputdesing}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
              error={!!error}
            />
            {error && <p className={styles.error}>{error}</p>}
          </Box>
          <br />
          <Globalbutton fullWidth onClick={handleforgotpassowrd}>
            Submit
          </Globalbutton>
        </form>
      </Box>
      <CommonAlertDialog
        open={dialogOpen}
        onClose={handleClose}
        onAgree={handleAgree}
        title="Link Sent Successfully!"
        description1="Check your inbox! We’ve sent you an email with instructions to"
        description2="reset your password."
      />
    </FormWrapper>
  );
};

export default ForgotPassword;
