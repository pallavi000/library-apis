import CustomModal from "../../../component/CustomModal";
import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useMutation, useQueryClient } from "react-query";
import LoadingButton from "../../../component/LoadingButton";
import { TBook } from "../../../@types/book";
import { TUser } from "../../../@types/user";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { TBorrowInputs } from "../../../@types/borrow";
import { issueBorrowBook } from "../../../api/borrow";

// yup validation schema
const validationSchema = yup.object().shape({
  user: yup.number().required("user is required"),
  book: yup.number().required("book is required"),
  dueDate: yup.string().required("due date is required"),
});

type IssueBookModalProps = {
  users: TUser[];
  books: TBook[];
  isOpen: boolean;
  handleClose: () => void;
};
function IssueBookModal({
  isOpen,
  handleClose,
  users,
  books,
}: IssueBookModalProps) {
  const queryClient = useQueryClient();

  // react hook form
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TBorrowInputs>({
    resolver: yupResolver(validationSchema),
  });

  const mutation = useMutation((data: TBorrowInputs) => issueBorrowBook(data), {
    onSuccess: (data) => {
      handleClose();
      // new user has been added | this runs the fetch api again.
      queryClient.invalidateQueries(["books"]);
      queryClient.invalidateQueries(["users"]);
      queryClient.invalidateQueries(["borrows"]);
    },
  });

  // form submit handler
  const onSubmit: SubmitHandler<TBorrowInputs> = async (data) => {
    mutation.mutate({
      ...data,
      dueDate: moment(data.dueDate).format("YYYY-MM-DD"),
    });
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
            name="user"
            control={control}
            render={({ field }) => (
              <Autocomplete
                disablePortal
                options={users}
                getOptionLabel={(option) => option.name}
                onChange={(e, data) => field.onChange(data?.id)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...field}
                    label="User"
                    error={Boolean(errors.user)}
                    helperText={errors.user?.message}
                  />
                )}
              />
            )}
          />
          {watch("user") ? (
            <Controller
              name="book"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  disablePortal
                  options={books}
                  getOptionLabel={(option) => option.title}
                  getOptionDisabled={(option) =>
                    !option.isAvailable ||
                    Boolean(
                      option.reservations.filter(
                        (r) => r.userId != watch("user")
                      ).length
                    )
                  }
                  onChange={(e, data) => field.onChange(data?.id)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...field}
                      label="Book"
                      error={Boolean(errors.book)}
                      helperText={errors.book?.message}
                    />
                  )}
                />
              )}
            />
          ) : null}

          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  {...field}
                  label={"Expected Return Date"}
                  format="YYYY-MM-DD"
                  disablePast
                  onChange={(date) => field.onChange(date)}
                  slotProps={{
                    textField: {
                      error: Boolean(errors.dueDate),
                      helperText: errors.dueDate?.message,
                    },
                  }}
                />
              </LocalizationProvider>
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

export default IssueBookModal;
