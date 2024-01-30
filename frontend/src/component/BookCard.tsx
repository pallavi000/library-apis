import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Chip, Tooltip, useTheme } from "@mui/material";
import { TBook } from "../@types/book";
import { useNavigate } from "react-router-dom";

type BookCardProps = {
  book: TBook;
};
export default function BookCard({ book }: BookCardProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Tooltip
      title="Click to View"
      onClick={() => navigate(`/books/${book.id}`)}
    >
      <Card sx={{ display: "flex", cursor: "pointer", height: "220px" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {book.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {book.author.name}
            </Typography>
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
              gutterBottom
            >
              Publisher: {book.publisher}, {book.publishedYear}
            </Typography>
            <Chip
              color="primary"
              variant="outlined"
              label={book.genra.name}
              size="small"
            />
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            {book.isAvailable ? (
              <Chip label={"Available"} size="small" color="success" />
            ) : (
              <Chip label={"Not Available"} size="small" color="error" />
            )}
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={book.image}
          alt={book.title}
        />
      </Card>
    </Tooltip>
  );
}
