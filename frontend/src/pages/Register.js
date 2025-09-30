import { useState } from "react";
import { Form, Button, Card, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {API_URL} from "../Context/AuthContext";

function Register() {
    const [form, setForm] = useState({ documento: "", nombre: "", apellido: "", email: "", password: ""});
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API_URL}/api/auth/registro`, { method: "POST", headers: { "Content-Type":"application/json" }, body: JSON.stringify(form)});
        const data = await res.json();
        if (res.ok) {
            setShow(true); // muestra modal
        } else {
            alert(data.error || "Error al registrar");
        }
    };

    const handleClose = () => {
        setShow(false);
        navigate("/login");
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <Card style={{ width: '350px', borderRadius: '20px', boxShadow: '0px 0px 24px #ddd'}}>
                    <Card.Body>
                        <div className="text-center mb-4">
                            <img src="/NEWBANK.png" alt="Logo" width={40} className="mb-2"/>
                            <h3 className="fw-bold">Crear Cuenta</h3>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" name="documento" placeholder="Documento" value={form.documento} onChange={onChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={onChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" name="apellido" placeholder="Apellido" value={form.apellido} onChange={onChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="email" name="email" placeholder="Email" value={form.email} onChange={onChange} required />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Control type="password" name="password" placeholder="Contraseña" value={form.password} onChange={onChange} required />
                            </Form.Group>
                            <Button type="submit" variant="primary" className="w-100" style={{borderRadius: '10px'}}>Registrarse</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Registro exitoso</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tu cuenta fue creada correctamente, ya puedes iniciar sesión.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>Aceptar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Register;
