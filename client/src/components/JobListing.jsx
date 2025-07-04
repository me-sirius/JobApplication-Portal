import React from 'react'
import { useContext, useState, useEffect } from "react";
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets';
import JobCard from './JobCard';
import { use } from 'react';

const JobListing = () => {
    const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);

    const [showFilters, setShowFilters] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedLocations, setSelectedLocations] = useState([])

    const [filteredJobs, setFilteredJobs] = useState(jobs)

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(cat => cat !== category);
            } else {
                return [...prev, category];
            }
        });
    };

    const handleLocationChange = (location) => {
        setSelectedLocations(prev => {
            if (prev.includes(location)) {
                return prev.filter(loc => loc !== location);
            } else {
                return [...prev, location];
            }
        });
    };

    useEffect(() => {
        const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category);
        const matchesLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location);

        const matchesTitle = job => {
            if (searchFilter.title) {
                return job.title.toLowerCase().includes(searchFilter.title.toLowerCase());
            }
            return true;
        }
        const matchesSearchLocation = job => {
            if (searchFilter.location) {
                return job.location.toLowerCase().includes(searchFilter.location.toLowerCase());
            }
            return true;
        }

        const newFilteredJobs = jobs.slice().reverse().filter(job =>
            matchesCategory(job) &&
            matchesLocation(job) &&
            matchesTitle(job) &&
            matchesSearchLocation(job)
        );

        setFilteredJobs(newFilteredJobs);
        setCurrentPage(1); // Reset to first page when filters change
    },[jobs, selectedCategories, selectedLocations, searchFilter]);

    return (
        <div className='container px-4 lg:px-6 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-10'>
            {/* SideBar */}
            <div className='w-full lg:w-1/4 bg-white px-4'>
                {/* Search Filter from Hero Comp */}
                {
                    isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                        <>
                            <h3 className='font-medium text-lg mb-4'>Current Search</h3>
                            <div className='mb-4 text-gray-500'>
                                {searchFilter.title && (
                                    <span className='inline-flex items-center gap-2.5 bg-blue-100 border border-blue-400 px-4 py-1 rounded-full text-sm'>
                                        {searchFilter.title}
                                        <img onClick={e => setSearchFilter(prev => ({ ...prev, title: "" }))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                    </span>
                                )}
                                {searchFilter.location && (
                                    <span className='ml-2 inline-flex items-center gap-2.5 bg-red-100 border border-red-500 px-4 py-1 rounded-full text-sm'>
                                        {searchFilter.location}
                                        <img onClick={e => setSearchFilter(prev => ({ ...prev, location: "" }))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                    </span>
                                )}
                            </div>
                        </>
                    )
                }

                <button onClick={e => setShowFilters(prev => !prev)} className='px-6 py-1.5 rounded border border-gray-400 lg:hidden'>
                    {showFilters ? "Close" : "Filters"}
                </button>

                {/* Category Filter */}
                <div className={showFilters ? "" : "max-lg:hidden"}>
                    <h4 className='font-medium text-lg py-4'>Search by categories</h4>
                    <ul className='space-y-4 text-gray-500'>
                        {
                            JobCategories.map((category, index) => (
                                <li className='flex items-center gap-3 my-2' key={index}>
                                    <input className='scale-125' type="checkbox" onChange={() => handleCategoryChange(category)} checked={selectedCategories.includes(category)} />
                                    {category}
                                </li>
                            ))
                        }
                    </ul>
                </div>

                {/* Location Filter */}
                <div className={showFilters ? "" : "max-lg:hidden"}>
                    <h4 className='font-medium text-lg py-4 pt-12'>Search by Locations</h4>
                    <ul className='space-y-4 text-gray-500'>
                        {
                            JobLocations.map((location, index) => (
                                <li className='flex items-center gap-3 my-2' key={index}>
                                    <input className='scale-125' type="checkbox" onChange={() => handleLocationChange(location)} checked={selectedLocations.includes(location)} />
                                    {location}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>

            {/* Job listings */}
            <section className='w-full lg:w-3/4 bg-white text-gray-800 max-lg:px-4'>
                <h3 className='font-medium text-3xl py-2' id='job-list'>Latest Jobs</h3>
                <p className='mb-8'>Get your desired job from top companies</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                        <JobCard key={index} job={job} />
                    ))}
                </div>

                {/* Pagenation */}
                {filteredJobs.length > 0 && (
                    <div className='flex items-center justify-center space-x-2 mt-10'>
                        <a href="#job-list">
                            <img onClick={() => setCurrentPage(Math.max(currentPage - 1), 1)} src={assets.left_arrow_icon} alt="" />
                        </a>
                        {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                            <a key={index} href="#job-list">
                                <button onClick={() => setCurrentPage(index + 1)} className={`w-10 h-10 flex items-center justify-center border border-gray-600 rounded-lg ${currentPage === index + 1 ? 'bg-blue-200 text-blue-700' : 'text-gray-400'}`}>{index + 1}</button>
                            </a>
                        ))}
                        <a href="#job-list">
                            <img onClick={() => setCurrentPage(Math.min(currentPage + 1), Math.ceil(filteredJobs.length / 6))} src={assets.right_arrow_icon} alt="" />
                        </a>
                    </div>
                )}
            </section>

        </div>
    )
}

export default JobListing