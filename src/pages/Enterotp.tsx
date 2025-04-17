import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Grid } from "@mui/material";
import FormWrapper from "../Common/FormWrapper";
import signInImage from "../assets/buisness.png";
import styles from "../Common/Global.module.css";
import Globalbutton from "../Common/Globalbutton";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const EnterOtp: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [email, setEmail] = useState("");
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      setActiveIndex(index - 1);
    }
  };

  const handleSignin = () => {
    const enteredOtp = otp.join("");
    const storedOtp = localStorage.getItem("otp");

    if (enteredOtp === storedOtp) {
      toast.success("OTP Verified ✅");
      setTimeout(() => {
        navigate("/createpassword");
      }, 1000);
    } else {
      toast.error("Invalid OTP ❌");
    }
  };

  const handleResend = () => {
    setTimer(30);
    toast.success("OTP resent successfully!");
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setEmail(parsedData.email); 
    }
  }, []);

  return (
    <FormWrapper imageSrc={signInImage}>
      <Box style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <Typography variant="h5" className={styles.mainheadertext}>
          Enter OTP
        </Typography>
        <Typography variant="body2" className={styles.subheadertext}>
          Enter the OTP that has been sent to your email address <br />{" "}
          <span>{email}</span>
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          sx={{ mt: 1, mb: 3, cursor: "pointer" }}
        >
          Change Email Address
        </Typography>
        <Grid container spacing={1} justifyContent="space-between">
          {otp.map((value, idx) => (
            <Grid key={idx + "-" + activeIndex}>
              <TextField
                autoFocus={activeIndex === idx}
                value={value}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(e, idx)
                }
                placeholder="0"
                className={styles.otpinput}
              />
            </Grid>
          ))}
        </Grid>
        {timer > 0 ? (
        <p>{timer} sec</p>
      ) : (
        <Typography style ={{color:"blue",cursor:"pointer"}}onClick={handleResend}>Resend OTP</Typography>
      )}
        <Globalbutton fullWidth onClick={handleSignin}>
          Continue
        </Globalbutton>
      </Box>
      <ToastContainer />
    </FormWrapper>
  );
};

export default EnterOtp;
