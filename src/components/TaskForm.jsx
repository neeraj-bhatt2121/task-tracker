import React, { useState } from "react";
import { Box, Button, TextField, MenuItem, Grid } from "@mui/material";

const categories = ["Work", "Personal", "School"];
const priorities = ["Low", "Medium", "High"];

export default function TaskForm({
  title,
  category,
  priority,
  onChangeTitle,
  onChangeCategory,
  onChangePriority,
  onSubmit,
}) {
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError(true);
      return;
    }
    setError(false);
    onSubmit(e); // Delegate to parent
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        fullWidth
        label="Add New Task"
        value={title}
        onChange={(e) => {
          setError(false); // Clear error on change
          onChangeTitle(e);
        }}
        sx={{ mb: 1 }}
        error={error}
        helperText={error ? "Please enter a task title" : ""}
      />
      <Grid container spacing={1}>
        <Grid item xs={6} sx={{ margin: "10px 0px" }}>
          <TextField
            select
            label="Category"
            value={category}
            onChange={onChangeCategory}
            fullWidth
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} sx={{ margin: "10px 0px" }}>
          <TextField
            select
            label="Priority"
            value={priority}
            onChange={onChangePriority}
            fullWidth
          >
            {priorities.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Add Task
      </Button>
    </Box>
  );
}
