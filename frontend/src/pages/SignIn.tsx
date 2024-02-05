import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";

//types
import { LoginInputs } from "../@types/user";

//api
import { loginApi } from "../api/auth";

//context
import { useGlobalContext } from "../context/GlobalContext";

//component
import LoadingButton from "../component/LoadingButton";

// yup validation schema
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

function SignIn() {
  // react hook form with yup validation
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(validationSchema),
  });
  const { setToken } = useGlobalContext();

  const mutation = useMutation((data: LoginInputs) => loginApi(data), {
    onSuccess: (data) => {
      setToken(data.token);
      if (data?.user?.isAdmin) {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/";
      }
    },
  });

  // form submit handler
  const onSubmit = async (data: LoginInputs) => {
    mutation.mutate(data);
  };

  return (
    <Container maxWidth="sm">
      <Card
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        variant="outlined"
        autoComplete="off"
        sx={{ padding: "3rem", marginY: "3rem", textAlign: "center" }}
      >
        <Typography variant="h4" marginBottom={"3rem"}>
          Sign In
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
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
          <Link to={"/sign-up"}>
            <Typography variant="body2" marginTop={"1rem"}>
              I DON'T HAVE AN ACCOUNT !
            </Typography>
          </Link>
        </Box>
      </Card>
    </Container>
  );
}

export default SignIn;
