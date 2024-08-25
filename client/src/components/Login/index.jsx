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
  FormControlLabel as MuiFormControlLabel,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Cookies from "js-cookie"; // Import js-cookie
import { Actions } from "../../hooks/actions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../services/redux/AuthSlice";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  paper: {
    padding: theme.spacing(4),
    maxWidth: 400,
    width: "100%",
    textAlign: "center",
    backgroundColor: "#000",
    color: "white",
    borderColor: "white",
    borderWidth: "2px",
    borderRadius: "25px",
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2, 0),
      backgroundColor: "white",
      borderRadius: theme.shape.borderRadius,
    },
  },
  button: {
    marginTop: theme.spacing(2),
    fontWeight: "bold",
    background: "linear-gradient(to right, #ffdd00, #ff6b6b, #9b51e0)",
    color: "white",
    padding: theme.spacing(1.5),
    "&:hover": {
      background: "linear-gradient(to right, #ffdd00, #ff6b6b, #9b51e0)",
    },
  },
  radioLabel: {
    color: "#fff",
  },
  inputLabel: {
    color: "#fff",
  },
  checkboxLabel: {
    color: "#fff",
    marginLeft: theme.spacing(1),
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");
  const [rememberMe, setRememberMe] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const nav = useNavigate();
  const dispath = useDispatch();
  const [params] = useSearchParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setSnackbarMessage("Please fill in all fields.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
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

        dispath(
          loginSuccess({
            token: response.data.token,
            user: response.data.user,
            cookieExpires,
          })
        );

        const isnext = params.get("nextpath");

        if (isnext) {
          nav(isnext, { replace: true });
        } else {
          nav("/", { replace: true });
        }

        setSnackbarMessage("Login successful");
        setSnackbarSeverity("success");
      } else {
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

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            label="Email or Username"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={classes.inputLabel}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.inputLabel}
          />
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
          <MuiFormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={handleRememberMeChange}
                color="success"
                sx={{
                  color: "#fff",
                  "&.Mui-checked": {
                    color: "white",
                  },
                  ".MuiCheckbox-root": {
                    color: "white",
                  },
                }}
              />
            }
            label={
              <Typography className={classes.checkboxLabel}>
                Remember Me
              </Typography>
            }
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className={classes.button}
          >
            Login
          </Button>
        </form>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
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
