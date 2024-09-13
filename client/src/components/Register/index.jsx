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
import { useSelector } from "react-redux";
import { Actions } from "../../hooks/actions";

const UserRegisterFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [accountType, setAccountType] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [searchParams] = useSearchParams();
  const refrelid = searchParams.get("refrelid");
  const navigate = useNavigate();
  const steps = ["Select Account Type", "Basic Information", "Additional Information", "Interests"];
  const categories = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Scientist', 'Data Analyst', 'VLSI Engineer'];
  const [selectedInterests, setSelectedInterests] = useState([]);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleNext = () => {
    if (validate()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validate = () => {
    const newErrors = {};

    if (activeStep === 0 && !accountType) {
      newErrors.accountType = "Account type is required.";
    }

    if (activeStep === 1) {
      // Email validation
      if (!email) {
        newErrors.email = "Email is required.";
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        newErrors.email = "Email must be a valid address.";
      }

      // Username validation: only lowercase letters, numbers, underscores, and hyphens allowed, no spaces
      if (!username) {
        newErrors.username = "Username is required.";
      } else if (!/^[a-z0-9_-]+$/.test(username)) {
        newErrors.username = "Username can only contain lowercase letters, numbers, underscores, and hyphens.";
      }

      // Name validation
      if (!name) {
        newErrors.name = "Name is required.";
      }

      // Password validation: 6-20 characters with at least one lowercase letter, one uppercase letter, one number, and one special character
      if (!password) {
        newErrors.password = "Password is required.";
      }
      //  else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/.test(password)) {
      //   newErrors.password = "Password must be 6-20 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.";
      // }

    }

    if (activeStep === 2 && !termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
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
        selectedInterests,
      });

      if (response.data.success) {
        console.log(response);
        navigate("/login", { replace: true });
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#dc004e",
      },
      background: {
        default: "#f5f5f5",
        paper: "#ffffff",
      },
      text: {
        primary: "#000000",
        secondary: "#555555",
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
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
          },
        },
      },
    },
  });

  const theme = isDarkMode ? darkTheme : lightTheme;

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
          <Typography variant="h4" align="center" gutterBottom>
            AMILE SIGNUP
          </Typography>
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
            {activeStep === 3 && (
              <InterestStep
                selectedInterests={selectedInterests}
                setSelectedInterests={setSelectedInterests}
                categories={categories}
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
        error={!!errors.password}
        helperText={errors.password}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Referral ID"
        value={refrelid}
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
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="GitHub Profile"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="LinkedIn Profile"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
      />
    </Grid>
    <Grid item xs={12}>
      <FormControlLabel
        control={
          <Checkbox
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            color="primary"
          />
        }
        label="I accept the terms and conditions"
      />
      {error && <Typography color="error">{error}</Typography>}
    </Grid>
  </Grid>
);

const InterestStep = ({
  selectedInterests,
  setSelectedInterests,
  categories,
}) => {

  // Function to handle selecting interest
  const handleSelectInterest = (interest) => {
  if (!selectedInterests.includes(interest)) {
    setSelectedInterests((prevSelectedInterests) => [...prevSelectedInterests, interest]);
  }
};

const handleRemoveInterest = (interest) => {
  setSelectedInterests((prevSelectedInterests) =>
    prevSelectedInterests.filter((i) => i !== interest)
  );
};

  return (
    <div className="p-4 flex flex-col gap-5">

      {/* Selected interests display */}
      <div>
        <h3 className="text-lg font-semibold mb-2">You're interested in:</h3>
        <div className="flex flex-wrap gap-2">
          {selectedInterests.length === 0 ? (
            <p className="text-sm">No interests selected yet.</p>
          ) : (
            selectedInterests.map((interest) => (
              <div
                key={interest}
                className="px-3 py-1 rounded-full bg-gray-300 text-sm flex items-center"
              >
                {interest}
                <button
                  onClick={() => handleRemoveInterest(interest)}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  ✖
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Interest selection categories */}
      <div>
        <h2 className="text-xl font-bold mb-4">Select your interests:</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleSelectInterest(category)}
              disabled={selectedInterests.includes(category)} // Disable the button if the category is selected
              className={`px-3 py-2 rounded-full text-white text-sm cursor-pointer ${
                selectedInterests.includes(category) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserRegisterFlow;
