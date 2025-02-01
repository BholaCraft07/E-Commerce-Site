'use client'
import { useCart } from '@/context/CartContext';
import Portal from '@/Portal/Portal';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react'
import { MdOutlineShoppingBag } from 'react-icons/md';

function CartCard({ product }) {
    // const { removeFromCart, quantity, cartTotal, setQuantity } = useCart();
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
    const quantity = cartItems.get(product.id);
    // const quantity = cartItem ? cartItem.quantity : 1;

    useEffect(() => {
        // Re-render the component when the cart state changes
        console.log('Cart state changed:', cartItems);
    }, [cartItems, removeFromCart, updateQuantity]);


    const exchangeRate = 82;

    // Convert price to INR and format as per Indian numbering system
    // const priceInINR = new Intl.NumberFormat('en-IN', {
    //     style: 'currency',
    //     currency: 'INR',
    //     maximumFractionDigits: 0,
    // }).format(product.price * exchangeRate);

    // const[price,setPrice]=useState(priceInINR);
    // setPrice(
    // price=quantity*priceInINR'
    // )

    const formatter = useMemo(() => new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }), []);

    const totalPrice = useMemo(() => {
        return formatter.format(product.price * exchangeRate * quantity);
    }, [product.price, exchangeRate, quantity, formatter]);


    //here also implement to show pop up when we remove item from cart
    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleRemoveToCart = () => {
        removeFromCart(product.id);
        setSuccessMessage('Item added to cart successfully!');
        setShowSuccessMessage(true);
    };

    useEffect(() => {
        if (showSuccessMessage) {
            const timeoutId = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 2000);
            return () => clearTimeout(timeoutId);
        }
    }, [showSuccessMessage]);
    console.log(product.id)
    return (
        <div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <Link href={`/product/${product.id}`} className="shrink-0 md:order-1">
                        <img className="h-20 w-20 dark:hidden" src={product.thumbnail} alt="imac image" />
                        <img className="hidden h-20 w-20 dark:block" src={product.thumbnail} alt="imac image" />
                    </Link>

                    <label for="counter-input" className="sr-only">Choose quantity:</label>
                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex flex-col item-center justify-center">
                            <span className="text-gray-900 dark:text-white font-semibold px-4 py-2">Quantity</span>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => updateQuantity(product.id, Math.max(1, quantity - 1))}
                                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-300 dark:bg-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                >
                                    -
                                </button>
                                <span className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white">{quantity}</span>
                                <button
                                    onClick={() => updateQuantity(product.id, quantity + 1)}
                                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-300 dark:bg-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900 dark:text-white">{totalPrice}

                            </p>
                        </div>
                    </div>

                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <Link href={`/product/${product.id}`} className="text-base font-medium text-gray-900 hover:underline dark:text-white py-2">
                            <h3 className='text-lg font-bold'>{product.title}</h3>
                            <p className='text-sm text-gray-600 dark:text-gray-300 py-2'>{product.description
                            }</p>
                        </Link>

                        <div className="flex items-center gap-4">
                            <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                                <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                </svg>
                                Add to Favorites
                            </button>

                            <button type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500 cursor-pointer " onClick={handleRemoveToCart}>
                                <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                </svg>


                                Remove
                            </button>
                            
                        </div>
                        {showSuccessMessage && (
                            <Portal>
                                <div className="fixed top-2 right-14 z-50">
                                    <div className="bg-green-400 text-white p-4 rounded-lg shadow-lg">
                                        <p className="font-semibold">Item remove to cart successfully!</p>
                                    </div>
                                </div>
                            </Portal>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartCard