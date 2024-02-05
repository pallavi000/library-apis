import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  Button,
  Card,
  CardContent,
  Chip,
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
//icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Add } from "@mui/icons-material";

//types
import { TMember, TMemberInputs } from "../../../@types/user";

//api
import {
  deleteMembership,
  fetchAllInactiveMemberships,
  updateMembership,
} from "../../../api/member";
import { fetchUsersWithoutMembership } from "../../../api/user";

//component
import AddMember from "./AddMember";

//helper
import { showCustomToastr } from "../../../utils/helper";

function Membership() {
  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: users } = useQuery(
    ["users", "inactive"],
    fetchUsersWithoutMembership
  );
  const {
    isLoading,
    isSuccess,
    data: members,
  } = useQuery(["members"], fetchAllInactiveMemberships);

  const deleteMutation = useMutation((id: number) => deleteMembership(id), {
    onSuccess: () => {
      showCustomToastr("membership delete successfully", "success");
      queryClient.invalidateQueries(["members"]);
      queryClient.invalidateQueries(["users", "inactive"]);
    },
  });

  const updateMutation = useMutation(
    ({ id, data }: { id: number; data: TMemberInputs }) =>
      updateMembership(id, data),
    {
      onSuccess: () => {
        showCustomToastr("membership accepted successfully", "success");
        queryClient.invalidateQueries(["members"]);
        queryClient.invalidateQueries(["users", "inactive"]);
      },
    }
  );

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
          Add Membership to User
        </Button>
      </Stack>
      <AddMember
        users={users}
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
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>User Email</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isSuccess &&
                  members.map((member: TMember) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.id}</TableCell>
                      <TableCell>{member.memberType}</TableCell>

                      <TableCell>{member.isActive}</TableCell>
                      <TableCell>{member.user?.id}</TableCell>
                      <TableCell>{member.user?.name}</TableCell>
                      <TableCell>{member.user?.email}</TableCell>
                      <TableCell>{member.createdAt}</TableCell>

                      <TableCell>
                        <Tooltip title="Accept Membership">
                          <IconButton
                            disabled={updateMutation.isLoading}
                            onClick={() =>
                              updateMutation.mutate({
                                id: member.id,
                                data: {
                                  ...member,
                                  isActive: true,
                                  user: member.user?.id,
                                },
                              })
                            }
                          >
                            <CheckCircleIcon color="success" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Reject Membership">
                          <IconButton
                            disabled={deleteMutation.isLoading}
                            onClick={() => deleteMutation.mutate(member.id)}
                          >
                            <CancelIcon color="error" />
                          </IconButton>
                        </Tooltip>
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

export default Membership;
