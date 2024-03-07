import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

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
            <h1 align="center" className='p-4 mb-3'>Welcome to the store</h1>
            <br></br>
            <Row xs={1} md={3} className='g-4'>
                {products.map((product, index) => (
                    <Col key={index} align="center">
                        <ProductCard product={product}/>
                
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Store;
