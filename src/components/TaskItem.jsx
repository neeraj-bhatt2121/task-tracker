import React from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Chip,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  dragHandleProps,
  draggableProps,
  innerRef,
}) {
  return (
    <ListItem
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      secondaryAction={
        <IconButton onClick={() => onDelete(task.id)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <Checkbox checked={task.completed} onChange={() => onToggle(task.id)} />
      <ListItemText
        primary={task.title}
        secondary={`${task.category} • ${task.priority}`}
        sx={{ textDecoration: task.completed ? "line-through" : "none" }}
      />
      <Box>
        <Chip
          label={task.priority}
          size="small"
          color={
            task.priority === "High"
              ? "error"
              : task.priority === "Medium"
              ? "warning"
              : "success"
          }
        />
      </Box>
    </ListItem>
  );
}
