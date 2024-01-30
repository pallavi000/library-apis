import CustomModal from "../../../component/CustomModal";
import { Box, Button, Stack, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useMutation, useQueryClient } from "react-query";
import LoadingButton from "../../../component/LoadingButton";
import { TGenreInputs } from "../../../@types/genre";
import { addNewGenre } from "../../../api/genre";

// yup validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required("name is required"),
});

type AddGenreModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};
function AddGenreModal({ isOpen, handleClose }: AddGenreModalProps) {
  const queryClient = useQueryClient();

  // react hook form
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TGenreInputs>({
    resolver: yupResolver(validationSchema),
  });

  const mutation = useMutation((data: TGenreInputs) => addNewGenre(data), {
    onSuccess: (data) => {
      handleClose();
      // new user has been added | this runs the fetch api again.
      queryClient.invalidateQueries(["genres"]);
    },
  });

  // form submit handler
  const onSubmit: SubmitHandler<TGenreInputs> = async (data) => {
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
                label="Genre Name"
                variant="outlined"
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
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

export default AddGenreModal;
