
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RiEyeCloseFill, RiEyeCloseLine } from "react-icons/ri";
import { useCart } from "@/context/CartContext";
import Portal from "@/Portal/Portal";
import { useApi } from "@/context/Apidata";
import ShimmerCard from "@/Shimmer/ShimmerCard";

function Card({ product }) {
    const { addToCart, addFav, removeFav, wishlist } = useCart();
    const [showFavmessage, setFavmessage] = useState(false);

    const totalStars = 5;
    const filledStars = Math.max(0, Math.floor(product.rating));
    const halfStar = product.rating % 1 !== 0;
    const emptyStars = Math.max(0, totalStars - filledStars - (halfStar ? 1 : 0));


    if (filledStars < 0 || emptyStars < 0 || !Number.isInteger(filledStars) || !Number.isInteger(emptyStars)) {
        console.error("Invalid rating value");
        return null; // or return a default value
    }

    const exchangeRate = 82;

    // Convert price to INR and format as per Indian numbering system
    const priceInINR = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(product.price * exchangeRate);

    const [view, setView] = useState(true);
    const handleView = () => {
        setView(!view);
    }
    const isFavourite = wishlist.includes(product.id)
    const handleFav = () => {

        if (!isFavourite) {
            addFav(product.id)
            setFavmessage(true);
        }
        else {
            removeFav(product.id)
        }
    }

    //here i use cart context to add item in cart


    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleAddToCart = () => {
        addToCart(product.id);

        setShowSuccessMessage(true);
    };

    useEffect(() => {
        if (showSuccessMessage) {
            const timeoutId = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 2000);
            return () => clearTimeout(timeoutId);
        }
        if (showFavmessage) {
            const timeoutId = setTimeout(() => {
                setFavmessage(false);
            }, 2000);
            return () => clearTimeout(timeoutId);
        }
    }, [showSuccessMessage, showFavmessage]);

    // console.log('poduct id is:', product.id)

    //here i want to use portal 
    const { loading } = useApi();

    return (
        <div className="w-[250px] md:w-[300px]  object-contain bg-gray-800 border border-gray-700 rounded-lg shadow-md dark:border-gray-600 relative">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                {
                    loading ?
                        <ShimmerCard className="sm:h-56 h-40 w-[200px] md:w-[250px] bg-red-500" /> :
                        (<div className="sm:h-56 h-40 w-full">
                            <Link href={`/product/${product.id}`}>
                                <img className="mx-auto h-full" src={product.thumbnail} alt="" />
                            </Link>
                        </div>)
                }
                <div className="sm:pt-6 pt-2">
                    <div className="sm:mb-4 mb-2 flex items-center justify-between gap-4">
                        <span className={`me-2 rounded bg-primary-300 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-white ${view ? 'block' : 'hidden'}`}> Up to 35% off </span>

                        <div className="flex items-center justify-end gap-1">
                            <button type="button" data-tooltip-target="tooltip-quick-look" className="rounded-lg p-2 text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer" onClick={handleView}>
                                <span className="sr-only"> Quick look </span>
                                {/* <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                    <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg> */}
                                <RiEyeCloseFill className={`h-5 w-5 ${view ? 'block' : 'hidden'}`} />
                                <RiEyeCloseLine className={`h-5 w-5 ${view ? 'hidden' : 'block'}`} />
                            </button>
                            <div id="tooltip-quick-look" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">
                                Quick look
                                <div className="tooltip-arrow" data-popper-arrow=""></div>
                            </div>

                            <button type="button" data-tooltip-target="tooltip-add-to-favorites" className="cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={handleFav}>
                                <span className="sr-only"> Add to Favorites </span>
                                {/* <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={addfaverouite ? "bg-red-500" : "none"} viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
                                </svg> */}
                                <svg className="h-8 w-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={isFavourite ? "#ff3232" : "none"} viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
                                </svg>
                            </button>
                            <div id="tooltip-add-to-favorites" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">
                                Add to favorites
                                <div className="tooltip-arrow" data-popper-arrow="">Add to WishList</div>
                            </div>
                        </div>
                    </div>

                    <Link href={`/product/${product.id}`}>
                        <p className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{product.title}</p>
                    </Link>

                    <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center">
                            {product.rating && Array(filledStars)
                                .fill()
                                .map((_, index) => (
                                    <svg
                                        key={index}
                                        className="w-5 h-5 text-yellow-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                ))}
                            {halfStar && (
                                <svg
                                    className="w-5 h-5 text-yellow-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 20"
                                >
                                    <path d="M12 16.5l4.518 2.375c.484.255 1.063-.15.974-.695l-.863-5.03 3.656-3.563c.403-.392.18-1.084-.387-1.171l-5.051-.734-2.259-4.577c-.224-.455-.871-.455-1.095 0L8.051 7.116l-5.051.734c-.567.087-.79.78-.387 1.171l3.656 3.563-.863 5.03c-.089.545.49.95.974.695L12 16.5z" />
                                </svg>
                            )}
                            {Array(emptyStars)
                                .fill()
                                .map((_, index) => (
                                    <svg
                                        key={index + filledStars + 1}
                                        className="w-5 h-5 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                ))}
                        </div>

                        <p className="text-sm font-medium text-gray-900 dark:text-white">{product.rating}</p>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{`(${product.reviews ? product.reviews.length : 5})`}</p>
                    </div>

                    <ul className="sm:mt-2 mt-[3px] flex items-center gap-4">
                        <li className="flex items-center gap-2">
                            <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                            </svg>
                            <p className="sm:text-sm text-[12px] text-gray-500 dark:text-gray-400">Fast Delivery</p>
                        </li>

                        <li className="flex items-center gap-2">
                            <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                            </svg>
                            <p className="sm:text-sm text-[12px] font-medium text-gray-500 dark:text-gray-400">Best Price</p>
                        </li>
                    </ul>

                    <div className="mt-4 flex items-center justify-between sm:gap-2 gap-1">
                        <p className="sm:text-xl text-md font-extrabold leading-tight text-gray-900 dark:text-white">{priceInINR}</p>

                        <button type="button" className="inline-flex cursor-pointer items-center rounded-lg bg-blue-500 md:px-5 px-2 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleAddToCart}>
                            <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                            </svg>
                            Add to cart
                        </button>
                        {showSuccessMessage && (
                            <Portal>
                                <div className="fixed sm:w-sm w-[10rem]  top-2 right-14 z-50">
                                    <div className="bg-green-400 text-white sm:p-4 p-1 rounded-lg shadow-lg">
                                        <p className="font-semibold">Item added to cart successfully!</p>
                                    </div>
                                </div>
                            </Portal>
                        )}
                        {showFavmessage && (
                            <Portal>
                                <div className="fixed sm:w-sm w-[10rem]  top-2 right-14 z-50">
                                    <div className="bg-red-400 text-white sm:p-4 p-1  rounded-lg shadow-lg">
                                        <p className="font-semibold">Item added to wishist successfully!</p>
                                    </div>
                                </div>
                            </Portal>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
