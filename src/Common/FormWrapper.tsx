import React from "react";
import { Box } from "@mui/material";
import styles from "../Common/Global.module.css";
interface FormWrapperProps {
  children: React.ReactNode;
  imageSrc: string;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children, imageSrc }) => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "90%",
          height: "90%",
          justifyContent: "space-between",
          borderRadius: 3,
          position: "relative",
        }}
      >
        <Box className={styles.imagebox}>
          <img
            src={imageSrc}
            alt="auth side"
            style={{ width: "100%", height: "100%", borderRadius: "20px" }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "45%",
              paddingLeft: "50px",
              paddingBottom: "30px",
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.95), transparent)",
              color: "#fff",
              boxSizing: "border-box",
            }}
          >
            <h2 className={styles.welcometext}>Welcome to WORKHIVE!</h2>
            <p className={styles.welcomesubheading}>
              . Employee Management: View detailed profiles, track performance,
              and manage attendance.
            </p>
            <p className={styles.welcomesubheading}>
              . Performance Insights: Analyze team goals, progress, and
              achievements.
            </p>
            <p className={styles.welcomesubheading}>
              . Attendance & Leaves: Track attendance patterns and manage leave
              requests effortlessly.
            </p>
          </Box>
        </Box>
        <Box className={styles.rightsidebox}>
          <Box>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FormWrapper;
