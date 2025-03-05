import React, { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon, CheckCircleIcon } from "lucide-react";

// Task Modal Component
const TaskModal = ({ isOpen, onClose, task = {}, onSubmit }) => {
  //   console.log(onSubmit);

  const [formData, setFormData] = useState({
    title: task?.title || "",
    priority: task?.priority || 3,
    status: task?.status || "Pending",
    startTime: task?.startTime
      ? new Date(task?.startTime).toISOString().slice(0, 16)
      : "",
    endTime: task?.endTime
      ? new Date(task?.endTime).toISOString().slice(0, 16)
      : "",
  });
  // Effect to update endTime when status changes to "Finished"
  useEffect(() => {
    if (formData.status === "Finished") {
      setFormData((prevData) => ({
        ...prevData,
        endTime: new Date().toISOString().slice(0, 16), // Current time
      }));
    }
  }, [formData.status]);
  // Reset form when task changes
  useEffect(() => {
    setFormData({
      title: task?.title || "",
      priority: task?.priority || 3,
      status: task?.status || "Pending",
      startTime: task?.startTime
        ? new Date(task?.startTime).toISOString().slice(0, 16)
        : "",
      endTime: task?.endTime
        ? new Date(task?.endTime).toISOString().slice(0, 16)
        : "",
    });
  }, [task]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-cyan-500 bg-opacity-90 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-96 p-6">
        <h2 className="text-xl font-semibold mb-4">
          {task?._id ? "Edit Task" : "Add Task"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            >
              {[1, 2, 3, 4, 5].map((p) => (
                <option key={p} value={p}>
                  Priority {p}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="flex items-center">
              <span className="mr-2 text-sm font-medium text-gray-700">
                Status
              </span>
              <input
                type="checkbox"
                id="status"
                name="status"
                checked={formData.status === "Finished"}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.checked ? "Finished" : "Pending",
                  }))
                }
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">
                {formData.status}
              </span>
            </label>
          </div>

          <div className="mb-4">
            <label
              htmlFor="startTime"
              className="block text-sm font-medium text-gray-700"
            >
              Start Time
            </label>
            <input
              type="datetime-local"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="endTime"
              className="block text-sm font-medium text-gray-700"
            >
              End Time
            </label>
            <input
              type="datetime-local"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {task?._id ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default TaskModal;
