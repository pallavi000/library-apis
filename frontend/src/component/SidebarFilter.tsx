import React, { useState } from "react";
// redux

// MUI
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
} from "@mui/material";

// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// helpers
import { valueToText } from "../utils/helper";
import { useQuery } from "react-query";
import { fetchAllAuthor, fetchAllGenre } from "../api/home";
import { TGenre } from "../@types/genre";
import { TAuthor } from "../@types/author";

// component props type
type SidebarFilterProps = {
  setGenreId: (id: number) => void;
  setAuthorId: (id: number) => void;
};

function SidebarFilter({ setGenreId, setAuthorId }: SidebarFilterProps) {
  const { data: genres } = useQuery(["genres"], fetchAllGenre);
  const { data: authors } = useQuery(["authors"], fetchAllAuthor);

  const handleGenresChange = (
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    setGenreId(Number((event.target as HTMLInputElement).value));
  };

  const handleAuthorsChange = (
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    setAuthorId(Number((event.target as HTMLInputElement).value));
  };

  return (
    <Box>
      <Accordion expanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Genres</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl>
            <RadioGroup defaultValue={0}>
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="All"
                defaultChecked
                onChange={handleGenresChange}
              />
              {genres &&
                genres.map((genre: TGenre) => {
                  return (
                    <FormControlLabel
                      key={genre.id}
                      value={genre.id}
                      control={<Radio />}
                      label={genre.name}
                      onChange={handleGenresChange}
                    />
                  );
                })}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Box sx={{ margin: "2rem 0rem" }}>
        <Accordion expanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Authors</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl>
              <RadioGroup defaultValue={0}>
                <FormControlLabel
                  value={0}
                  control={<Radio />}
                  label="All"
                  defaultChecked
                  onChange={handleAuthorsChange}
                />
                {authors &&
                  authors.map((author: TAuthor) => {
                    return (
                      <FormControlLabel
                        key={author.id}
                        value={author.id}
                        control={<Radio />}
                        label={author.name}
                        onChange={handleAuthorsChange}
                      />
                    );
                  })}
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}

export default SidebarFilter;
