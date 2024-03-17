import { Slide, Snackbar } from "@mui/material";

// eslint-disable-next-line react/prop-types
const CustomAlert = ({ open, handleClose, type, message }) => {
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        autoHideDuration={5000}
        message={message}
        TransitionComponent={Slide}
        ContentProps={{
          sx: {
            background: type === "success" ? "green" : "red",
            color: "white",
          },
        }}
      />
    </>
  );
};

export default CustomAlert;
