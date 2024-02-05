import { useEffect } from "react";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useMutation, useQueryClient } from "react-query";

//componet
import LoadingButton from "../../../component/LoadingButton";
import CustomModal from "../../../component/CustomModal";

//type
import { TMemberInputs, TUser } from "../../../@types/user";

//api
import { addNewMemberShip } from "../../../api/member";

// yup validation schema
const validationSchema = yup.object().shape({
  user: yup.number().required("user id is required"),
  memberType: yup.string().required("member type is required"),
  isActive: yup.boolean().required("is active is required"),
});

type AddMemberProps = {
  users: TUser[];
  isOpen: boolean;
  handleClose: () => void;
};
function AddMember({ users, isOpen, handleClose }: AddMemberProps) {
  const queryClient = useQueryClient();
  // react hook form
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TMemberInputs>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setValue("isActive", false);
  }, []);

  const mutation = useMutation(
    (data: TMemberInputs) => addNewMemberShip(data),
    {
      onSuccess: (data) => {
        handleClose();
        // new user has been added | this runs the fetch api again.
        queryClient.invalidateQueries(["members"]);
        queryClient.invalidateQueries(["users", "inactive"]);
      },
    }
  );

  // form submit handler
  const onSubmit: SubmitHandler<TMemberInputs> = async (data) => {
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
            name="memberType"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Member Type"
                placeholder="Regular"
                variant="outlined"
                error={Boolean(errors.memberType)}
                helperText={errors.memberType?.message}
              />
            )}
          />
          <Controller
            name="user"
            control={control}
            render={({ field }) => (
              <FormControl error={Boolean(errors.user)}>
                <InputLabel>Select a User</InputLabel>
                <Select
                  {...field}
                  value={field.value ?? ""}
                  label="Select a User"
                  variant="outlined"
                  error={Boolean(errors.user)}
                >
                  {users.map((user: TUser) => {
                    return (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </MenuItem>
                    );
                  })}
                </Select>
                {errors.user?.message ? (
                  <FormHelperText>{errors.user?.message}</FormHelperText>
                ) : null}
              </FormControl>
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
            title="Submit"
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

export default AddMember;
