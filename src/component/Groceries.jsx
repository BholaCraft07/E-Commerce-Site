'use client'
import Card from './Card'
import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './swiper.css';

import { Autoplay, Keyboard, Mousewheel } from 'swiper/modules';
import Link from 'next/link';
import { useApi } from '@/context/Apidata';
import { useCart } from '@/context/CartContext';
function Groceries({ heading, products, catlistname }) {

    const { loading } = useApi();
    const { searchQuery, setSearchQuery } = useCart();

    const [filteredProducts, setFilteredProducts] = useState(products);


    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (searchQuery.trim() == '') {
            setFilteredProducts(products)
        }
        else {
            const product = products.filter((item) => {
                return (
                    item?.title?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
                    item?.description?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
                    item?.category?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
                    item?.brand?.toLowerCase()?.includes(searchQuery.toLowerCase())
                )
            })
            setFilteredProducts(product);
        }

        console.log(filteredProducts)

    }, [searchQuery])

    return (
        <div className="max-w-[1440px] mx-auto px-2 sm:px-6 lg:px-8 mt-4">
            <div className="shadow-sm bg-gray-300 dark:bg-gray-600 p-6 rounded-lg">
                <div className="pb-4 pt-0 flex justify-between items-center">
                    <h1 className="sm:text-3xl text-xl font-bold text-gray-900 dark:text-white">{heading}</h1>
                    <Link
                        href={{
                            pathname: '/shop',
                        }}
                        className="text-sm px-2 py-0 md:py-2 text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                    >
                        View All
                    </Link>
                </div>
                <Swiper

                    mousewheel={true}
                    keyboard={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: true,
                    }}
                    modules={[Autoplay, Keyboard, Mousewheel]}

                    // slidesPerView={4}
                    spaceBetween={30}
                    pagination={{
                        clickable: false,
                    }}
                    breakpoints={{
                        // Less than 640px (default: `sm`)
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        // From 640px (`sm`) to 1024px (`lg`)
                        530: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        // 1024px and above (`lg`)
                        920: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1250: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                    }}
                    className="mySwiper"
                    onSwiper={(swiper) => {
                        const container = swiper.el;
                        container.addEventListener('mouseenter', () => swiper.autoplay.stop());
                        container.addEventListener('mouseleave', () => swiper.autoplay.start());
                    }}
                >

                    {filteredProducts.map((product) => (
                        <SwiperSlide key={product.id}>
                            <Card product={product} />
                        </SwiperSlide>
                    ))}

                </Swiper>

            </div>
        </div>
    )
}

export default Groceries
