import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteUser } from "../../../api/user";
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
import { Add } from "@mui/icons-material";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchAllBorrows } from "../../../api/borrow";
import { TBorrow } from "../../../@types/borrow";

function Borrows() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
    isLoading,
    isSuccess,
    data: borrows,
  } = useQuery(["borrows"], fetchAllBorrows);

  const mutation = useMutation((id: number) => deleteUser(id), {
    onSuccess: () => {
      // Invalidate the queries related to authors after successful deletion
      queryClient.invalidateQueries("borrows");
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
        <Typography variant="h6">Borrows</Typography>
        <Button
          size="small"
          variant="contained"
          startIcon={<Add />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Issue Book
        </Button>
      </Stack>

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Book</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Book Issue Date</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isSuccess &&
                  borrows.map((borrow: TBorrow) => (
                    <TableRow key={borrow.id}>
                      <TableCell>{borrow.id}</TableCell>
                      <TableCell>{borrow.book?.title}</TableCell>
                      <TableCell>{borrow.user?.email}</TableCell>
                      <TableCell>{borrow.borrowDate || "NULL"}</TableCell>
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <Button size="small">
                          <BorderColorIcon color="warning" />
                        </Button>

                        <Button onClick={() => handleDelete(borrow.id)}>
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

export default Borrows;
