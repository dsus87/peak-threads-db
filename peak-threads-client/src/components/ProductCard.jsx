import { Card, Button } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';

function ProductCard(props) {
    const { product } = props;
    const cart = useContext(CartContext);

    const productQuantity = cart.getProductQuantity(product._id);
    
    console.log(cart.items); 
    return (
        <Card>
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Img variant="top" src={product.photo} alt={product.name} style={{ maxWidth: "50%", maxHeight: "300px" }} />
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Price: {product.price}</Card.Text>
                {productQuantity > 0 && (
                    <Card.Text>Quantity in Cart: {productQuantity}</Card.Text>
                )}
                <Button variant="primary" onClick={() => cart.addOneToCart(product._id)}>Add to Cart</Button>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
