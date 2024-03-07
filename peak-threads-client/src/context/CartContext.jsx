import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {}
});

export const CartProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5005/products/products');
                const mappedProducts = response.data.map(product => ({
                    ...product,
                    id: product._id, // Ensure each product has an 'id' field
                }));
                setProducts(mappedProducts);
            } catch (error) {
                console.error("There was an error fetching the products: ", error);
            }
        };
        fetchProducts();
    }, []);

    const getProductQuantity = productId => {
        const product = items.find(product => product._id === productId);
        return product ? product.quantity : 0;
    };

    const addOneToCart = _id => {
        const quantity = getProductQuantity(_id);
        if (quantity === 0) {
            setItems(prevItems => [
                ...prevItems,
                { _id: _id, quantity: 1 } // Use _id for consistency
            ]);
        } else {
            setItems(items =>
                items.map(product =>
                    product._id === _id ? { ...product, quantity: product.quantity + 1 } : product
                )
            );
        }
    };

    const removeOneFromCart = _id => {
        const quantity = getProductQuantity(_id);
        if (quantity === 1) {
            deleteFromCart(_id);
        } else {
            setItems(
                items.map(product =>
                    product._id === _id ? { ...product, quantity: product.quantity - 1 } : product
                )
            );
        }
    };

    const deleteFromCart = _id => {
        setItems(items.filter(currentProduct => currentProduct._id !== _id));
    };

    const getTotalCost = () => {
        return items.reduce((totalCost, cartItem) => {
            const productData = products.find(product => product._id === cartItem._id);
            return productData ? totalCost + productData.price * cartItem.quantity : totalCost;
        }, 0);
    };

    const contextValue = {
        items,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
