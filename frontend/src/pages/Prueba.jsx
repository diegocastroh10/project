import React, {useState} from 'react';
import '../styles/login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { urlUserLogin, RequestPostLogin } from "../requests/Administrator.request";

function Prueba({setToken, setIsLogin}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        login({
            email: email,
            password: password
        })
    };

    const login = (user) => {
        fetch(urlUserLogin, RequestPostLogin(user))
            .then(res => res.json())
            .then(data => loginConclusion(data))
            .catch(error => console.log("ERROR:", error))
    }

    const loginConclusion = (res) => {
        if(res.status === 200){
            localStorage.setItem('token', res.data.token);
            console.log("SAVED");
            setToken(res.data.token);
            setIsLogin(true);
        }
        setEmail('');
        setPassword('');
    }

    return (
        <Form onSubmit={handleSubmit} className="loginForm">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" required placeholder="Enter email" value={email} onChange={(e) => setEmail(e.currentTarget.value)}/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default Prueba;


/*
    RequestPostLogin(user)
    .then(response => response.json())
    .then(data => console.log("AUTH:", data));
    */