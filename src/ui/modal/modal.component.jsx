import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

export default function AlertDialog({ open, handleClose, children }) {
  return (
    <div>
      <Dialog
        maxWidth="xl"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
}
