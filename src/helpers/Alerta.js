import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

export const Alerta = ({ open, handleClose, message, emoji }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent className="alertaContainer">
        <span className="emoji">{emoji}</span>
        {message}
      </DialogContent>
    </Dialog>
  );
};
