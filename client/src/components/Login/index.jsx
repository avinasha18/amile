import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Paper,
  Radio as MuiRadio,
  Snackbar,
  Checkbox,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Actions } from "../../hooks/actions";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../services/redux/AuthSlice";
import { setAuthToken } from "../../hooks/golbalAuth";
import { Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { keyframes } from "@emotion/react";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateX(-8px);
  }
  100% {
    transform: translateY(0);
  }
`;

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: props.isDarkMode ? "#000" : "#fff",
  }),
  paper: (props) => ({
    padding: theme.spacing(4),
    maxWidth: 400,
    width: "100%",
    textAlign: "center",
    backgroundColor: props.isDarkMode ? "#000" : "#fff",
    color: props.isDarkMode ? "#fff" : "#000",
    borderColor: props.isDarkMode ? "#fff" : "#000",
    borderWidth: "2px",
    borderRadius: "2px",
  }),
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2, 0),
      backgroundColor: (props) => (props.isDarkMode ? "#fff" : ""),
      borderRadius: theme.shape.borderRadius,
    },
  },
  button: {
    marginTop: theme.spacing(2),
    fontWeight: "bold",
    background: "linear-gradient(to right, #ffdd00, #ff6b6b, #9b51e0)",
    color: "#fff",
    padding: theme.spacing(1.5),
    "&:hover": {
      background: theme.palette.primary.dark,
    },
  },
  radioLabel: {
    color: (props) => (props.isDarkMode ? "#fff" : "#000"),
  },
  inputLabel: {
    color: (props) => (props.isDarkMode ? "#fff" : "#000"),
  },
  checkboxLabel: {
    color: (props) => (props.isDarkMode ? "#fff" : "#000"),
    marginLeft: theme.spacing(1),
  },
}));

const Login = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const classes = useStyles({ isDarkMode });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [params] = useSearchParams();

  const validateForm = () => {
    let isValid = true;
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await Actions.Login({
        username: email.trim(),
        password,
        userType,
      });

      if (response.data.success) {
        const cookieExpires = rememberMe ? 10 : 1;

        dispatch(
          loginSuccess({
            token: response.data.token,
            user: response.data.user,
            cookieExpires,
          })
        );
        setAuthToken(response.data.token);

        const isnext = params.get("nextpath");

        if (isnext) {
          nav(isnext, { replace: true });
        } else {
          nav("/", { replace: true });
        }
      } else {
        if (response.data.message === "verify your account") {
          nav("/resendverify", { replace: true });
          setSnackbarSeverity("error");
        } else {
          setSnackbarMessage(response.data.message || "Login failed");
          setSnackbarSeverity("error");
        }

        setSnackbarMessage(response.data.message || "Login failed");
        setSnackbarSeverity("error");
      }
    } catch (err) {
      setSnackbarMessage("An error occurred. Please try again.");
      setSnackbarSeverity("error");
      console.error(err);
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleBackClick = () => {
    nav(-1, { replace: true });
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <IconButton
            size="large"
            onClick={handleBackClick}
            sx={{
              "&:hover": {
                animation: `${bounce} 2s infinite`,
              },
            }}
          >
            <ArrowBackIcon color="secondary" />
          </IconButton>
          <Typography variant="h4">Login</Typography>
        </Box>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            label="Email or Username"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(emailError)}
            helperText={emailError}
            className={classes.inputLabel}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(passwordError)}
            helperText={passwordError}
            className={classes.inputLabel}
          />
          <Link to={"/forgotpassword"} color="primary">
            Forgot Password Reset it!
          </Link>
          <RadioGroup
            aria-label="user-type"
            name="user-type"
            value={userType}
            onChange={handleUserTypeChange}
            row
          >
            <FormControlLabel
              value="student"
              control={<MuiRadio color="primary" />}
              label="Student"
              className={classes.radioLabel}
            />
            <FormControlLabel
              value="mentor"
              control={<MuiRadio color="primary" />}
              label="Mentor"
              className={classes.radioLabel}
            />
          </RadioGroup>
          <Box sx={{ display: "flex" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  color="primary"
                />
              }
              label={
                <Typography className={classes.checkboxLabel}>
                  Remember me
                </Typography>
              }
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.button}
          >
            Login
          </Button>
        </form>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
