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
import { useMutation, useQuery } from "react-query";
import { useGlobalContext } from "../context/GlobalContext";
import BookDetailSkeleton from "../component/skeletons/BookDetailSkeleton";
import LoadingButton from "../component/LoadingButton";
import CustomBreadcrumb from "../component/CustomBreadcrumb";

function BookDetail() {
  const params = useParams();
  const { id } = params;
  const bookId = Number(id);
  const { user } = useGlobalContext();

  const { isLoading, data: book } = useQuery({
    queryKey: ["book", bookId],
    queryFn: () => fetchBookById(bookId),
  });

  // const mutate = useMutation((data:any)=>)

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
            {book && book.isAvailable ? (
              <Box sx={{ mt: 4 }}>
                {user?.member && user.member.isActive ? (
                  <Card>
                    <CardContent>
                      <Typography variant="body1" gutterBottom mb={2}>
                        Reserver this book for a day?
                      </Typography>
                      <LoadingButton
                        isLoading={false}
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
              </Box>
            ) : null}
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
                  label="Borrowed"
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
