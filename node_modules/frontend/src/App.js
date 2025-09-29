import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Sidenav from "./components/Sidenav";
import Inicio from "./pages/Inicio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cuenta from "./pages/Cuenta";
import Transferir from "./pages/Transferir";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div className="d-flex">
                <Sidenav />
                <div className="flex-grow-1">
                    <Outlet />
                </div>
            </div>
        ),
        children: [
            { path: "", element: <Inicio /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "cuenta", element: <Cuenta />},
            { path: "transferir", element: <Transferir />}
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
