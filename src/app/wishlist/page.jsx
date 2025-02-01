"use client";

import Card from '@/component/Card';
import { useApi } from '@/context/Apidata';
import { useCart } from '@/context/CartContext';
import React, { useEffect, useState } from 'react';
const WishlistPage = () => {
  const { wishlist } = useCart();
  console.log('wishlist id ', wishlist)
  // console.log('cart item id', cartItems); // Logging cartItems Map

  const [product, setProduct] = useState([]);
  const { fetchData } = useApi();

  // Fetch product details from API when cartItems change
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (wishlist.length > 0) {
          const productDetails = await Promise.all(
            wishlist.map(async (id) => {
              console.log('fav id', id)
              const data = await fetchData(`/products/${id}`);
              return data;
            })
          );
          setProduct(productDetails);
        }
      } catch (err) {
        console.log('Error fetching product details:', err);
      }
    };

    fetchProductDetails();
  }, [wishlist]);

  console.log(product)

  const handleAddToCart = (item) => {
    toast({
      title: `${item.name} added to cart!`,
      description: `Price: $${item.price}`,
    });
  };

  const handleRemoveFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    toast({
      title: "Item removed from wishlist",
      description: `You have removed item with ID ${id} from your wishlist.`,
    });
  };

  return (
    <div className="bg-white py-8 antialiased dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Wishlist</h2>
        <div className="justify-items-center mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {
            product.map((item) => (
              // <Card key={item.id} product={item} />
              <div className="py-2 bg-transparent" key={item.id}>
                <Card product={item} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
