import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Typography,
  Alert,
} from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Actions } from "../../hooks/actions";
import { useSelector } from "react-redux";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#007bff",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#f5f5f5",
      paper: "#fff",
    },
    text: {
      primary: "#000",
      secondary: "#555",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            color: "#b0b0b0",
          },
          "& .MuiInputBase-input": {
            color: "#ffffff",
          },
          "& .MuiInputBase-root:before": {
            borderBottom: "1px solid #b0b0b0",
          },
          "& .MuiInputBase-root:after": {
            borderBottom: "2px solid #90caf9",
          },
        },
      },
    },
  },
});

const UserRegisterFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [accountType, setAccountType] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [params] = useSearchParams();
  const refrelid = params.get("refrelid");
  const nav = useNavigate();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [alert,setAlert] = useState({})

  const theme = isDarkMode ? darkTheme : lightTheme;

  const steps = [
    "Select Account Type",
    "Basic Information",
    "Additional Information",
  ];

  const handleNext = () => {
    if (activeStep === 0) {
      // Validate account type selection
      if (!accountType) {
        setAlert({visible: true,message:"Please select an account type."});

        return;
      }
    } else if (activeStep === 1) {
      if (!email || !username || !name || !password) {
        setAlert({visible: true,message:"Please fill in all required fields"});
        return;
      }
    } else if (activeStep === 2) {
      if ( !termsAccepted) {
        setAlert({visible: true,message:"Please fill in all required fields and accept the terms."});
        return;
      }
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ visible: false, message: "" });
    }, 3000);

    return () => clearTimeout(timer);
  }, [alert.visible])

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const response = await Actions.Register({
        email,
        username,
        name,
        password,
        github,
        linkedin,
        accountType,
        refrelid,
      });

      if (response.data.success) {
        setAlert({ visible: false, message:response.data.message  });

        nav("/login", { replace: true });
      } else {
        setAlert({ visible: false, message:response.data.message  });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isFinalStep = activeStep === steps.length - 1;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 600,
            padding: 4,
            backgroundColor: "background.paper",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Box>
            <Typography variant="h4" align="center" gutterBottom>
              AMILE SIGNUP
            </Typography>
          </Box>

          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mt: 4 }}>
            {activeStep === 0 && (
              <StepSelector
                accountType={accountType}
                handleAccountTypeChange={setAccountType}
                error={errors.accountType}
              />
            )}
            {activeStep === 1 && (
              <BasicInfoStep
                email={email}
                setEmail={setEmail}
                username={username}
                setUsername={setUsername}
                name={name}
                setName={setName}
                password={password}
                setPassword={setPassword}
                refrelid={refrelid}
                errors={errors}
              />
            )}
            {activeStep === 2 && (
              <AdditionalInfoStep
                github={github}
                setGithub={setGithub}
                linkedin={linkedin}
                setLinkedin={setLinkedin}
                termsAccepted={termsAccepted}
                setTermsAccepted={setTermsAccepted}
                error={errors.termsAccepted}
              />
            )}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button
                disabled={activeStep === 0 || loading}
                onClick={handleBack}
                variant="contained"
                color="secondary"
              >
                Back
              </Button>
              {!isFinalStep ? (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Signup"}
                </Button>
              )}
            </Box>
          </Box>
       { alert?.visible && <Alert severity="error" sx={{margin:"10px"}}>{alert.message}</Alert>}
          <Link to={"/login"} style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
            Already Have An Account? Login!
          </Link>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const StepSelector = ({ handleAccountTypeChange, accountType, error }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
    }}
  >
    <Typography variant="h6" sx={{ mb: 2 }}>
      Select Account Type
    </Typography>
    <Button
      variant={accountType === "Student" ? "contained" : "outlined"}
      color="primary"
      sx={{
        width: "100%",
        maxWidth: 300,
        height: 60,
        fontSize: "1rem",
        borderRadius: 2,
        textTransform: "none",
      }}
      onClick={() => handleAccountTypeChange("Student")}
    >
      Student
    </Button>
    <Button
      variant={accountType === "Mentor" ? "contained" : "outlined"}
      color="primary"
      sx={{
        width: "100%",
        maxWidth: 300,
        height: 60,
        fontSize: "1rem",
        borderRadius: 2,
        textTransform: "none",
      }}
      onClick={() => handleAccountTypeChange("Mentor")}
    >
      Mentor
    </Button>
    {error && <Typography color="error">{error}</Typography>}
  </Box>
);

const BasicInfoStep = ({
  email,
  setEmail,
  username,
  setUsername,
  name,
  setName,
  password,
  setPassword,
  refrelid,
  errors,
}) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={!!errors.username}
        helperText={errors.username}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Refrel Id"
        type={refrelid?"password":"text"}
        value={refrelid || "You are Not Eligible"}
        required
        disabled
      />
    </Grid>

  </Grid>
);

const AdditionalInfoStep = ({
  github,
  setGithub,
  linkedin,
  setLinkedin,
  termsAccepted,
  setTermsAccepted,
  error,
}) => (
  <Box>
    <TextField
      fullWidth
      label="Github URL"
      value={github}
      onChange={(e) => setGithub(e.target.value)}
      sx={{ mb: 2 }}
    />
    <TextField
      fullWidth
      label="LinkedIn URL"
      value={linkedin}
      onChange={(e) => setLinkedin(e.target.value)}
      sx={{ mb: 2 }}
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
        />
      }
      label="I accept the terms and conditions"
    />
  </Box>
);

export default UserRegisterFlow;
