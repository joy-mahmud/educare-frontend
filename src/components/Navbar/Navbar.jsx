import React, { useState } from 'react'
import { LuGraduationCap } from 'react-icons/lu'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import logo1 from '../../assets/logos/educational-institute-logo-1.png'
import logo2 from '../../assets/logos/educations-institute-logo-2.webp'
const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(null)
    const location = useLocation()
    const handleShowDropdown = (menu) => {
        setActiveMenu(menu)
    }
    const handleHideDropdown = () => {
        setActiveMenu(null)
    }
    console.log(location.pathname)

    const menus = [
        { name: 'Home', path: '/' },
        {
            name: 'About Us',
            routes: ['/institute-details', '/institute-info'],
            subMenu: [
                { name: 'Institution Info', path: '/institute-info' },
                { name: 'Governing Body', path: '#' },
                { name: 'Institute Details', path: '/institute-details' },
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
            routes: ['/student-info', '/student-summary'],
            subMenu: [
                { name: 'Student Info', path: '/student-info' },
                { name: 'Student Summary', path: '/student-summary' },
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
        <div className='container mx-auto'>
            <div className='bg-secondary h-[120px] px-5 flex justify-between items-center border-b-[0.5px] border-gray-500'>
                <div className='bg-white h-[100px]'>
                    <img src={logo1} alt="logo1" className='h-[100px] w-[100px]' />
                </div>

                <div className='flex flex-col gap-3 items-center'>
                    <h2 className='text-white text-3xl font-semibold'>Our Educational Institute</h2>
                    <h2 className='text-white text-2xl font-semibold'>আমাদের শিক্ষা প্রতিষ্ঠান</h2>

                </div>
                <img src={logo2} alt='logo2' className='h-[100px] w-[100px]' />
            </div>
            <div className='border-b-[1px] border-b-slate-500 h-12 bg-primary '>

                <div className='flex items-center h-full'>

                    <div className='h-full'>
                        <ul className='flex items-center h-full'>
                            {
                                menus.map((menu, index) => (
                                    menu.subMenu ? (
                                        <li key={index} className='h-full flex items-center border-r-[0.5px] border-gray-500'>
                                            <div className='relative h-full'>
                                                <span onMouseEnter={() => handleShowDropdown(menu.name)} onMouseLeave={handleHideDropdown} className={`px-2 flex gap-1 items-center hover:cursor-pointer h-full hover:bg-secondary ${menu.routes?.includes(location.pathname) ? 'bg-secondary' : ''}`}>
                                                    <span className='text-white font-normal'>{menu.name}</span>
                                                    <MdKeyboardArrowDown color='white' size={22} className='font-bold mt-1' />
                                                    <ul style={{ width: menu.dropdownWidth }} className={`absolute left-0 top-[47px] min-w-[150px] border-[0.5px] border-gray-500 bg-primary shadow-xl transition-all duration-500 ease-in-out transform ${activeMenu === menu.name ? 'opacity-100 visible translat-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                                                        {
                                                            menu.subMenu.map((submenu, id) => (
                                                                <li key={id} className="border-b-[0.5px] border-gray-500">
                                                                    <Link
                                                                        to={submenu.path}
                                                                        className="block w-full px-3 py-2 text-white font-normal  hover:bg-secondary transition-colors duration-200"
                                                                    >
                                                                        {submenu.name}
                                                                    </Link>
                                                                </li>
                                                            ))}


                                                    </ul>

                                                </span>


                                            </div>


                                        </li>
                                    ) : (<li key={index} className={`h-full px-2 border-r-[0.5px] border-gray-500 flex items-center hover:bg-secondary ${location.pathname === menu.path ? 'bg-secondary' : ''}`}>
                                        <Link to={menu.path} className='text-white font-normal'>
                                            {menu.name}</Link>
                                    </li>)

                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div >
            <div className='bg-primary h-[35px]'>
                <div className='bg-gray-700 w-[80px] h-[35px] text-white flex items-center justify-center'>news</div>
            </div>
        </div>
    )
}

export default Navbar