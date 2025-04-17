import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import email from "../assets/email.png";
import styles from "./Global.module.css";

interface CommonAlertDialogProps {
  open: boolean;
  onClose: () => void;
  onAgree?: () => void;
  title: string;
  description1: string;
  description2: string;
  agreeText?: string;
  disagreeText?: string;
}

const CommonAlertDialog: React.FC<CommonAlertDialogProps> = ({
  open,
  onClose,
  title,
  description1,
  description2,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          background: "#1F2129",
          alignItems: "center",
          width: "500px",
          padding: "20px",
        }}
      >
        <img src={email} style={{ width: "100px", height: "100px" }} />
        <DialogTitle
          id="alert-dialog-title"
          className={styles.successmodaltext}
        >
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className={styles.modalsubheader}
          >
            {description1}
          </DialogContentText>
          <DialogContentText
            id="alert-dialog-description"
            className={styles.modalsubheader}
          >
            {description2}
          </DialogContentText>
        </DialogContent>

        <DialogActions style={{ width: "78%" }}>
          <Button onClick={onClose} className={styles.modalbutton}>
            okay
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CommonAlertDialog;
