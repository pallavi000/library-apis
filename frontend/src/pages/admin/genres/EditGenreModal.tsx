import CustomModal from "../../../component/CustomModal";
import { Box, Button, Stack, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import LoadingButton from "../../../component/LoadingButton";

import React from "react";
import { fetchGenreById, updateGenre } from "../../../api/genre";
import { TGenreInputs } from "../../../@types/genre";

// yup validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required("name is required"),
});

type EditGenreModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  id: number;
};
function EditGenreModal({ isOpen, handleClose, id }: EditGenreModalProps) {
  const queryClient = useQueryClient();

  const {
    isLoading,
    isSuccess,
    data: genre,
  } = useQuery(["genre", id], () => fetchGenreById(id));

  // react hook form
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<TGenreInputs>({
    resolver: yupResolver(validationSchema),
  });

  React.useEffect(() => {
    if (isSuccess && genre) {
      setValue("name", genre.name);
    }
  }, [isSuccess, genre, setValue]);

  const mutation = useMutation((data: TGenreInputs) => updateGenre(id, data), {
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
      title="Edit User"
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
                defaultValue={isSuccess && genre ? genre.name : ""}
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

export default EditGenreModal;
