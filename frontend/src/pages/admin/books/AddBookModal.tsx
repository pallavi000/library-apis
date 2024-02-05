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
import { useMutation, useQuery, useQueryClient } from "react-query";

//component
import LoadingButton from "../../../component/LoadingButton";
import CustomModal from "../../../component/CustomModal";

//types
import { TGenre } from "../../../@types/genre";
import { TBookInputs } from "../../../@types/book";
import { TAuthor } from "../../../@types/author";

//api
import { addNewBook } from "../../../api/book";
import { fetchAllAuthor, fetchAllGenre } from "../../../api/home";

// yup validation schema
const validationSchema = yup.object().shape({
  title: yup.string().required("title is required"),
  image: yup.string().required("image is required"),
  genra: yup.number().required("genre is required"),
  author: yup.number().required("author is required"),
  publisher: yup.string().required("publisher is required"),
  publishedYear: yup.number().required("publishedYear is required"),
  isAvailable: yup.boolean().required("isAvailable is required"),
});

type AddBookModelProps = {
  isOpen: boolean;
  handleClose: () => void;
};
function AddBookModal({ isOpen, handleClose }: AddBookModelProps) {
  const queryClient = useQueryClient();

  const { data: authors } = useQuery(["authors"], fetchAllAuthor);
  const { data: genres } = useQuery(["genres"], fetchAllGenre);
  // react hook form
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TBookInputs>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setValue("isAvailable", true);
  }, []);

  const mutation = useMutation((data: TBookInputs) => addNewBook(data), {
    onSuccess: (data) => {
      handleClose();
      // new user has been added | this runs the fetch api again.
      queryClient.invalidateQueries(["books"]);
    },
  });

  // form submit handler
  const onSubmit: SubmitHandler<TBookInputs> = async (data) => {
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
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Book title"
                variant="outlined"
                error={Boolean(errors.title)}
                helperText={errors.title?.message}
              />
            )}
          />

          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Book Image"
                variant="outlined"
                error={Boolean(errors.image)}
                helperText={errors.image?.message}
              />
            )}
          />
          <Controller
            name="author"
            control={control}
            render={({ field }) => (
              <FormControl error={Boolean(errors.author)}>
                <InputLabel id="demo-simple-select-label">
                  Select a author
                </InputLabel>
                <Select
                  {...field}
                  value={field.value ?? ""}
                  label="Select a category"
                  variant="outlined"
                  error={Boolean(errors.author)}
                >
                  {authors.map((author: TAuthor) => {
                    return (
                      <MenuItem key={author.id} value={author.id}>
                        {author.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                {errors.author?.message ? (
                  <FormHelperText>{errors.author?.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          <Controller
            name="genra"
            control={control}
            render={({ field }) => (
              <FormControl error={Boolean(errors.genra)}>
                <InputLabel id="demo-simple-select-label">
                  Select a genre
                </InputLabel>
                <Select
                  {...field}
                  value={field.value ?? ""}
                  label="Select a category"
                  variant="outlined"
                  error={Boolean(errors.genra)}
                >
                  {genres.map((genre: TGenre) => {
                    return (
                      <MenuItem key={genre.id} value={genre.id}>
                        {genre.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                {errors.genra?.message ? (
                  <FormHelperText>{errors.genra?.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            name="publisher"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Book publisher"
                variant="outlined"
                error={Boolean(errors.publisher)}
                helperText={errors.publisher?.message}
              />
            )}
          />

          <Controller
            name="publishedYear"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Book published year"
                placeholder="YYYY"
                variant="outlined"
                error={Boolean(errors.publishedYear)}
                helperText={errors.publishedYear?.message}
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

export default AddBookModal;
