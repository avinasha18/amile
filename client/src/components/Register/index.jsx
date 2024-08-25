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
  const [params] = useSearchParams();
  const refrelid = params.get("refrelid");
  const nav = useNavigate()
  const steps = [
    "Select Account Type",
    "Basic Information",
    "Additional Information",
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

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
        refrelid
      });

      if (response.data.success) {
        console.log(response.data.message);
        nav("/login",{replace: true})
      }else{
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
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
              />
            )}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Button
                disabled={activeStep === 0}
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
                >
                  Signup
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const StepSelector = ({ handleAccountTypeChange, accountType }) => (
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
}) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
}) => (
  <Grid container spacing={2}>
    {["github", "linkedin"].map((field) => (
      <Grid item xs={12} key={field}>
        <TextField
          fullWidth
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          value={field === "github" ? github : linkedin}
          onChange={(e) =>
            field === "github"
              ? setGithub(e.target.value)
              : setLinkedin(e.target.value)
          }
          placeholder={`Enter your ${field} (optional)`}
        />
      </Grid>
    ))}
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
    </Grid>
  </Grid>
);

export default UserRegisterFlow;
