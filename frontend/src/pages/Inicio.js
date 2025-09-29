import {Card, Row, Col, Button} from "react-bootstrap";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaHandHoldingUsd, FaMobileAlt, FaChartLine, FaRegStar, FaRegSmile } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";

function Inicio() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const goToCuenta = () => {
        if(user) {
            navigate("/cuenta");
        } else {
            alert("Debes iniciar sesión para acceder a Mi Cuenta");
            navigate("/login");
        }
    }

    const goToTransferir = () => {
        if(user) {
            navigate("/transferir");
        } else {
            alert("Debes iniciar sesión para realizar transferencias");
            navigate("/login");
        }
    }

    return (
        <div
            className="d-flex justify-content-center align-items-center min-vh-100"
            style={{ background: "#f8fafc" }}
        >
            <Card className="w-100"
                  style={{
                      borderRadius: 32,
                      maxWidth: 1000,
                      minHeight: "80vh",
                      background: "#fff",
                      display: "flex",
                      flexDirection: "row",
                  }}
            >
                <Row className="flex-grow-1 m-0">
                    <Col md={6} className="d-flex flex-column justify-content-center align-items-center text-center px-5 py-4" style={{ minHeight: "80vh" }}>
                        <img src="/NEWBANK.png" width={80} alt="logo"/>
                        <h2 className="fw-bold pt-3">Bienvenido a NewBank</h2>
                        <p className="mb-3 text-secondary fs-5">
                            Tu banco digital para un futuro financiero más seguro y simple. Accede a los mejores servicios desde donde estés.
                        </p>
                        <div className="mb-4 d-flex flex-column gap-2 w-100">
                            <Button variant="primary" size="lg" onClick={goToCuenta}>Mi Cuenta</Button>
                            <Button variant="outline-primary" size="lg" onClick={goToTransferir}>Transferir</Button>
                        </div>
                        <div className="alert alert-info text-center p-2 small mt-2 mb-0">
                            <FaLock className="me-2"/> <b>Consejo:</b> Nunca compartas tu clave con terceros.
                        </div>
                    </Col>
                    <Col md={6} className="d-flex flex-column justify-content-center align-items-start px-5 py-4" style={{ minHeight: "80vh", overflowX: "hidden" }}>
                        <h4 className="fw-bold mb-4">¿Por qué elegir <span className="text-primary">NewBank?</span></h4>
                        <ul className="list-unstyled fs-6 ps-0">
                            <li className="mb-3"><FaRegStar className="text-primary me-2"/><b>Innovador:</b> Transacciones instantáneas y sin costo</li>
                            <li className="mb-3"><FaHandHoldingUsd className="text-success me-2"/><b>Finanzas Claras:</b> Saldo y movimientos siempre al día</li>
                            <li className="mb-3"><FaMobileAlt className="text-info me-2"/><b>Movilidad total:</b> Administra tu cuenta 24/7 desde tu móvil</li>
                            <li className="mb-3"><FaChartLine className="text-secondary me-2"/><b>Estadísticas:</b> Visualiza tu historial y controla tus gastos</li>
                            <li><FaRegSmile className="text-warning me-2"/><b>Soporte humano:</b> Atención inmediata desde tu área de usuario</li>
                        </ul>
                        <div className="mt-3 py-2 text-start w-100" style={{overflowWrap: "break-word", maxWidth: "100%"}}>
                            <span className="badge bg-success fs-6 shadow-sm px-3 py-2" style={{display:"inline-block", maxWidth: "100%", whiteSpace: "normal"}}>
                                ¡Promoción! Recibe bonificaciones por tus primeras transferencias
                            </span>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}
export default Inicio;
