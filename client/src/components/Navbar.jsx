import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [showDetails, setShowDetails] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const handleStorage = () => setToken(localStorage.getItem('token'));
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const isLoggedIn = !!token;

    const handleProfileClick = () => setShowDetails(prev => !prev);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setShowDetails(false);
        setToken(null);
        navigate('/');
    };

    const handleAppliedJobs = () => navigate('/applied-jobs');

    return (
        <div className='shadow py-4'>
            <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
                <img onClick={() => navigate('/')} className='cursor-pointer' src={assets.logo} alt="Logo" />
                <div className='relative flex items-center gap-4 max-sm:text-xs'>
                    {!isLoggedIn ? (
                        <>
                            <button className='text-gray-800'>Recruiter Login</button>
                            <button
                                className='bg-sky-500 text-white px-6 sm:px-9 py-2 rounded-full'
                                onClick={() => navigate('/auth')}
                            >
                                Login
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleAppliedJobs}
                                className='text-sky-700 font-medium hover:underline border-r-2 border-gray-500 pr-3'
                            >
                                Applied Jobs
                            </button>
                            <div className='relative'>
                                <img
                                    src={assets.profile_img}
                                    alt="Profile"
                                    className='w-10 h-10 rounded-full cursor-pointer'
                                    onClick={handleProfileClick}
                                />
                                {showDetails && (
                                    <div className='absolute right-0 mt-2 w-52 bg-white border rounded shadow p-4 z-10'>
                                        <p className='font-semibold'>Profile</p>
                                        {/* You can fetch and display user info here if needed */}
                                        <button
                                            onClick={handleLogout}
                                            className='text-red-500 hover:underline text-sm'
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;