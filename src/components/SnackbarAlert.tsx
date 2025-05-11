import { Dispatch, SetStateAction } from "react";
//mui
import { Alert, Snackbar } from "@mui/material";

interface Props {
  message: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  severity: "success" | "error" | "info" | "warning";
}

function SnackbarAlert({ message, open, severity, setOpen }: Props) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarAlert;
