import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const JobCard = ({job}) => {

  const navigate = useNavigate()

  return (
    <div className='flex flex-col justify-between h-full border p-6 shadow-lg rounded-xl transition duration-100 ease-in-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(59,130,146,0.4)]'>
        <div className='flex justify-between items-center'>
            <img className='h-8' src={assets.company_icon} alt="" />
        </div>
        <h4 className='font-medium text-xl mt-2'>{job.title}</h4>
        <div className='flex items-center gap-3 text-xs text-gray-500 mt-2 mb-2'>
            <span className='bg-blue-100 border border-blue-300 px-2 py-1 rounded-2xl'>{job.location}</span>
            <span className='bg-red-100 border border-red-300 px-2 py-1 rounded-2xl'>{job.level}</span>
        </div>
        <p className='text-gray-400 text-sm mt-4' dangerouslySetInnerHTML={{__html:job.description.slice(0,150)}}></p>
        <div className='mt-4 flex gap-4 text-sm'>
            <button onClick={() => {navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className='bg-blue-500 text-white px-4 py-2 rounded'>Apply Now</button>
            <button onClick={() => {navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className='font-semibold'>Learn More</button>
        </div>
    </div>
  )
}

export default JobCard