import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [userType, setUserType] = useState('student');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Login</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <RadioGroup
              aria-label="user-type"
              name="user-type"
              value={userType}
              onChange={handleUserTypeChange}
              row
            >
              <FormControlLabel
                value="student"
                control={<Radio />}
                label="Student"
              />
              <FormControlLabel
                value="mentor"
                control={<Radio />}
                label="Mentor"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Login;