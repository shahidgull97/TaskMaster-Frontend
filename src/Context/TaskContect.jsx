import React, { createContext, useState, useContext, useEffect } from "react";
// import * as taskService from "../services/taskService";
// import { useDetails } from "./UserContext";
const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // Number of tasks per page
  const [loading, setLoading] = useState(true); // 👈 Add loading state

  const [selectedTask, setSelectedTask] = useState(null);
  //   const { isLoggedIN } = useDetails();
  // Filter and sort states
  const [filter, setFilter] = useState({
    priority: "",
    status: "",
    sortBy: "",
  });
  const [dashboardMetrics, setDashboardMetrics] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    averageTimePerTask: 0,
    pendingTasksSummary: {
      total: 0,
      totalTimeLapsed: 0,
      totalTimeToFinish: 0,
      priorityBreakdown: [
        { priority: 1, pendingTasks: 0, timeLapsed: 0, timeToFinish: 0 },
        { priority: 2, pendingTasks: 0, timeLapsed: 0, timeToFinish: 0 },
        { priority: 3, pendingTasks: 0, timeLapsed: 0, timeToFinish: 0 },
        { priority: 4, pendingTasks: 0, timeLapsed: 0, timeToFinish: 0 },
        { priority: 5, pendingTasks: 0, timeLapsed: 0, timeToFinish: 0 },
      ],
    },
  });

  //   Fetch Dashboard Metrics
  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://taskmaster-backend-vkjl.onrender.com/api/task/dashboard`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);

      setDashboardMetrics(data);
      setLoading(false); // 👈 Set loading to false when done
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };
  useEffect(() => {
    fetchDashboard();
  }, [tasks]);

  // Fetch tasks on component mount
  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `https://taskmaster-backend-vkjl.onrender.com/api/task/getTasks?priority=${filter.priority}&status=${filter.status}&sortBy=${filter.sortBy}&page=${currentPage}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      setTotalPages(data.totalPages);
      setTasks(data.tasks);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [filter, currentPage]);
  console.log(tasks);

  // Add Task Handler
  const handleAddTask = async (taskData) => {
    try {
      console.log(taskData);

      const response = await fetch(
        "https://taskmaster-backend-vkjl.onrender.com/api/task/createTask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(taskData),
        }
      );
      const addedTask = await response.json();
      console.log(addedTask);

      fetchTasks();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  // Edit Task Handler
  const handleEditTask = async (updatedTask) => {
    try {
      console.log(updatedTask);
      console.log(selectedTask._id);

      const response = await fetch(
        `https://taskmaster-backend-vkjl.onrender.com/api/task/updateTask/${selectedTask._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedTask),
        }
      );
      const returnedTask = await response.json();
      setTasks(
        tasks.map((task) =>
          task._id === returnedTask._id ? returnedTask : task
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  // Delete Task Handler
  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(
        `https://taskmaster-backend-vkjl.onrender.com/api/task/deleteTask/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      fetchTasks();
      // setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };
  // Open modal for adding new task
  const openAddTaskModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  // Open modal for editing existing task
  const openEditTaskModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };
  // Handle page change
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        selectedTask,
        fetchDashboard,
        setSelectedTask,
        openAddTaskModal,
        openEditTaskModal,
        filter,
        setFilter,
        dashboardMetrics,
        setDashboardMetrics,
        currentPage,
        loading,
        setCurrentPage,
        totalPages,
        setTotalPages,
        limit,
        goToPage,
        isModalOpen,
        setIsModalOpen,
        fetchTasks,
        handleAddTask,
        handleEditTask,
        handleDeleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the TaskContext
export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
