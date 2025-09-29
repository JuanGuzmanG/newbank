import React, {useState, useEffect, useContext} from "react";
import { Navbar, Nav, Button, Offcanvas } from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext";

function Sidenav() {
    const [show, setShow] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 992);
            setShow(false);
        };
        window.addEventListener("resize", handleResize);

        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const logoutAccount = async (e) => {
        try{
            await logout();
            navigate("/");
            setShow(false);
        } catch(err){
            alert("Login failed: " + err.message);
        }
    }

    const handleNavigate = (path) => {
        navigate(path);
        setShow(false);
    }

    const navLinks = (
        <>
            <Nav.Link as={Link} to="/" active={location.pathname === "/"} onClick={() => setShow(false)} className="text-white">
                Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/about" active={location.pathname === "/about"} onClick={() => setShow(false)} className="text-white">
                About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" active={location.pathname === "/contact"} onClick={() => setShow(false)} className="text-white">
                Contact
            </Nav.Link>
            <hr className="border-light" />
            {user ? (
                <>
                    <div className="text-white text-center mt-3 mb-2">Bienvenido {user.nombre} {user.apellido}</div>
                    <Button className="btn btn-primary w-100 mb-2" onClick={() => handleNavigate("/cuenta")}>
                        Mi Cuenta
                    </Button>
                    <Button className='btn btn-primary w-100 mb-2' onClick={() => handleNavigate("/transferir")}>
                        Transferir
                    </Button>
                    <Button className='btn btn-secondary w-100' onClick={logoutAccount}>
                        Cerrar Sesión
                    </Button>
                </>
            ) : (
                <>
                    <Nav.Link as={Link} to="/login" onClick={() => setShow(false)} className="text-white">
                        Login
                    </Nav.Link>
                    <Nav.Link as={Link} to="/register" onClick={() => setShow(false)} className="btn btn-primary text-white mt-2">
                        Sign Up
                    </Nav.Link>
                </>
            )}
        </>
    );

    if (!isDesktop) {
        return (
            <>
                {/* Solo en móvil */}
                <Navbar expand={false} className="bg-primary position-relative">
                    <Button
                        variant="light"
                        onClick={() => setShow(true)}
                        className="rounded-circle shadow-sm border-0"
                        style={{
                            width: 48,
                            height: 48,
                            position: "fixed",
                            top: 10,
                            left: "50%",
                            transform: "translateX(-50%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 1050
                        }}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </Button>
                </Navbar>

                <Offcanvas show={show} onHide={() => setShow(false)} className="bg-primary text-white">
                    <Offcanvas.Header closeButton closeVariant="white">
                        <Offcanvas.Title className="d-flex align-items-center">
                            <img src="/NEWBANK.png" alt="Logo" width={30} className="me-2" />
                            NewBank
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="flex-column">{navLinks}</Nav>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        );
    } else {
        return (
            <div className="d-flex flex-column vh-100 bg-primary text-white p-3" style={{width: "220px", minWidth:"220px"}}>
                <div className="d-flex align-items-center mb-3">
                    <img src="/NEWBANK.png" alt="Logo" width={30} className="me-2" />
                    <span className="fs-4 fw-bold">NewBank</span>
                </div>
                <Nav className="flex-column flex-grow-1">{navLinks}</Nav>
            </div>
        );
    }
}

export default Sidenav;
