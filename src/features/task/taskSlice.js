import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
};

const saveToStorage = (tasks) =>
  localStorage.setItem("tasks", JSON.stringify(tasks));

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload);
        saveToStorage(state.tasks);
      },
      prepare(task) {
        return {
          payload: {
            ...task,
            id: nanoid(),
            completed: false,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      saveToStorage(state.tasks);
    },
    toggleTask(state, action) {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
      saveToStorage(state.tasks);
    },
    reorderTasks(state, action) {
      state.tasks = action.payload;
      saveToStorage(state.tasks);
    },
  },
});

export const { addTask, deleteTask, toggleTask, reorderTasks } =
  taskSlice.actions;
export default taskSlice.reducer;
