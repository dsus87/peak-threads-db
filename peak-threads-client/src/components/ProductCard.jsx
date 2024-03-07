import { Card, Button } from 'react-bootstrap';

function ProductCard(props) {
    const { product } = props;

    return (
        <Card>
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Img variant="top" src={product.photo} alt={product.name} style={{ maxWidth: "50%", maxHeight: "300px" }} />

                <Card.Text>{product.description}</Card.Text>
                <Card.Text>{product.price}</Card.Text>
                <Button variant="primary">Add to Cart</Button>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
