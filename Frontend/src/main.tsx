import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AutoLista from "./components/AutoLista";
import AutoFelvetel from "./components/AutoFelvetel";
import AutoFooldal from "./components/AutoFooldal";
import LoginPage from "./components/LoginPage";
//import AutoModositas from "./components/AutoModositas";
import AutoModiTest from "./components/AutoModiTest";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AutoFooldal />,
    },
    {
        path: "/autolista",
        element: <AutoLista />,
    },
    {
        path: "/autofelvetel",
        element: <AutoFelvetel />,
    },
    {
        path: "/admin",
        element: <LoginPage />,
    },
    {
        path: "/automodositas/:id",
        element: <AutoModiTest />,
    }
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </StrictMode>
);
