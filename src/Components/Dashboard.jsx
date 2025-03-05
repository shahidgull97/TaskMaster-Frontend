import React, { useState, useEffect } from "react";
import { useTask } from "../Context/TaskContect";

const Dashboard = () => {
  const { tasks, dashboardMetrics, setDashboardMetrics, loading } = useTask();
  console.log(loading);

  if (loading) {
    return <p>Loading...............</p>;
  }
  console.log(tasks);
  console.log(dashboardMetrics);

  return (
    <div className="container mx-auto p-6 bg-blue-200 w-full">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-900 to-black p-4 rounded-lg shadow">
          <h3 className="text-white mb-2">Total Tasks</h3>
          <p className="text-2xl font-bold text-white">
            {dashboardMetrics.totalTasks}
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-fuchsia-800  p-4 rounded-lg shadow">
          <h3 className="text-white mb-2">Tasks Completed</h3>
          <p className="text-2xl font-bold text-white">
            {dashboardMetrics.completedTasks}
            <span className="text-sm ml-1">
              (
              {Math.round(
                (dashboardMetrics.completedTasks /
                  dashboardMetrics.totalTasks || 0) * 100
              )}
              %)
            </span>
          </p>
        </div>
        <div className="bg-gradient-to-br from-amber-600 to-blue-700 p-4 rounded-lg shadow">
          <h3 className="text-white mb-2">Tasks Pending</h3>
          <p className="text-2xl font-bold text-white">
            {dashboardMetrics.pendingTasks}
            <span className="text-sm ml-1">
              (
              {Math.round(
                (dashboardMetrics.pendingTasks / dashboardMetrics.totalTasks ||
                  0) * 100
              )}
              %)
            </span>
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-950 to-red-700 p-4 rounded-lg shadow">
          <h3 className="text-white mb-2">Avg Time per Task</h3>
          <p className="text-2xl font-bold text-white">
            {dashboardMetrics.averageTimePerTask} hrs
          </p>
        </div>
      </div>

      {/* Pending Tasks Summary */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Pending Tasks Summary</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <h3 className="text-blue-800">Pending Tasks</h3>
            <p className="text-2xl font-bold">
              {dashboardMetrics.pendingTasksSummary.total}
            </p>
          </div>
          <div>
            <h3 className="text-red-800">Total Time Lapsed</h3>
            <p className="text-2xl font-bold">
              {dashboardMetrics.pendingTasksSummary.totalTimeLapsed} hrs
            </p>
          </div>
          <div>
            <h3 className="text-green-800">Total Time to Finish</h3>
            <p className="text-2xl font-bold">
              {dashboardMetrics.pendingTasksSummary.totalTimeToFinish} hrs
            </p>
          </div>
        </div>

        {/* Priority Breakdown Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Task Priority</th>
              <th className="border p-2">Pending Tasks</th>
              <th className="border p-2">Time Lapsed (hrs)</th>
              <th className="border p-2">Time to Finish (hrs)</th>
            </tr>
          </thead>
          <tbody>
            {dashboardMetrics.pendingTasksSummary.priorityBreakdown.map(
              (item) => (
                <tr key={item.priority}>
                  <td className="border p-2 text-center">{item.priority}</td>
                  <td className="border p-2 text-center">
                    {item.pendingTasks}
                  </td>
                  <td className="border p-2 text-center">{item.timeLapsed}</td>
                  <td className="border p-2 text-center">
                    {item.timeToFinish}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
