import { Box, Button, Stack, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useMutation, useQueryClient } from "react-query";

//types
import { RegisterInputs } from "../../../@types/user";

//api
import { registerApi } from "../../../api/auth";

//component
import LoadingButton from "../../../component/LoadingButton";
import CustomModal from "../../../component/CustomModal";

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

type AddUserModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};
function AddUserModal({ isOpen, handleClose }: AddUserModalProps) {
  const queryClient = useQueryClient();

  // react hook form
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: yupResolver(validationSchema),
  });

  const mutation = useMutation((data: RegisterInputs) => registerApi(data), {
    onSuccess: (data) => {
      handleClose();
      // new user has been added | this runs the fetch api again.
      queryClient.invalidateQueries(["users"]);
    },
  });

  // form submit handler
  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    mutation.mutate(data);
  };

  return (
    <CustomModal
      title="Add New User"
      isOpen={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      component={
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
        </Box>
      }
      buttonComponent={
        <Stack
          direction={"row"}
          alignItems={"center"}
          gap={1}
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <LoadingButton
            title="Sign In"
            isLoading={mutation.isLoading}
            color="primary"
          />
          <Button color="error" onClick={handleClose} variant="contained">
            Cancel
          </Button>
        </Stack>
      }
    />
  );
}

export default AddUserModal;
