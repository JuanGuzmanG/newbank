import { useContext, useEffect, useState } from "react";
import {API_URL, AuthContext} from "../Context/AuthContext";
import { Card, Table } from "react-bootstrap";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

function formatDate(dateStr) {
    if (!dateStr) return "Fecha no disponible";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "Fecha inválida";
    return d.toLocaleDateString("es-CO", { year: "numeric", month: "short", day: "numeric" });
}

function Cuenta() {
    const { token, user } = useContext(AuthContext);
    const [saldo, setSaldo] = useState(0);
    const [movimientos, setMovimientos] = useState([]);

    useEffect(() => {
        async function fetchData() {

            const resSaldo = await fetch(`${API_URL}/api/user/saldo`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (resSaldo.ok) {
                const data = await resSaldo.json();
                setSaldo(typeof data.Saldo === "number" ? data.Saldo : 0);
            }
            const resMov = await fetch(`${API_URL}/api/user/movimientos`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (resMov.ok) {
                const data = await resMov.json();
                setMovimientos(Array.isArray(data) ? data.filter(mov => mov && typeof mov.monto === "number") : []);
            }
        }
        if (token) fetchData();
    }, [token]);

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100" style={{paddingTop: 70}}>
            <div style={{maxWidth: 500, width: "100%"}}>
                <Card className="mb-4 shadow-sm border-0">
                    <Card.Body className="d-flex flex-column align-items-center">
                        <Card.Title className="fs-5 text-muted mb-2">Account Balance</Card.Title>
                        <div className="display-5 fw-bold mb-2" style={{ color: "#002858" }}>
                            ${typeof saldo === "number" ? saldo.toLocaleString("en-US") : "0.00"}
                        </div>
                        <div className="fs-6 text-secondary mt-2">
                            {user && <>Bienvenido {user.nombre} {user.apellido}</>}
                        </div>
                    </Card.Body>
                </Card>
                <Card className="shadow-sm border-0">
                    <Card.Header className="bg-white fs-5 fw-bold">Movimientos</Card.Header>
                    <Card.Body className="p-0">
                        <Table borderless className="mb-0">
                            <tbody>
                            {movimientos.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="text-center text-muted py-4">No hay movimientos recientes</td>
                                </tr>
                            )}
                            {movimientos.map((mov, i) => (
                                <tr key={i} className="align-middle">
                                    <td className="ps-3" style={{ width: 40 }}>
                                        {mov.tipo === "enviado"
                                            ? <FaArrowUp className="text-danger" />
                                            : <FaArrowDown className="text-success" />}
                                    </td>
                                    <td>
                                        <div className="fw-bold">{mov.descripcion || (mov.tipo === "enviado" ? "Transferencia enviada" : "Transferencia recibida")}</div>
                                        <div className="small text-muted">{formatDate(mov.fecha)}</div>
                                    </td>
                                    <td className="pe-3 text-end" style={{ minWidth: 100 }}>
                                        <span style={{ color: mov.tipo === "enviado" ? "#dc3545" : "#198754", fontWeight: "bold" }}>
                                            {mov.tipo === "enviado" ? "-" : "+"}
                                            ${typeof mov.monto === "number" ? mov.monto.toLocaleString("en-US") : "0.00"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Cuenta;
