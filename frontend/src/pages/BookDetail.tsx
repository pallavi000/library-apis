import { useParams } from "react-router-dom";
import { fetchBookById } from "../api/home";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";

//context
import { useGlobalContext } from "../context/GlobalContext";

//skeleton
import BookDetailSkeleton from "../component/skeletons/BookDetailSkeleton";

//component
import LoadingButton from "../component/LoadingButton";
import CustomBreadcrumb from "../component/CustomBreadcrumb";

//api
import { reserveBook } from "../api/book";

function BookDetail() {
  const params = useParams();
  const { id } = params;
  const bookId = Number(id);
  const { user } = useGlobalContext();
  const queryClient = useQueryClient();

  const { isLoading, data: book } = useQuery({
    queryKey: ["book", bookId],
    queryFn: () => fetchBookById(bookId),
  });

  const mutation = useMutation((bookId: number) => reserveBook(bookId), {
    onSuccess: () => {
      // new user has been added | this runs the fetch api again.
      queryClient.invalidateQueries(["book", bookId]);
    },
  });

  if (isLoading) return <BookDetailSkeleton />;

  return (
    <Container>
      <CustomBreadcrumb
        labels={[
          { title: book?.author?.name || "Author" },
          { title: book?.title || "Book" },
        ]}
      />
      <Grid spacing={4} sx={{ display: "flex", gap: 8, marginY: 4 }}>
        <Grid item md={4}>
          <img src={book?.image} />
        </Grid>
        <Grid item md={8}>
          <Stack gap={1}>
            <Box>
              <Typography variant="h4">{book?.title}</Typography>
              <Typography variant="body1">
                {book?.author?.name || "NULL"}
              </Typography>
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography variant="body1" color={"text.secondary"}>
                  Publisher:
                </Typography>
                <Typography variant="body2" color={"text.secondary"}>
                  {book?.publisher}, {book?.publishedYear}
                </Typography>
              </Stack>
            </Box>
            <Box>
              <Chip
                variant="outlined"
                size="small"
                label={book?.genra?.name || "NULL"}
              />
            </Box>
            <Box sx={{ mt: 4 }}>
              {book && book.reservations.length ? (
                <Alert severity="error">Book is already reserved.</Alert>
              ) : book && book.isAvailable ? (
                <>
                  {user?.member && user.member.isActive ? (
                    <Card>
                      <CardContent>
                        <Typography variant="body1" gutterBottom mb={2}>
                          Reserver this book for a day?
                        </Typography>
                        <LoadingButton
                          handleClick={() => mutation.mutate(book.id)}
                          isLoading={mutation.isLoading}
                          title="Reserve"
                          color="primary"
                        />
                      </CardContent>
                    </Card>
                  ) : (
                    <Alert severity="error">
                      Your membership is not yet approved. Only users with
                      membership can reserve the book.
                    </Alert>
                  )}
                </>
              ) : null}
              {book && !book.isAvailable ? (
                <Stack spacing={2}>
                  <Alert severity="error">
                    Book is not available right now.
                  </Alert>
                </Stack>
              ) : null}
            </Box>
            <Box sx={{ mt: 4 }}>
              {book && book.isAvailable ? (
                <Chip
                  label="Available"
                  color="success"
                  size="small"
                  sx={{ width: "fit-content" }}
                />
              ) : (
                <Chip
                  label="Book Borrowed"
                  size="small"
                  color={"error"}
                  sx={{ width: "fit-content" }}
                />
              )}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default BookDetail;
