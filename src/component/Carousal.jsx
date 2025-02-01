
'use client'
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './swiper.css';

import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { useApi } from '@/context/Apidata';
import ShimmerCard from '@/Shimmer/ShimmerCard';

export default function Carousal() {
  const { loading } = useApi();
  return (
    <div className="h-[300px] max-w-[1440px] mx-auto px-2 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      {
        loading ?
          <ShimmerCard className="h-[300px] lg:w-[1280px] md:w-[640px] w-[400px] bg-gray-500" />
          : (<Swiper
            cssMode={true}
            navigation={true}
            mousewheel={true}
            keyboard={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}

            spaceBetween={30}
            centeredSlides={true}

            pagination={{
              clickable: true,
            }}

            className="mySwiper"
          >

            {Array.from({ length: 20 }, (_, i) => (
              <SwiperSlide key={i}>
                <img src={`https://picsum.photos/${1400 + i}/300`} alt={`Slide ${i + 1}`} />
              </SwiperSlide>
            ))
            }

          </Swiper>)
      }
    </div>
  );
}
