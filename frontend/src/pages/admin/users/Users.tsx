import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
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

//types
import { TUser } from "../../../@types/user";

//component
import AddUserModal from "./AddUserModal";

//api
import { deleteUser, getAllUsersApi } from "../../../api/user";

function Users() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeGenre, setActiveGenre] = useState<number>(0);

  const queryClient = useQueryClient();

  const {
    isLoading,
    isSuccess,
    data: users,
  } = useQuery(["users"], getAllUsersApi);

  const mutation = useMutation((id: number) => deleteUser(id), {
    onSuccess: () => {
      // Invalidate the queries related to authors after successful deletion
      queryClient.invalidateQueries("users");
    },
  });

  const triggerEditBtn = (id: number) => {
    console.log(id);
    setIsEditModalOpen(true);
    setActiveGenre(id);
  };

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
        <Typography variant="h6">Users</Typography>
        <Button
          size="small"
          variant="contained"
          startIcon={<Add />}
          onClick={() => setIsAddModalOpen(true)}
        >
          New User
        </Button>
      </Stack>

      <AddUserModal
        isOpen={isAddModalOpen}
        handleClose={() => setIsAddModalOpen(false)}
      />

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isSuccess &&
                  users.map((user: TUser) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone || "NULL"}</TableCell>
                      <TableCell>{user.createdAt}</TableCell>
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <Button
                          size="small"
                          onClick={() => triggerEditBtn(user.id)}
                        >
                          <BorderColorIcon color="warning" />
                        </Button>

                        <Button onClick={() => handleDelete(user.id)}>
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

export default Users;
