import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function SignUp() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Assuming you want to include this in the signup
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5005/auth/signup', {
        username,
        name,
        email,
        password,
        isAdmin,
      });
      
      // Redirect to login page or home page after successful signup
      navigate('/');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Signup failed');
    }
  };

  return (
    <Container className="my-5">
      <Form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
{/* 
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Sign up as admin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
        </Form.Group> */}

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}

export default SignUp;
