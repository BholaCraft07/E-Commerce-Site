'use client';
const { createContext, useState, useContext, useEffect } = require("react");

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Using a Map to store the cart items with the productId as the key and quantity as the value
    const [cartItems, setCartItems] = useState(new Map());
    const [cartTotal, setCartTotal] = useState(0); // Total cart value

    // search functionality
    const[searchQuery,setSearchQuery]=useState('');


    //this varibale is use for adding wishlist
    const [wishlist, setWishlist] = useState([]);
    const addFav = (id) => {
        if (typeof id !== 'number' && typeof id !== 'string') {
            throw new Error('Product ID must be a number or string');
        }
        setWishlist((prev) => {
            if (!prev.includes(id)) {
                return [...prev, id];
            }
            return prev;
        });
    };

    const removeFav = (id) => {
        if (typeof id !== 'number' && typeof id !== 'string') {
            throw new Error('Product ID must be a number or string');
        }
        setWishlist((prev) => prev.filter((item) => item !== id));
    };

    // Add item to cart
    const addToCart = (productId) => {
        setCartItems(prevItems => {
            const updatedItems = new Map(prevItems);

            if (updatedItems.has(productId)) {
                updatedItems.set(productId, updatedItems.get(productId) + 1);
            } else {
                updatedItems.set(productId, 1);
            }
            return updatedItems;
        });
    };


    const removeFromCart = (productId) => {
        setCartItems(prevItems => {
            const updatedItems = new Map(prevItems);
            if (updatedItems.has(productId)) {
                updatedItems.set(productId, updatedItems.get(productId) - 1);
                if (updatedItems.get(productId) === 0) {
                    updatedItems.delete(productId);
                }
            }
            return updatedItems;
        });
    };

    // Update quantity for an item
    const updateQuantity = (productId, newQuantity) => {
        setCartItems(prevItems => {
            const updatedItems = new Map(prevItems);
            const val = cartItems.get(productId)
            console.log('quna ', val)
            // Check if newQuantity is empty or not a valid number
            if (newQuantity === "" || isNaN(newQuantity) || newQuantity <= 0 || val < 1 || cartItems.size === 0) {
                // If newQuantity is empty or not a valid number or is zero or less, remove the item
                updatedItems.delete(productId);
            } else {
                // If the item exists, update its quantity
                if (updatedItems.has(productId)) {
                    updatedItems.set(productId, newQuantity);
                } else {
                    // If the item does not exist, add it with the given quantity
                    updatedItems.set(productId, newQuantity);
                }
            }

            // If the updatedItems map is empty, return an empty map
            if (updatedItems.size === 0) {
                return new Map();
            }

            return updatedItems;
        });
    };


    useEffect(() => {
        // Recalculate total whenever cartItems change
        setCartTotal()
    }, [cartItems]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartTotal, setCartTotal, addFav, removeFav, wishlist,searchQuery,setSearchQuery}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
