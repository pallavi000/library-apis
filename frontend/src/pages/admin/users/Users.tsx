import { useState } from "react";
import { useQuery } from "react-query";
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
import { TUser } from "../../../@types/user";
import { Add } from "@mui/icons-material";
import AddUserModal from "./AddUserModal";

function Users() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const {
    isLoading,
    isSuccess,
    data: users,
  } = useQuery(["users"], getAllUsersApi);

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
                      <TableCell>Action Icons</TableCell>
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
