import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa"; // Importing React Icons
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../services/redux/AuthSlice";
import Cookies from "js-cookie";
import { Actions } from "../../hooks/actions";

const useStyles = styled((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme.palette.background.default,
    position: "relative",
    overflow: "hidden",
  },
  paper: {
    padding: theme.spacing(4),
    maxWidth: 400,
    width: "100%",
    textAlign: "center",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    borderRadius: "15px",
    boxShadow: theme.shadows[10],
    zIndex: 1,
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2, 0),
    },
  },
  button: {
    marginTop: theme.spacing(2),
    fontWeight: "bold",
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1.5),
    "&:hover": {
      background: theme.palette.primary.dark,
    },
  },
}));

const Login = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: isDarkMode ? "#bb86fc" : "#6200ee",
      },
      background: {
        default: isDarkMode ? "#121212" : "#f5f5f5",
        paper: isDarkMode ? "#1d1d1d" : "#ffffff",
      },
      text: {
        primary: isDarkMode ? "#ffffff" : "#000000",
      },
    },
  });
  const classes = useStyles(theme);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student"); // Initial value set to "student"
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [params] = useSearchParams();

  const validateForm = () => {
    let isValid = true;
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required.");
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
        userType, // Include the selected userType in the request
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

        const isnext = params.get("nextpath");

        if (isnext) {
          nav(isnext, { replace: true });
        } else {
          console.log(userType)
          if(userType === "mentor") {
            nav("/mentor/", { replace: true });
          } else {
            nav("/", { replace: true });
          }
        }

        toast.success("Login successful");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={`bg-${isDarkMode ? 'gray-900' : 'gray-50'} font-[sans-serif] min-h-screen flex flex-col items-center justify-center py-6 px-4`}>
        <div className="max-w-md w-full">
         
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Sign in
            </h2>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  User name
                </label>
                <div className="relative flex items-center">
                  <input
                    name="username"
                    type="text"
                    required
                    className={`w-full text-${isDarkMode ? 'black' : 'gray-800'} text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600`}
                    placeholder="Enter user name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FaUser className="w-4 h-4 absolute right-4 text-gray-400" />
                </div>
              </div>

              <div>
                <label className={`text-${isDarkMode ? 'white' : 'gray-800'} text-sm mb-2 block`}>
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className={`w-full text-${isDarkMode ? 'black' : 'gray'} text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600`}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-gray-400"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label
                    htmlFor="remember-me"
                    className={`ml-3 block text-sm text-${isDarkMode ? 'white' : 'gray-800'}`}
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="/forgotpassword"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Sign in
                </button>
              </div>
              <p className={`text-${isDarkMode ? 'white' : 'gray-800'} text-sm !mt-8 text-center`}>
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>
        <ToastContainer position="bottom-center" autoClose={5000} />
      </div>
    </ThemeProvider>
  );
};

export default Login;
