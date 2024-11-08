'use client'
import AuthModal from '@/components/auth/userauth';
import React, { useEffect, useState } from 'react';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import LogoutAlert from '../logoutalert';
import Link from 'next/link';


const UserNavbar: React.FC = () => {
    const { refreshToken, Token } = useSelector((state: RootState) => state.user);


    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (refreshToken && Token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [refreshToken, Token]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalValue, setModalValue] = useState('');
    const [modalIndex, setModalIndex] = useState(0);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleModalChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setModalValue(e.target.value);
        setModalIndex(index);
    };

    const handleLogout = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        localStorage.removeItem('Token');
        localStorage.removeItem('refreshToken');

        window.location.href = '/';

    };

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900 px-8 ">
                <div className="max-w-screen-xxl flex flex-wrap items-center justify-between p-7">
                    <a href="/user" className="flex items-center space-x-4 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">f-arc</span>
                    </a>
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src="/images/userimg.jpg" alt="user photo" />
                        </button>
                        <div className="z-50 hidden my-3 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">

                            <ul className="py-2" aria-labelledby="user-menu-button">

                                <li>
                                    {isLoggedIn ? (
                                        <a
                                            role="button"

                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                                        >
                                            <LogoutAlert Logout={handleLogout} />
                                        </a>
                                    ) : (
                                        <a
                                            role="button"
                                            onClick={openModal}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                                        >
                                            Login
                                        </a>
                                    )}
                                </li>
                            </ul>

                        </div>
                        <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                {/* <a href="/" className="" >Home</a> */}
                                <Link className='block py-2 px-3  text-gray-900 ' aria-current="page" href="/">Home</Link>
                            </li>
                            <li>
                                <a href=" #" className="block py-2 px-3 text-gray-900 ">About</a>
                            </li>
                            <li>
                                <a href="/services" className="block py-2 px-3 text-gray-900 ">Services</a>
                            </li>
                            <li>
                                {/* <a href="#" className="block py-2 px-3 text-gray-900 ">Projects</a> */}
                                <Link className='block py-2 px-3  text-gray-900 ' aria-current="page" href="/projects">Projects</Link>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 ">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <AuthModal isOpen={isModalOpen} onClose={closeModal} value={modalValue} index={modalIndex} onChange={handleModalChange} />
            </nav>
        </>
    );
}

export default UserNavbar;
