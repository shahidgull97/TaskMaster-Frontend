import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  LockIcon,
  UserIcon,
  MailIcon,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDetails } from "../Context/UserContext";
import { useTask } from "../Context/TaskContect";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setIsLoggedIn } = useDetails();
  const { fetchDashboard, fetchTasks } = useTask();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(isSignUp);

      const endpoint = isSignUp
        ? "https://taskmaster-backend-vkjl.onrender.com/api/user/signup"
        : "https://taskmaster-backend-vkjl.onrender.com/api/user/login";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(response);

      if (response.ok && !isSignUp) {
        // Handle successful login/signup
        // e.g., store token, redirect to dashboard
        fetchDashboard();
        setIsLoggedIn(true);
        fetchTasks();
        console.log(data);
      }
      if (isSignUp) {
        setIsSignUp(!isSignUp);
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black flex gap-6 items-center justify-center px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mr-0.5">
          <span className="text-blue-500">Plan.</span>
          <span className="text-green-500"> Prioritize.</span>
          <span className="text-red-500"> Achieve.</span>
          <br />
          <span className="text-orange-500">
            Welcome to <span className="text-white mb-5">TaskMaster!</span>
          </span>
          <p className="mt-3 text-2xl italic text-amber-300">
            Please Login or SignUp to get Started
          </p>
        </h1>

        <div className="w-full max-w-md mr-8">
          <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
            {/* Animated Background Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1 w-full"></div>

            {/* Form Container */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Username"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                )}

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MailIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </button>
              </form>

              {/* Toggle between Sign In and Sign Up */}
              <div className="text-center mt-6">
                <p className="text-gray-600">
                  {isSignUp
                    ? "Already have an account? "
                    : "Don't have an account? "}
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold"
                  >
                    {isSignUp ? "Sign In" : "Sign Up"}
                  </button>
                </p>
              </div>

              {/* Social Login Options */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {["Google", "GitHub", "Apple"].map((provider) => (
                    <button
                      key={provider}
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      {provider}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
            <div className="absolute -top-10 -right-10 w-96 h-96 bg-indigo-300 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default AuthPage;
