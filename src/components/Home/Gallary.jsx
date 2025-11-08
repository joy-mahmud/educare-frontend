import React, { useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { MdOutlineCameraAlt } from 'react-icons/md'
import gradutionImg1 from '../../assets/gallary/graduation1.jpg'
import gradutionImg2 from '../../assets/gallary/graduation2.jpg'
import gradutionImg3 from '../../assets/gallary/graduation3.jpg'
import gradutionImg4 from '../../assets/gallary/graduation4.jpg'
import { Navigation, Autoplay } from 'swiper/modules';
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";
const Gallary = () => {
    const [openLightBox, setOpenLightBox] = useState(false)
    const [photoIndex, setPhotoIndex] = useState(0)
    const gallaryImg = [
        { title: "graduation image 1", img: gradutionImg1 },
        { title: "graduation image 2", img: gradutionImg2 },
        { title: "graduation image 3", img: gradutionImg3 },
        { title: "graduation image 4", img: gradutionImg4 },
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
                    <IoIosArrowBack className='swiper-button-prev cursor-pointer text-2xl' />
                    <IoIosArrowForward className='swiper-button-next cursor-pointer text-2xl' />
                </div>
            </div>

            <div className='border border-t-0 border-gray-300 rounded-b-xl px-3 py-3 h-[250px]'>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={4}
                    loop={true}
                    modules={[Navigation, Autoplay]}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }}
                    className='mySwiper'
                    grabCursor={true}
                    freeMode={true}

                >

                    {
                        gallaryImg.map((item, id) => (
                            <SwiperSlide key={id}>
                                <img onClick={() => {
                                    setOpenLightBox(true)
                                    setPhotoIndex(id)
                                }} src={item.img} alt={item.title} className='h-[225px] rounded-lg hover:scale-105 duration-300 transition-transform' />
                            </SwiperSlide>
                        ))
                    }


                </Swiper>
                <Lightbox
                    open={openLightBox}
                    close={() => setOpenLightBox(false)}
                    index={photoIndex}
                    slides={gallaryImg.map((item) => ({ src: item.img }))}
                />
            </div>
        </div>

    )
}

export default Gallary