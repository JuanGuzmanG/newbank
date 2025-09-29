import { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Card, Form, Button, Modal } from "react-bootstrap";

function Transferir() {
    const { token } = useContext(AuthContext);
    const [destinoDocumento, setDestinoDocumento] = useState("");
    const [monto, setMonto] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [modalMsg, setModalMsg] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [modalVariant, setModalVariant] = useState("success");

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3001/api/user/transferir", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ destinoDocumento, monto: parseFloat(monto) }),
        });
        const data = await res.json();
        if (res.ok) {
            setModalTitle("Transferencia exitosa");
            setModalMsg(`Se transfirió $${monto} a ${destinoDocumento}`);
            setModalVariant("success");
            setDestinoDocumento("");
            setMonto("");
        } else {
            setModalTitle("Error");
            setModalMsg(data.error || "Hubo un error en la transferencia");
            setModalVariant("danger");
        }
        setModalShow(true);
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ background: "#f8fafc" }}>
                <Card className="w-100 h-100 p-4"
                      style={{
                          maxWidth: "600px",
                          minHeight: "380px",
                          borderRadius: 20,
                          boxShadow: "0 0 20px rgb(0 0 0 / 0.1)",
                          display: "flex",
                          justifyContent:"center"
                      }}>
                    <Card.Title className="mb-4 text-center fs-3">Enviar Transferencia</Card.Title>
                    <Form onSubmit={onSubmit} className="flex-grow-1 d-flex flex-column justify-content-center">
                        <Form.Group className="mb-3" controlId="destinoDocumento">
                            <Form.Label>Documento destinatario</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ejemplo: 123456789"
                                value={destinoDocumento}
                                onChange={(e) => setDestinoDocumento(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="monto">
                            <Form.Label>Monto a transferir</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ejemplo: 100.00"
                                value={monto}
                                onChange={(e) => setMonto(e.target.value)}
                                required
                                min="0.01"
                                step="0.01"
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary" className="w-100 mt-auto" style={{ borderRadius: "10px" }}>
                            Enviar dinero
                        </Button>
                    </Form>
                </Card>
            </div>
            <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
                <Modal.Header closeButton className={modalVariant === "success" ? "bg-success text-white" : "bg-danger text-white"}>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMsg}</Modal.Body>
                <Modal.Footer>
                    <Button variant={modalVariant} onClick={() => setModalShow(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Transferir;
