import { Card, Row, Col, Button } from "react-bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaHandHoldingUsd, FaMobileAlt, FaChartLine, FaRegStar, FaRegSmile } from "react-icons/fa";

function About() {
    const navigate = useNavigate();

    return (
        <div
            className="d-flex justify-content-center align-items-center min-vh-100"
            style={{ background: "#f8fafc", padding: "1rem" }}
        >
            <Card
                className="w-100"
                style={{
                    borderRadius: 20,
                    boxShadow: "0 0 30px rgba(0,0,0,0.1)",
                    maxWidth: 1000,
                    height: "60vh",   // control de altura para rectangular
                    minHeight: 400,
                    display: "flex",
                    flexDirection: "row",
                    overflowY: "auto",
                    background: "#fff"
                }}
            >
                <Row className="flex-grow-1 m-0">
                    <Col
                        md={6}
                        className="d-flex flex-column justify-content-center align-items-center text-center px-5 py-4"
                    >
                        <img src="/NEWBANK.png" width={80} alt="logo" />
                        <h2 className="fw-bold mt-3">¿Quiénes somos?</h2>
                        <p className="mt-3 fs-5 text-secondary">
                            NewBank es una entidad bancaria 100% digital fundada en 2025 en Colombia,
                            comprometida con la innovación, seguridad y accesibilidad financiera.
                            Facilita la gestión de tus finanzas con alta tecnología y completa confianza.
                        </p>
                    </Col>
                    <Col
                        md={6}
                        className="d-flex flex-column justify-content-center align-items-start px-5 py-4"
                        style={{ overflowX: "hidden" }}
                    >
                        <h4 className="fw-bold mb-4">¿Por qué elegir <span className="text-primary">NewBank?</span></h4>
                        <ul className="list-unstyled fs-6 ps-0">
                            <li className="mb-3">
                                <FaRegStar className="text-primary me-2" />
                                <b>Innovador:</b> Transacciones instantáneas y sin costo
                            </li>
                            <li className="mb-3">
                                <FaHandHoldingUsd className="text-success me-2" />
                                <b>Finanzas Claras:</b> Saldo y movimientos siempre al día
                            </li>
                            <li className="mb-3">
                                <FaMobileAlt className="text-info me-2" />
                                <b>Movilidad total:</b> Accede a tu cuenta desde cualquier dispositivo
                            </li>
                            <li className="mb-3">
                                <FaChartLine className="text-secondary me-2" />
                                <b>Estadísticas:</b> Visualiza tu historial y controla tus gastos fácilmente
                            </li>
                            <li>
                                <FaRegSmile className="text-warning me-2" />
                                <b>Soporte humano:</b> Atención inmediata y personalizada
                            </li>
                        </ul>
                        <div
                            className="mt-3 py-2 text-start w-100"
                            style={{ overflowWrap: "break-word", maxWidth: "100%" }}
                        >
                          <span
                              className="badge bg-success fs-6 shadow-sm px-3 py-2"
                              style={{ display: "inline-block", maxWidth: "100%", whiteSpace: "normal" }}
                          >
                            ¡Promoción! Recibe bonificaciones por tus primeras transferencias
                          </span>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default About;
