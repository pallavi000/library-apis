import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllUsersApi } from "../../../api/user";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { TGenre } from "../../../@types/genre";
import { Add } from "@mui/icons-material";
import { fetchAllBook, fetchAllGenre } from "../../../api/home";
import { TBook } from "../../../@types/book";
import AddBookModal from "./AddBookModal";
import { deleteBook } from "../../../api/book";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import EditBookModal from "./EditBookModal";

function Books() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeBook, setActiveBook] = useState<number>(0);
  const queryClient = useQueryClient();

  const {
    isLoading,
    isSuccess,
    data: books,
  } = useQuery(["books"], fetchAllBook);

  const triggerEditBtn = (id: number) => {
    console.log(id);
    setIsEditModalOpen(true);
    setActiveBook(id);
  };

  const mutation = useMutation((id: number) => deleteBook(id), {
    onSuccess: () => {
      // Invalidate the queries related to authors after successful deletion
      queryClient.invalidateQueries("books");
    },
  });

  const handleDelete = (id: number) => {
    mutation.mutate(id);
  };

  return (
    <Container component="main" maxWidth="xl">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h6">Books</Typography>
        <Button
          size="small"
          variant="contained"
          startIcon={<Add />}
          onClick={() => setIsAddModalOpen(true)}
        >
          New Books
        </Button>
      </Stack>
      <AddBookModal
        isOpen={isAddModalOpen}
        handleClose={() => setIsAddModalOpen(false)}
      />

      <EditBookModal
        isOpen={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        id={activeBook}
      />

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Genre</TableCell>
                  <TableCell>Publisher</TableCell>
                  <TableCell>Published Year</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isSuccess &&
                  books.map((book: TBook) => (
                    <TableRow key={book.id}>
                      <TableCell>{book.id}</TableCell>
                      <TableCell>
                        <img src={book?.image} height={70} width={70} />
                      </TableCell>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.author?.name}</TableCell>
                      <TableCell>{book.genra?.name}</TableCell>
                      <TableCell>{book.publisher}</TableCell>
                      <TableCell>{book.publishedYear}</TableCell>
                      <TableCell>
                        {book.isAvailable ? (
                          <Chip
                            label="Available"
                            variant="outlined"
                            color="success"
                            size="small"
                            sx={{ width: "fit-content" }}
                          />
                        ) : (
                          <Chip
                            label="Borrowed"
                            variant="outlined"
                            color="error"
                            size="small"
                            sx={{ width: "fit-content" }}
                          />
                        )}
                      </TableCell>
                      <TableCell>{book.createdAt}</TableCell>
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <Button
                          size="small"
                          onClick={() => triggerEditBtn(book.id)}
                        >
                          <BorderColorIcon color="warning" />
                        </Button>
                        <Button onClick={() => handleDelete(book.id)}>
                          <DeleteIcon color="error" />
                        </Button>
                      </TableCell>{" "}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Books;
