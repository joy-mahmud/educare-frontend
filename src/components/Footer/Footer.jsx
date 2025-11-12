import React from 'react'
import logo from '../../assets/logos/educational-institute-logo-1.png'
import { Link } from 'react-router-dom'
import { LuCopyright, LuFacebook, LuInstagram, LuLinkedin, LuTwitter } from 'react-icons/lu'
import { INSTITUTE_NAME_BN, INSTITUTE_NAME_EN } from '../../utils/constants/constants'
const Footer = () => {
    const date = new Date()
    const year = date.getFullYear()
    return (
        <div className='bg-primary py-12 px-20'>
            <div className='flex justify-between gap-5 text-white pb-5'>
                <div className='w-[300px]'>
                    <div className='flex gap-2 items-center mb-2'>
                        <img src={logo} alt="logo" className='h-10 w-10 bg-white rounded-sm ' />
                        <h2 className='text-xl font-semibold'>{INSTITUTE_NAME_BN}</h2>
                    </div>
                    <p className='text-xs'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis saepe in </p>
                </div>
                <div>
                    <h2 className='text-[18px] font-semibold mb-2'>Quick Links</h2>
                    <ul>
                        <li className='text-sm'><Link>About</Link></li>
                        <li className='text-sm'><Link>Academics</Link></li>
                        <li className='text-sm'><Link>News</Link></li>
                        <li className='text-sm'><Link>Gallary</Link></li>
                    </ul>
                </div>
                <div>
                    <h2 className='text-[18px] font-semibold mb-2'>Admissions</h2>
                    <ul>
                        <li className='text-sm'><Link>Admission form</Link></li>
                        <li className='text-sm'><Link>Payment</Link></li>
                        <li className='text-sm'><Link>Tution fees</Link></li>
                    </ul>
                </div>
                <div>
                    <h2 className='text-[18px] font-semibold mb-2'>Connect With Us</h2>
                    <ul className='flex gap-2 items-center'>
                        <li className=''><Link><LuFacebook className='h-5 w-5' /></Link></li>
                        <li className=''><Link><LuTwitter className='h-5 w-5' /></Link></li>
                        <li className=''><Link><LuInstagram className='h-5 w-5' /></Link></li>
                        <li className=''><Link><LuLinkedin className='h-5 w-5' /></Link></li>
                    </ul>
                </div>

            </div>
            <hr className='text-gray-500 mb-5' />
            <span className='w-full flex justify-center gap-1 text-gray-300 text-xs items-center'><LuCopyright /> <p>{year} {INSTITUTE_NAME_EN}.All rights reserved.</p></span>

        </div>
    )
}

export default Footer