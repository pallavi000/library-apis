import { useState } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import {
  Button,
  Card,
  CardContent,
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

//icons
import { Add } from "@mui/icons-material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";

//api
import { fetchAllAuthor } from "../../../api/home";
import { deleteAuthor } from "../../../api/author";

//types
import { TAuthor } from "../../../@types/author";

//Modal
import AddAuthorModal from "./AddAuthorModal";
import EditAuthorModal from "./EditAuthorModal";

function Authors() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeAuthor, setActiveAuthor] = useState<number>(0);

  const queryClient = useQueryClient();

  const {
    isLoading,
    isSuccess,
    data: authors,
  } = useQuery(["authors"], fetchAllAuthor);

  const triggerEditBtn = (id: number) => {
    console.log(id);
    setIsEditModalOpen(true);
    setActiveAuthor(id);
  };

  const mutation = useMutation((id: number) => deleteAuthor(id), {
    onSuccess: () => {
      // Invalidate the queries related to authors after successful deletion
      queryClient.invalidateQueries("authors");
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
        <Typography variant="h6">Genres</Typography>
        <Button
          size="small"
          variant="contained"
          startIcon={<Add />}
          onClick={() => setIsAddModalOpen(true)}
        >
          New Author
        </Button>
      </Stack>

      <AddAuthorModal
        isOpen={isAddModalOpen}
        handleClose={() => setIsAddModalOpen(false)}
      />
      <EditAuthorModal
        isOpen={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        id={activeAuthor}
      />

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Bio</TableCell>
                  <TableCell>Created At</TableCell>

                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isSuccess &&
                  authors.map((author: TAuthor) => (
                    <TableRow key={author.id}>
                      <TableCell>{author.id}</TableCell>
                      <TableCell>
                        <img src={author?.image} height={50} width={50} />
                      </TableCell>
                      <TableCell>{author.name}</TableCell>
                      <TableCell>{author.bio}</TableCell>
                      <TableCell>{author.createdAt}</TableCell>
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <Button
                          size="small"
                          onClick={() => triggerEditBtn(author.id)}
                        >
                          <BorderColorIcon color="warning" />
                        </Button>
                        <Button onClick={() => handleDelete(author.id)}>
                          <DeleteIcon color="error" />
                        </Button>
                      </TableCell>
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

export default Authors;
