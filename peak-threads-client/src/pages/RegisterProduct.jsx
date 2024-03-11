import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';


const RegisterProduct = () => {
      // State variables for product information

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [gender, setGender] = useState('Unisex');
  const [category, setCategory] = useState('Outerwear');
  const [quantity, setQuantity] = useState('');
  const [photo, setPhoto] = useState(null);
  const [brand, setBrand] = useState('');
  const [quantityS, setQuantityS] = useState(0);
  const [quantityM, setQuantityM] = useState(0);
  const [quantityL, setQuantityL] = useState(0);

  // State variables for form handling
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get user context and navigation functionality
  const { token, userId,isAdmin } = useAuth(); 
  const navigate = useNavigate();

  console.log("isAdmin before request:", isAdmin);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin) {
      setError('Only admins are allowed to register a product.');
      return; // Stop the form submission if not an admin
    }

    setIsLoading(true);


    try {
      const formData = new FormData();
      formData.append('name', name);   
      formData.append('description', description);
      formData.append('price', price);
      formData.append('gender', gender);
      formData.append('category', category);
      formData.append('quantity[S]', quantityS);
      formData.append('quantity[M]', quantityM);
      formData.append('quantity[L]', quantityL);
      formData.append('photo', photo);
      formData.append('brand', brand);

      formData.append('photo', photo);
      formData.append('brand', brand);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Include authorization token
          'Content-Type': 'multipart/form-data', // Necessary for image upload
        },
      };

      const response = await axios.post(
        `http://localhost:5005/products/${userId}/register-products`,
        formData,
        config
      );

      console.log(response.data);
      setIsLoading(false);
      navigate('/'); // Redirect to products list on success
    } catch (error) {
      console.error('Error registering product:', error);
      setIsLoading(false);
      setError('Failed to register product. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register Product</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>

<form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="name">Product Name:</label>
    <input 
      type="text" 
      id="name" 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
      required 
    />
  </div>

  <div className="form-group">
    <label htmlFor="description">Description:</label>
    <textarea 
      id="description" 
      value={description} 
      onChange={(e) => setDescription(e.target.value)} 
      required 
    />
  </div>

  <div className="form-group">
    <label htmlFor="price">Price:</label>
    <input 
      type="number" 
      id="price" 
      value={price} 
      onChange={(e) => setPrice(e.target.value)} 
      required 
    />
  </div>

  <div className="form-group">
    <label htmlFor="gender">Gender:</label>
    <select 
      id="gender" 
      value={gender} 
      onChange={(e) => setGender(e.target.value)}
    >
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Unisex">Unisex</option>
    </select>
  </div>
  
  <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select 
            id="category" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Shoes">Shoes</option>
            <option value="T-shirt">T-shirt</option>
            <option value="Outerwear">Outerwear</option>
          </select>
        </div>


  <div className="form-group">
    <label htmlFor="brand">Brand</label>
    <input 
      id="brand" 
      value={brand} 
      onChange={(e) => setBrand(e.target.value)} 
      required 
    />
 </div>




   {/* Quantity fields for sizes S, M, L */}
   <div className="form-group">
          <label htmlFor="quantityS">Quantity S:</label>
          <input
            type="number"
            id="quantityS"
            value={quantityS}
            onChange={(e) => setQuantityS(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantityM">Quantity M:</label>
          <input
            type="number"
            id="quantityM"
            value={quantityM}
            onChange={(e) => setQuantityM(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantityL">Quantity L:</label>
          <input
            type="number"
            id="quantityL"
            value={quantityL}
            onChange={(e) => setQuantityL(e.target.value)}
            required
          />
        </div>

  <div className="form-group">
    <label htmlFor="photo">Photo:</label>
    <input 
      type="file" 
      id="photo" 
      accept="image/*" 
      onChange={(e) => setPhoto(e.target.files[0])} 
    />
  </div>


</form>


        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register Product'}
        </button>
      </form>
    </div>
  );
};

export default RegisterProduct;
