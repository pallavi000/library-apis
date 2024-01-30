import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { RegisterInputs } from "../@types/user";
import { useGlobalContext } from "../context/GlobalContext";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../api/auth";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useMutation } from "react-query";
import LoadingButton from "../component/LoadingButton";

// yup validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

function SignUp() {
  // react hook form with yup validation
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: yupResolver(validationSchema),
  });
  const { setToken } = useGlobalContext();

  const mutation = useMutation((data: RegisterInputs) => registerApi(data), {
    onSuccess: (data) => {
      setToken(data.token);
      window.location.href = "/";
    },
  });

  // form submit handler
  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    mutation.mutate(data);
  };

  return (
    <Container maxWidth="sm">
      <Card
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        variant="outlined"
        sx={{ padding: "3rem", marginY: "3rem", textAlign: "center" }}
      >
        <Typography variant="h4" marginBottom={"3rem"}>
          Sign Up
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Enter Your Name"
                variant="outlined"
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Enter Email"
                variant="outlined"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                type="password"
                {...field}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            )}
          />
          <LoadingButton
            title="Sign In"
            isLoading={mutation.isLoading}
            color="primary"
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Link to={"/sign-in"}>
            <Typography variant="body2" marginTop={"1rem"}>
              I ALREADY HAVE AN ACCOUNT !
            </Typography>
          </Link>
        </Box>
      </Card>
    </Container>
  );
}

export default SignUp;
