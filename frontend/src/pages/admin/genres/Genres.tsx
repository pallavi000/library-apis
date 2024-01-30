import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllUsersApi } from "../../../api/user";
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
import { TGenre } from "../../../@types/genre";
import { Add } from "@mui/icons-material";
import { fetchAllGenre } from "../../../api/home";
import AddGenreModal from "./AddGenreModal";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import EditGenreModal from "./EditGenreModal";
import { deleteGenre } from "../../../api/genre";

function Genres() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeGenre, setActiveGenre] = useState<number>(0);

  const queryClient = useQueryClient();

  const {
    isLoading,
    isSuccess,
    data: genres,
  } = useQuery(["genres"], fetchAllGenre);

  const triggerEditBtn = (id: number) => {
    console.log(id);
    setIsEditModalOpen(true);
    setActiveGenre(id);
  };

  const mutation = useMutation((id: number) => deleteGenre(id), {
    onSuccess: () => {
      // Invalidate the queries related to authors after successful deletion
      queryClient.invalidateQueries("genres");
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
          New Genre
        </Button>
      </Stack>
      <AddGenreModal
        isOpen={isAddModalOpen}
        handleClose={() => setIsAddModalOpen(false)}
      />

      <EditGenreModal
        isOpen={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        id={activeGenre}
      />

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isSuccess &&
                  genres.map((genre: TGenre) => (
                    <TableRow key={genre.id}>
                      <TableCell>{genre.id}</TableCell>
                      <TableCell>{genre.name}</TableCell>

                      <TableCell>{genre.createdAt}</TableCell>
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <Button
                          size="small"
                          onClick={() => triggerEditBtn(genre.id)}
                        >
                          <BorderColorIcon color="warning" />
                        </Button>

                        <Button onClick={() => handleDelete(genre.id)}>
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

export default Genres;
