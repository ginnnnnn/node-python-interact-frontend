import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
}));

export default function SimpleSnackbar({ notes, open, setOpen }) {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setOpen(false, "");

      return;
    }
    setOpen(false, "");
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={open}
        autoHideDuration={2400}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{notes}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </div>
  );
}
