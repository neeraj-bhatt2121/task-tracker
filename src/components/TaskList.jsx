import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleTask,
  deleteTask,
  reorderTasks,
} from "../features/task/taskSlice";
import { List } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";

export default function TaskList({ filter }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const filtered = tasks.filter((task) =>
    filter === "all"
      ? true
      : filter === "completed"
      ? task.completed
      : !task.completed
  );

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(filtered);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    dispatch(reorderTasks(reordered));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="taskList">
        {(provided) => (
          <List {...provided.droppableProps} ref={provided.innerRef}>
            {filtered.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <TaskItem
                    task={task}
                    onToggle={() => dispatch(toggleTask(task.id))}
                    onDelete={() => dispatch(deleteTask(task.id))}
                    dragHandleProps={provided.dragHandleProps}
                    draggableProps={provided.draggableProps}
                    innerRef={provided.innerRef}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
}
