import React, { useState } from 'react'
import { LuGraduationCap } from 'react-icons/lu'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const handleShowDropdown = () => {
        setShowDropdown(!showDropdown)
    }
    return (
        <div className='border-b-[1px] border-b-slate-400 py-2 bg-[#082567] '>
            <div className='flex justify-between container mx-auto items-center'>
                <div className=''>
                    <div className='flex gap-1 items-center'>
                        <LuGraduationCap color='white' size={25} className='font-bold' />
                        <span className='text-white text-2xl font-bold'>Educare</span>
                    </div>
                </div>
                <div>
                    <ul className='flex items-center gap-5'>
                        <li>
                            <Link to={'/'} className='text-white font-medium'>Home</Link>
                        </li>
                        <li>
                            <div className='relative'>
                                <span onMouseEnter={handleShowDropdown} onMouseLeave={handleShowDropdown} className='flex gap-1 items-center hover:cursor-pointer'>
                                    <Link to={'/'} className='text-white font-medium'>Institute Info</Link>
                                    <MdKeyboardArrowDown color='white' size={25} className='font-bold' />
                                </span>

                                <ul className='absolute left-0 top-8 bg-white rounded-lg p-4'>
                                    <li className='flex flex-col text-gray-950'>
                                        <Link to={'#'} className='font-medium'>All List</Link>
                                        <Link to={'#'} className='font-medium'>Administration</Link>
                                        <Link to={'#'} className='font-medium'>Institute details</Link>
                                    </li>
                                </ul>
                            </div>


                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar