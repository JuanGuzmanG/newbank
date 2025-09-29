import { Form, Button, Card } from "react-bootstrap";
import {AuthContext} from "../Context/AuthContext";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";

function Login() {

    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            await login(email, password);
            navigate("/");
        } catch(err){
            alert("Login failed: " + err.message);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: '350px', borderRadius: '20px', boxShadow: '0px 0px 24px #ddd'}}>
                <Card.Body>
                    <div className="text-center mb-4">
                        <img src="/NEWBANK.png" alt="Logo" width={40} className="mb-2"/>
                        <h3 className="fw-bold">NewBank</h3>
                    </div>
                    <Form onSubmit={onSubmit}>
                        <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                        <Button type="submit" variant="primary" className="w-100" style={{borderRadius: '10px'}}>Log in</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
export default Login;
