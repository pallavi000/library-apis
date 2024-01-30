import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  ButtonGroup,
} from "@mui/material";
import { fetchAllBook, fetchBooksPagination } from "../api/home";
import { TBook } from "../@types/book";
import { useQuery } from "react-query";

// icons
import GridViewIcon from "@mui/icons-material/GridView";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useEffect, useState } from "react";
import AppLoader from "../component/AppLoader";
import SidebarFilter from "../component/SidebarFilter";
import BookCard from "../component/BookCard";

function Home() {
  // pagination states
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(12);
  const [genreId, setGenreId] = useState<number>(0);
  const [authorId, setAuthorId] = useState<number>(0);

  const { isLoading, data: books } = useQuery({
    queryKey: ["books", page, limit, genreId, authorId],
    queryFn: () => fetchBooksPagination(page, limit, genreId, authorId),
    keepPreviousData: true,
  });

  const handlePrevPage = () => {
    setPage((prev) => prev - 1);
  };
  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };
  const handleChange = (e: SelectChangeEvent) => {
    setLimit(Number(e.target.value));
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [books]);

  return (
    <Container maxWidth="xl" sx={{ padding: "2rem 1rem" }}>
      <Grid container columns={12} spacing={4} sx={{ padding: "2rem 0rem" }}>
        <Grid item xs={12} md={4} lg={3}>
          <SidebarFilter setGenreId={setGenreId} setAuthorId={setAuthorId} />
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <GridViewIcon />
              <Typography variant="h6">
                Showing {page} - {page + limit} items
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Typography variant="h6">Show </Typography>
              <FormControl fullWidth size="small">
                <Select value={limit.toString()} onChange={handleChange}>
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Grid container spacing={4} columns={12} sx={{ my: 2 }}>
            {isLoading ? (
              <AppLoader />
            ) : (
              books.map((book: TBook) => {
                return (
                  <Grid item xs={12} sm={6} key={book.id}>
                    <BookCard book={book} />
                  </Grid>
                );
              })
            )}
          </Grid>
          <ButtonGroup sx={{ float: "right" }}>
            <Button
              variant="contained"
              disabled={isLoading || !Boolean(page - 1)}
              startIcon={<ArrowLeft />}
              onClick={handlePrevPage}
            >
              Prev
            </Button>
            <Button disabled size="small">
              <Typography variant="body1">{Math.ceil(page / limit)}</Typography>
            </Button>
            <Button
              variant="contained"
              disabled={isLoading || books.length !== limit ? true : false}
              endIcon={<ArrowRight />}
              onClick={handleNextPage}
            >
              Next
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
