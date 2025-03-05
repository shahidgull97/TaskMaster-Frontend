import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserDetails } from "./Context/UserContext.jsx";
import { TaskProvider } from "./Context/TaskContect.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserDetails>
      <TaskProvider>
        <App />
      </TaskProvider>
    </UserDetails>
  </StrictMode>
);
