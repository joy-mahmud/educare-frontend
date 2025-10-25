import React, { useState } from 'react'
import { LuGraduationCap } from 'react-icons/lu'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(null)
    const handleShowDropdown = (menu) => {
        setActiveMenu(menu)
    }
    const handleHideDropdown = () => {
        setActiveMenu(null)
    }

    const menus = [
        { name: 'Home', path: '/' },
        {
            name: 'About Us',
            subMenu: [
                { name: 'Institution Info', path: '#' },
                { name: 'Governing Body', path: '#' },
                { name: 'Institute Details', path: '/details' },
            ],
            dropdownWidth: "150px"
        },
        {
            name: 'Teacher Info',
            subMenu: [
                { name: 'Head Info', path: '/details' },
                { name: 'Teacher Info', path: '#' },
            ],
            dropdownWidth: "150px"
        },
        { name: 'Staff Info', path: '#' },
        {
            name: 'Student Info',
            subMenu: [
                { name: 'Student Info', path: '#' },
                { name: 'Student Summary', path: '#' },
            ],
            dropdownWidth: "170px"
        },
        {
            name: 'Academic Info',
            subMenu: [
                { name: 'Curriculum', path: '#' },
                { name: 'Class Routine', path: '#' },
                { name: 'Examination Routine', path: '#' },
                { name: 'Academic Subject', path: '#' },
            ],
            dropdownWidth: "180px"
        },
        {
            name: 'Publications',
            subMenu: [
                { name: 'Magazine', path: '#' },
                { name: 'Album', path: '#' },
            ],
            dropdownWidth: "150px"
        },
        {
            name: 'Gallery',
            subMenu: [
                { name: 'Photo Gallery', path: '#' },
                { name: 'Video Gallery', path: '#' },
            ],
            dropdownWidth: "150px"
        },
        { name: 'Golden Jubilee Corner', path: '#' },
        { name: 'Admission', path: '#' },
        { name: 'Payment', path: '#' },
    ]

    return (
        <div className='border-b-[1px] border-b-slate-400 h-12 bg-primary '>
            <div className='flex justify-between container mx-auto items-center h-full'>
                {/* <div className=''>
                    <div className='flex gap-1 items-center'>
                        <LuGraduationCap color='white' size={25} className='font-bold' />
                        <span className='text-white text-2xl font-bold'>Educare</span>
                    </div>
                </div> */}
                <div className='h-full'>
                    <ul className='flex items-center h-full'>
                        {
                            menus.map((menu, index) => (
                                menu.subMenu ? (
                                    <li key={index} className='px-2 h-full flex items-center'>
                                        <div className='relative h-full'>
                                            <span onMouseEnter={() => handleShowDropdown(menu.name)} onMouseLeave={handleHideDropdown} className='flex gap-1 items-center hover:cursor-pointer h-full'>
                                                <span className='text-white font-normal'>{menu.name}</span>
                                                <MdKeyboardArrowDown color='white' size={22} className='font-bold mt-1' />
                                                <ul style={{ width: menu.dropdownWidth }} className={`absolute left-0 top-[47px] min-w-[150px] border border-gray-200 bg-primary shadow-xl transition-all duration-500 ease-in-out transform ${activeMenu === menu.name ? 'opacity-100 visible translat-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                                                    {
                                                        menu.subMenu.map((submenu, id) => (
                                                            <li key={id} className="border-b border-gray-200">
                                                                <Link
                                                                    to={submenu.path}
                                                                    className="block w-full px-3 py-2 text-white font-normal  hover:bg-[#103B99] transition-colors duration-200"
                                                                >
                                                                    {submenu.name}
                                                                </Link>
                                                            </li>
                                                        ))}


                                                </ul>

                                            </span>


                                        </div>


                                    </li>
                                ) : (<li key={index} className='h-full px-2 flex items-center'>
                                    <Link to={menu.path} className='text-white font-normal'>
                                        {menu.name}</Link>
                                </li>)

                            ))
                        }
                    </ul>
                    {/* <ul className='flex items-center gap-5 h-full'>
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
                    </ul> */}
                </div>
            </div>
        </div >
    )
}

export default Navbar