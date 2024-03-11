import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Account() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token, userId } = useAuth(); // Access the token and userId from the context

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('name', name);
    if (password) formData.append('password', password);
    if (photo) formData.append('photo', photo);

    if (!userId) {
      setError('User ID is missing. Please log in again.');
      return;
    }

    try {
      await axios.put(`http://localhost:5005/auth/${userId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the request header
        },
      });

      navigate(`/auth/${userId}`); // Redirect on success
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Failed to update profile.');
    }
  };

  return (
    <Container className="my-5">
      <Form onSubmit={handleSubmit}>
        <h2>Update Profile</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>New Password (optional)</Form.Label>
          <Form.Control type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Photo (optional)</Form.Label>
          <Form.Control type="file" onChange={(e) => setPhoto(e.target.files[0])} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>


     

      <Link to="/register-product">Register Product</Link>





    </Container>



  );
}

export default Account;
