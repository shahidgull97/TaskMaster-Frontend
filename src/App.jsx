import TaskManager from "./Components/TaskManager";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthPage from "./Components/Auth";
import { useDetails } from "./Context/UserContext";
import Dashboard from "./Components/Dashboard";
import Navbar from "./Components/Navbar";
// import { Navigate } from "react-router-dom";
function App() {
  const { isLoggedIN } = useDetails();
  console.log(isLoggedIN);

  // const routes = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: isLoggedIN ? <TaskManager /> : <Navigate to="/login" replace />,
  //   },
  //   {
  //     path: "/login",
  //     element: isLoggedIN ? <Navigate to="/" replace /> : <AuthPage />,
  //   },
  // ]);
  return (
    <>
      <Router>
        <Routes>
          {/* Protected Routes for Logged-in Users */}
          <Route path="/" element={<Navbar />}>
            <Route
              index
              element={
                isLoggedIN ? <Dashboard /> : <Navigate to="/login" replace />
              }
            />{" "}
            {/* Default child route */}
            <Route path="tasks" element={<TaskManager />} />
          </Route>

          {/* Public Route - Always Accessible */}
          <Route
            path="/login"
            element={isLoggedIN ? <Navigate to="/" replace /> : <AuthPage />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
