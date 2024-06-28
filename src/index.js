import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Main from "./App";
import Authentication from "./pages/Authentication";
import KanbanPage from "./pages/KanbanPage";
import BusnessRuleDisplay from "./pages/BusnessRuleDisplay";
import MainPage from "./pages/MainPage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import UploadFilePage from "./pages/UploadFilePage";
import WorkflowPage from "./pages/WorkflowPage";
import Chatbotassiatance from "./pages/Chatbotassiatance";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentication />,
  },
  {
    path: "/MainPage",
    element: <Main />,
    children: [
      {
        path: "/MainPage/rulekanban",
        element: <KanbanPage /> ,
      },
      {
        path: "/MainPage/displayrules",
        element: <BusnessRuleDisplay />
      },
      {
        path: "/MainPage/mainpage",
        element: <MainPage />
      },
      {
        path: "/MainPage/FileUploader",
        element: <UploadFilePage />
      },
      {
        path: "/MainPage/Workflowpage",
        element: <WorkflowPage />
      },
      {
        path: "/MainPage/Chatbot",
        element: <Chatbotassiatance />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <RouterProvider router={router} />

);


