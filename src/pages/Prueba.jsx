import React, { useState } from 'react';
//import '../styles/login.css';
import { RequestPostLogin } from '../requests/Administrator.request';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Prueba() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("CURRENT DATA:", email, password);

  function Login(email, password) {
    console.log("LOGINSUBI", email, password);
    const user = {
      email: email,
      password: password
    }
    RequestPostLogin(user)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}

  return (
    <Form onSubmit={() => Login(email, password)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.currentTarget.value)}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  onChange={(e) => setPassword(e.currentTarget.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
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