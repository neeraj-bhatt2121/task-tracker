import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/task/taskSlice";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import FilterBar from "./FilterBar";
import { Box } from "@mui/material";

export default function TaskContainer() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(addTask({ title, category, priority }));
    setTitle("");
    setCategory("Work");
    setPriority("Medium");
  };

  return (
    <>
      <TaskForm
        title={title}
        category={category}
        priority={priority}
        onChangeTitle={(e) => setTitle(e.target.value)}
        onChangeCategory={(e) => setCategory(e.target.value)}
        onChangePriority={(e) => setPriority(e.target.value)}
        onSubmit={handleSubmit}
      />
      <Box sx={{ marginTop: "5px" }}>
        <FilterBar filter={filter} setFilter={setFilter} />
      </Box>
      <TaskList filter={filter} />
    </>
  );
}
