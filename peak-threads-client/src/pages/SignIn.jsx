import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext'; 
import { Link } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure the login method

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5005/auth/login', { email, password });
      
      // Assuming the backend now includes `userId` in the login response along with the authToken
      const { authToken, userId, isAdmin } = response.data;
      
      // Updated login call to include both the authToken and userId
      login(authToken, userId, isAdmin);  // Make sure your login function in AuthContext is adjusted to accept these parameters
      
      navigate('/'); // Redirect to the profile page or another route of your choosing upon successful login
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Login failed');
    } 
  }

  return (
    <Container className="my-5">
      <Form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

        
      </Form>

      <div className="mt-3">
          Don't have an account? <Link to="/auth/signup">Sign up here</Link>
        </div>
    </Container>
  );
}

export default SignIn;
