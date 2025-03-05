import React, { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon, CheckCircleIcon } from "lucide-react";
import TaskModal from "./AddTask";
import { Navigate, useNavigate } from "react-router-dom";
import { useTask } from "../Context/TaskContect";
import { useDetails } from "../Context/UserContext";
const TaskManager = () => {
  // const [tasks, setTasks] = useState([]);
  const { isLoggedIN } = useDetails();
  const navigate = useNavigate();
  if (!isLoggedIN) {
    navigate("/login");
  }

  const {
    tasks,
    selectedTask,
    currentPage,
    totalPages,
    goToPage,
    filter,
    setFilter,
    openEditTaskModal,
    openAddTaskModal,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    isModalOpen,
    setIsModalOpen,
  } = useTask();

  return (
    <div className="container mx-auto p-6 bg-amber-50 min-h-screen">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Filtering Options */}
        <div className="p-4 bg-gray-300 flex space-x-4">
          <select
            value={filter.priority}
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
            className="select select-bordered w-full"
          >
            <option value="">All Priorities</option>
            {[1, 2, 3, 4, 5].map((p) => (
              <option key={p} value={p}>
                Priority {p}
              </option>
            ))}
          </select>
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="select select-bordered w-full"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Finished">Finished</option>
          </select>
          <select
            value={filter.sortBy}
            onChange={(e) => setFilter({ ...filter, sortBy: e.target.value })}
            className="select select-bordered w-full"
          >
            <option value="">Sort By</option>
            <option value="startTimeAsc">Start Time (Ascending)</option>
            <option value="startTimeDesc">Start Time (Descending)</option>
            <option value="endTimeAsc">End Time (Ascending)</option>
            <option value="endTimeDesc">End Time (Descending)</option>
          </select>
        </div>

        <div className="container mx-auto p-6 bg-blue-300">
          {/* Add Task Button */}
          <button
            onClick={openAddTaskModal}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md mb-4 flex items-center"
          >
            <PlusIcon className="mr-2" /> Add Task
          </button>

          {/* Task List */}
          <div className="grid gap-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white shadow rounded-lg p-4 flex justify-between items-center transition-transform duration-300 hover:scale-103"
              >
                <div>
                  <h3 className="font-bold">{task.title}</h3>
                  <span className="text-sm text-gray-500 mr-4">
                    Priority: {task.priority}
                  </span>
                  <span
                    className={`text-sm mr-4 ${
                      task.status == "Pending"
                        ? "text-red-700"
                        : "text-emerald-700"
                    }`}
                  >
                    Status: {task.status}
                  </span>
                  <span className="text-sm text-gray-500 mr-4">
                    Start: {new Date(task.startTime).toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 mr-4">
                    {" "}
                    End: {new Date(task.endTime).toLocaleString()}
                  </span>
                  {/* <p className="text-sm text-gray-500">
                     |  |  |
                  </p> */}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditTaskModal(task)}
                    className="text-blue-600 hover:bg-blue-50 p-2 rounded"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="text-red-600 hover:bg-red-50 p-2 rounded"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Task Modal */}
          <TaskModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            task={selectedTask}
            onSubmit={selectedTask ? handleEditTask : handleAddTask}
          />
        </div>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          className="px-4 py-2 bg-indigo-600 rounded text-white"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="px-4 py-2 bg-indigo-600 rounded text-white"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskManager;
