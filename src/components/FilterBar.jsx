import React from "react";
import { ButtonGroup, Button } from "@mui/material";

export default function FilterBar({ filter, setFilter }) {
  return (
    <ButtonGroup fullWidth sx={{ mb: 2 }}>
      {["all", "active", "completed"].map((type) => (
        <Button
          key={type}
          variant={filter === type ? "contained" : "outlined"}
          onClick={() => setFilter(type)}
        >
          {type.toUpperCase()}
        </Button>
      ))}
    </ButtonGroup>
  );
}
