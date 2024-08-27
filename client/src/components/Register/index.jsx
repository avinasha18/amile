import React, { useState } from "react";
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
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Actions } from "../../hooks/actions";

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
  const [loading, setLoading] = useState(false); // Loading state
  const [errors, setErrors] = useState({}); // Error state for validations
  const [params] = useSearchParams();
  const refrelid = params.get("refrelid");
  const nav = useNavigate();
  const steps = ["Select Account Type", "Basic Information", "Additional Information"];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validate = () => {
    const newErrors = {};

    if (!accountType) newErrors.accountType = "Account type is required.";
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!email.endsWith("@gmail.com")) {
      newErrors.email = "Email must end with @gmail.com.";
    }
    if (!username) newErrors.username = "Username is required.";
    if (!name) newErrors.name = "Name is required.";
    if (!password) newErrors.password = "Password is required.";
    if (!termsAccepted) newErrors.termsAccepted = "You must accept the terms.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true); // Start loading
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
        console.log(response.data.message);
        nav("/login", { replace: true });
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const isFinalStep = activeStep === steps.length - 1;

  return (
    <ThemeProvider theme={darkTheme}>
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
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                  disabled={loading} // Disable button when loading
                >
                  {loading ? "Registering..." : "Signup"} {/* Change button text */}
                </Button>
              )}
            </Box>
          </Box>
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
        required
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
        required
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
        required
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
        required
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label={refrelid ? "Referral Code" : "You are not eligible for referral"}
        value={refrelid || ""}
        disabled
        required
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
  error
}) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="GitHub"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
        placeholder="Enter your GitHub (optional)"
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="LinkedIn"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
        placeholder="Enter your LinkedIn (optional)"
      />
    </Grid>
    <Grid item xs={12}>
      <FormControlLabel
        control={
          <Checkbox
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
          />
        }
        label="I agree to the terms and conditions"
      />
      {error && <Typography color="error">{error}</Typography>}
    </Grid>
  </Grid>
);



export default UserRegisterFlow;

