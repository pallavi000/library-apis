import { Box, Button, Stack, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useMutation, useQueryClient } from "react-query";

//component
import LoadingButton from "../../../component/LoadingButton";
import CustomModal from "../../../component/CustomModal";

//types
import { TAuthorInputs } from "../../../@types/author";

//api
import { addNewAuthor } from "../../../api/author";

// yup validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  image: yup.string().required("image is required"),
  bio: yup.string().required("bio is required"),
});

type AddAuthorModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};
function AddAuthorModal({ isOpen, handleClose }: AddAuthorModalProps) {
  const queryClient = useQueryClient();

  // react hook form
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TAuthorInputs>({
    resolver: yupResolver(validationSchema),
  });

  const mutation = useMutation((data: TAuthorInputs) => addNewAuthor(data), {
    onSuccess: (data) => {
      handleClose();
      // new user has been added | this runs the fetch api again.
      queryClient.invalidateQueries(["authors"]);
    },
  });

  // form submit handler
  const onSubmit: SubmitHandler<TAuthorInputs> = async (data) => {
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
                label="Author Name"
                variant="outlined"
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Author Image"
                variant="outlined"
                error={Boolean(errors.image)}
                helperText={errors.image?.message}
              />
            )}
          />
          <Controller
            name="bio"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Author Bio"
                variant="outlined"
                error={Boolean(errors.bio)}
                helperText={errors.bio?.message}
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

export default AddAuthorModal;
