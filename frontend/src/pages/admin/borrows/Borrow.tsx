import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllUsersApi } from "../../../api/user";
import {
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { TBorrow } from "../../../@types/borrow";
import { fetchAllBook } from "../../../api/home";
import IssueBookModal from "./IssueBookModal";
import { fetchAllBorrows, returnBorrowBook } from "../../../api/borrow";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";

function Borrows() {
  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: books } = useQuery(["books"], fetchAllBook);
  const { data: users } = useQuery(["users"], getAllUsersApi);
  const {
    isLoading,
    isSuccess,
    data: borrows,
  } = useQuery(["borrows"], fetchAllBorrows);
  const mutation = useMutation((id: number) => returnBorrowBook(id), {
    onSuccess: () => {
      // new user has been added | this runs the fetch api again.
      queryClient.invalidateQueries(["books"]);
      queryClient.invalidateQueries(["users"]);
      queryClient.invalidateQueries(["borrows"]);
    },
  });
khai ekxin bahira herxu huss nai herxu vanya
  return (
    <Container component="main" maxWidth="xl">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h6">Issued Books</Typography>
        <Button
          size="small"
          variant="contained"
          startIcon={<Add />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Issue Book
        </Button>
      </Stack>
      <IssueBookModal
        isOpen={isAddModalOpen}
        handleClose={() => setIsAddModalOpen(false)}
        users={users}
        books={books}
      />

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Book</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Issue Date</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Return Date</TableCell>
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
                      <TableCell>{borrow.dueDate || "NULL"}</TableCell>
                      <TableCell>
                        {borrow?.isReturned ? (
                          <>{borrow.returnDate || "NULL"}</>
                        ) : (
                          <>Not Yet Returned</>
                        )}
                      </TableCell>
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        {!borrow.isReturned ? (
                          <Tooltip title="Initiate Book Return">
                            <IconButton
                              size="small"
                              disabled={mutation.isLoading}
                              onClick={() => mutation.mutate(borrow.id)}
                            >
                              <AssignmentReturnIcon color="warning" />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <>&nbsp;</>
                        )}
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

export default Borrows;
