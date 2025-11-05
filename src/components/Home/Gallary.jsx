import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { MdOutlineCameraAlt } from 'react-icons/md'
import gradutionImg1 from '../../assets/gallary/graduation1.jpg'
import gradutionImg2 from '../../assets/gallary/graduation2.jpg'
import gradutionImg3 from '../../assets/gallary/graduation3.jpg'
import gradutionImg4 from '../../assets/gallary/graduation4.jpg'
const Gallary = () => {
    const gallaryImg = [
        { title: "graduation image 1", img: gradutionImg1 },
        { title: "graduation image 2", img: gradutionImg2 },
        { title: "graduation image 3", img: gradutionImg3 },
        { title: "graduation image 4", img: gradutionImg4 },
    ]
    return (
        <div>
            <div className='text-white bg-gradient-to-r from-primary to-secondary h-[50px] rounded-t-xl flex items-center justify-between px-4'>
                {/* Left spacer for balance (optional) */}
                <div className='w-10'></div>

                {/* Center content */}
                <div className='flex gap-1 items-center'>
                    <MdOutlineCameraAlt className="text-2xl" />
                    <h3 className='text-xl font-semibold'>গ্যালারি</h3>
                </div>

                {/* Right arrows */}
                <div className='flex gap-3 items-center'>
                    <IoIosArrowBack className='cursor-pointer text-2xl' />
                    <IoIosArrowForward className='cursor-pointer text-2xl' />
                </div>
            </div>

            <div className='border border-t-0 border-gray-300 rounded-b-xl px-3 py-3 h-[250px]'>
                <div className='grid grid-cols-4 gap-2'>
                    {
                        gallaryImg.map((item, id) => (
                            <img key={id} src={item.img} className='h-[225px]' />
                        ))
                    }
                </div>

            </div>
        </div>

    )
}

export default Gallary