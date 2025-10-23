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
        <div className='border-b-[1px] border-b-slate-400 h-12 bg-primary '>
            <div className='flex justify-between container mx-auto items-center h-full'>
                <div className=''>
                    <div className='flex gap-1 items-center'>
                        <LuGraduationCap color='white' size={25} className='font-bold' />
                        <span className='text-white text-2xl font-bold'>Educare</span>
                    </div>
                </div>
                <div className='h-full'>
                    <ul className='flex items-center gap-5 h-full'>
                        <li className='h-full flex items-center'>
                            <Link to={'/'} className='text-white font-medium'>Home</Link>
                        </li>
                        <li className='h-full flex items-center'>
                            <div className='relative h-full'>
                                <span onMouseEnter={handleShowDropdown} onMouseLeave={handleShowDropdown} className='flex gap-1 items-center hover:cursor-pointer h-full'>
                                    <Link to={'/'} className='text-white font-medium'>Institute Info</Link>
                                    <MdKeyboardArrowDown color='white' size={22} className='font-bold mt-1' />
                                    {showDropdown && <ul className="absolute left-0 top-[47px] w-[150px] border border-gray-200 bg-primary shadow-xl">
                                        <li className="border-b border-gray-200">
                                            <Link
                                                to="#"
                                                className="block w-full px-3 py-2 text-white font-medium  hover:bg-[#103B99] transition-colors duration-200"
                                            >
                                                All List
                                            </Link>
                                        </li>
                                        <li className="border-b border-gray-200">
                                            <Link
                                                to="#"
                                                className="block w-full px-3 py-2 text-white font-medium transition-colors hover:bg-[#103B99] duration-200"
                                            >
                                                Administration
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/details"
                                                className="block w-full px-3 py-2 text-white font-medium hover:bg-[#103B99] transition-colors duration-200"
                                            >
                                                Institute Details
                                            </Link>
                                        </li>
                                    </ul>
                                    }
                                </span>


                            </div>


                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar