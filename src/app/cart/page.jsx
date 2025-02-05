'use client'
import CartCard from '@/component/CartCard'
import { useApi } from '@/context/Apidata';
import { useCart } from '@/context/CartContext'
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react'
import { MdOutlineShoppingBag } from 'react-icons/md';

function Cart() {
  const { cartItems, addToCart, removeFromCart, updateQuantity, cartTotal, setCartTotal } = useCart();
  // console.log('cart item id', cartItems); // Logging cartItems Map

  const [product, setProduct] = useState([]);
  const { fetchData } = useApi();

  // Fetch product details from API when cartItems change
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (cartItems.size > 0) {  // Ensure cartItems is not empty
          const productDetails = await Promise.all(
            Array.from(cartItems.keys()).map(async (itemId) => {
              const data = await fetchData(`/products/${itemId}`);
              return data;
            })
          );
          setProduct(productDetails); // Update the state with the array of products
        }
      } catch (err) {
        console.log('Error fetching product details:', err);
      }
    };

    fetchProductDetails();
  }, [cartItems]);



  const exchangeRate = 82;

  // Calculate total price using cartItems and product list
  const totalPrice = useMemo(() => {
    return product.reduce((total, item) => {
      const quantity = cartItems.get(item.id) || 1; // Default to 1 if undefined
      return total + item.price * exchangeRate * quantity;
    }, 0);
  }, [product, cartItems]);

  setCartTotal(new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(totalPrice))

  console.log(cartTotal)
  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {
                product.map((item) => (
                  <CartCard key={item.id} product={item} />
                ))
              }
            </div>
          </div>
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">{new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                      maximumFractionDigits: 0,
                    }).format(totalPrice)}</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                    <dd className="text-base font-medium text-green-600">0</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">not availbale</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">20%</dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">{new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 0,
                  }).format(totalPrice)}</dd>
                </dl>
              </div>

              {
                cartItems.size > 0 &&(
                  <Link href="/payment" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-gray-600 dark:text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</Link>
                )
              }

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                <Link href="/shop" title="" className="inline-flex items-center gap-2 text-sm font-medium  text-green-600 hover:underline dark:text-green-500 cursor-pointer">
                  <MdOutlineShoppingBag />Continue Shopping
                  <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <form className="space-y-4">
                <div>
                  <label for="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Do you have a voucher or gift card? </label>
                  <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                </div>
                <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Apply Code</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart