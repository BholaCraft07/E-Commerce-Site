'use client'
import React, { useState, useEffect } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Link from 'next/link';
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart2 } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { CiSearch } from "react-icons/ci";

import { MdOutlineWbSunny, MdSunny } from "react-icons/md";
import { useTheme } from '@/context/ContextApi';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function Navbar() {
    const pathname = usePathname();
    const navigation = [
        { name: 'Home', href: '/', current: true },
        { name: 'Shop', href: '/shop', current: false },
        { name: 'About', href: '/about', current: false },
        { name: 'Contact Us', href: 'contact', current: false },
    ];
    const [isSearchOpen, setSearchOpen] = useState(false);
    const toggleSearch = () => {
        setSearchOpen(!isSearchOpen);
    };

    const { isDarkMode, toggleDarkMode } = useTheme();

    const { cartItems, wishlist, searchQuery, setSearchQuery } = useCart();

    return (
        <Disclosure as="nav" className="bg-white dark:bg-gray-900 shadow-lg dark:shadow-none sticky top-0 z-[20]">
            <div className="max-w-[1440px] mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 dark:text-gray-200 hover:bg-gray-700 dark:hover:bg-gray-600 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none">
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex items-center sm:items-stretch sm:justify-start gap-4">
                        <div className="flex shrink-0 items-center text-black dark:text-white text-xl font-bold mx-8 sm:mx-0">
                            Logo
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        aria-current={item.href == pathname ? 'page' : undefined}
                                        className={classNames(
                                            item.href == pathname ? 'bg-gray-300 text-black dark:bg-gray-300 dark:text-black' : 'text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-white dark:hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium',
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Responsive Search Bar */}
                    <div className={`flex-1 sm:flex sm:justify-center ${isSearchOpen ? 'block' : 'hidden'}`}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-[60%] md:w-full border-2 rounded-md bg-white dark:bg-gray-800 shadow-sm outline-none text-black dark:text-white border-slate-300 sm:text-sm p-2"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-4">
                        <button
                            onClick={toggleSearch}
                            className="relative rounded-full bg-gray-300 dark:bg-gray-600 p-1 text-gray-900 dark:text-gray-200 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none sm:hidden"
                        >
                            <CiSearch aria-hidden="true" className="size-6" />
                        </button>
                        <Link href='/cart'>
                            <button
                                type="button"
                                className="relative rounded-full bg-gray-300 dark:bg-gray-600 p-2 text-black dark:text-white hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none hidden md:block"
                            >
                                <span className="sr-only">Cart</span>
                                <BsCart2 aria-hidden="true" className="size-6" />
                                {cartItems.size > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{cartItems.size}</span>
                                )}
                            </button>
                        </Link>
                        <Link href={`/wishlist`}>
                            <button
                                type="button"
                                className="relative rounded-full bg-gray-300 dark:bg-gray-600 p-2 text-black dark:text-white hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none hidden md:block"
                            >
                                <span className="sr-only">WishList</span>
                                <GoHeart aria-hidden="true" className="size-6" />
                                {wishlist.length > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{wishlist.length}</span>
                                )}
                            </button>
                        </Link>

                        <div className="position-absolute top-0 left-0  ">
                            <button onClick={toggleDarkMode} className="p-3 cursor-pointer rounded-full bg-gray-200 dark:bg-gray-800 dark:text-white ">
                                {isDarkMode ? <MdOutlineWbSunny /> : <MdSunny />}
                            </button>
                        </div>
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <MenuButton className="relative flex rounded-full bg-gray-300 dark:bg-gray-600 p-2 text-black dark:text-white hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none">
                                    <FaRegCircleUser aria-hidden="true" className="size-6" />
                                </MenuButton>
                            </div>
                            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 text-black dark:text-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-none">
                                <MenuItem className="md:hidden">
                                    <Link href={`/wishlist`}>
                                        <button className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                                            <GoHeart aria-hidden="true" className="size-4" />
                                            WishList
                                        </button>
                                    </Link>
                                </MenuItem>
                                <MenuItem className="md:hidden">
                                    <Link href={`/cart`}>
                                        <button className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                                            <BsCart2 aria-hidden="true" className="size-4" />
                                            Cart
                                        </button>
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                                        Login
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                                        Register
                                    </Link>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as={Link}
                            href={item.href}
                            aria-current={item.href == pathname ? 'page' : undefined}
                            className={classNames(
                                item.href == pathname ? 'bg-gray-900 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                        >

                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>

    );
}

export default Navbar;
