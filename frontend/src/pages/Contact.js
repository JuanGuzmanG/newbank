import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 p-3" style={{ background: "#f0f2f5" }}>
            <Card className="w-100" style={{ maxWidth: 600, borderRadius: 20, boxShadow: "0 0 24px rgba(0,0,0,0.1)" }}>
                <Card.Body>
                    <div className="text-center mb-4">
                        <img src="/NEWBANK.png" width={80} alt="logo" />
                        <h2 className="fw-bold mt-3">Contáctanos</h2>
                        <p className="text-secondary">
                            Nuestro equipo está listo para ayudarte. Comunícate con nosotros por cualquiera de los siguientes medios:
                        </p>
                    </div>
                    <Row className="text-start">
                        <Col xs={12} className="mb-3 d-flex align-items-center">
                            <FaPhone className="me-3 text-primary" size={24} />
                            <span><b>Teléfono:</b> 01-8000-123-456</span>
                        </Col>
                        <Col xs={12} className="mb-3 d-flex align-items-center">
                            <FaEnvelope className="me-3 text-primary" size={24} />
                            <span><b>Email:</b> soporte@newbank.com</span>
                        </Col>
                        <Col xs={12} className="mb-3 d-flex align-items-center">
                            <FaMapMarkerAlt className="me-3 text-primary" size={24} />
                            <span><b>Dirección:</b> Calle 123 #45-67, Bogotá, Colombia</span>
                        </Col>
                    </Row>
                    <div className="text-center mt-4 text-muted small">
                        © NewBank 2025. Todos los derechos reservados.
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Contact;
