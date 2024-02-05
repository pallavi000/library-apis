import CustomModal from "../../../component/CustomModal";
import { Box, Button, Stack, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import LoadingButton from "../../../component/LoadingButton";
import { TAuthorInputs } from "../../../@types/author";
import { fetchAuthorById, updateAuthor } from "../../../api/author";
import React from "react";

// yup validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  image: yup.string().required("image is required"),
  bio: yup.string().required("bio is required"),
});

type EditAuthorModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  id: number;
};
function EditAuthorModal({ isOpen, handleClose, id }: EditAuthorModalProps) {
  const queryClient = useQueryClient();

  const {
    isLoading,
    isSuccess,
    data: author,
  } = useQuery(["author", id], () => fetchAuthorById(id));

  console.log(author, "authorrr");

  // react hook form
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<TAuthorInputs>({
    resolver: yupResolver(validationSchema),
  });

  React.useEffect(() => {
    if (isSuccess && author) {
      setValue("name", author.name);
      setValue("image", author.image);
      setValue("bio", author.bio);
    }
  }, [isSuccess, author, setValue]);

  const mutation = useMutation(
    (data: TAuthorInputs) => updateAuthor(id, data),
    {
      onSuccess: (data) => {
        handleClose();
        // new user has been added | this runs the fetch api again.
        queryClient.invalidateQueries(["authors"]);
      },
    }
  );

  // form submit handler
  const onSubmit: SubmitHandler<TAuthorInputs> = async (data) => {
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
                label="Author Name"
                defaultValue={isSuccess && author ? author.name : ""}
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
                defaultValue={isSuccess && author ? author?.image : ""}
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
                defaultValue={isSuccess && author ? author.bio : ""}
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

export default EditAuthorModal;
