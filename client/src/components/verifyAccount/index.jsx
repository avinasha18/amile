import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Actions } from "../../hooks/actions";
import { Snackbar, CircularProgress, Box } from "@mui/material";

export const VerifyAccount = () => {
  const [loading, setLoading] = useState(true);
  const [params] = useSearchParams();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const nav = useNavigate()

  const VerifyToken = async () => {
    const accountid = params.get("accountid");
    if (!accountid) return;

    setLoading(true);

    try {
      const response = await Actions.VerifyAccount({ accountid });

      if (response.data.success) {
        setSnackbarMessage(response.data.message || "Account verified successfully");
      } else {
        setSnackbarMessage(response.data.message || "Account verification failed");
      }
    } catch (error) {
      console.error("Verification failed:", error);
      setSnackbarMessage("An error occurred during verification");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    VerifyToken();
  }, [params]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    nav("/login", {replace:true})

  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor={"#000"}
      color={"#fff"}
    >
      {!loading ? <CircularProgress /> : <div>Verification in progress...</div>}

      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};
