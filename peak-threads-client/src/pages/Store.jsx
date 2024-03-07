import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

function Store() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5005/products/products'); 

            setProducts(response.data);
        } catch (error) {
            console.error("There was an error fetching the products: ", error);
        }
    };

    // useEffect to run fetchProducts on component 
    useEffect(() => {
        fetchProducts();
    }, []); 

    return (
        <>
            <h1>Welcome to the store</h1>
            <Row xs={1} md={3} className='g-4'>
                {products.map((product, index) => (
                    <Col key={index} align="center">
                        <h2>{product.name}</h2>
                        <img src={product.photo} alt={product.name} style={{maxWidth: "40%", maxHeight: "300px"}} />
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Store;
