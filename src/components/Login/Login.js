import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useAuth } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const { signup, login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleSignup(e) {
    e.preventDefault();
    console.log(inputs);

    try {
      setLoading(true);
      await signup(inputs.email, inputs.password);
      navigate("/dashboard");
    } catch {}

    setLoading(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    console.log(inputs);

    try {
      setLoading(true);
      await login(inputs.email, inputs.password);
      navigate("/dashboard");
    } catch {}

    setLoading(false);
  }

  const resetState = () => {
    setIsSignup(!isSignup);
    setInputs({ name: "", email: "", password: "" });
  };

  return (
    <div>
      <form onSubmit={isSignup ? handleSignup : handleLogin}>
        <Box
          display="flex"
          flexDirection="column"
          maxWidth={400}
          alignItems="center"
          justifyContent="center"
          margin="auto"
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              onChange={handleChange}
              value={inputs.name}
              name="name"
              margin="normal"
              type={"text"}
              variant="outlined"
              placeholder="Name"
            ></TextField>
          )}
          <TextField
            onChange={handleChange}
            value={inputs.email}
            name="email"
            margin="normal"
            type={"email"}
            variant="outlined"
            placeholder="Email"
          ></TextField>
          <TextField
            onChange={handleChange}
            value={inputs.password}
            name="password"
            margin="normal"
            type={"password"}
            variant="outlined"
            placeholder="Password"
          ></TextField>
          <Button
            disabled={loading}
            type="submit"
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            color="warning"
          >
            {isSignup ? "Signup" : "Login"}
          </Button>
          <Button onClick={resetState} sx={{ marginTop: 3, borderRadius: 3 }}>
            Change to {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
