import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Autoplay } from 'swiper/modules';
import campusImg1 from '../../assets/campus-img/campus-1.jpg'
import campusImg2 from '../../assets/campus-img/campus-2.jpg'
import campusImg3 from '../../assets/campus-img/campus-3.jpg'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
const Carousel = () => {
    const carouselSlides = [
        { image: campusImg1 },
        { image: campusImg2 },
        { image: campusImg3 }
    ]
    return (
        // <div className="embla rounded-xl" ref={emblaRef}>
        //     <div className="embla__container rounded-xl">
        //         {
        //             carouselSlides.map((slide, index) => (
        //                 <div key={index} className="embla__slide rounded-xl">
        //                     <img src={slide.image} alt={`image${index}`} className='w-full h-[450px] rounded-xl' />
        //                 </div>
        //             ))
        //         }

        //     </div>
        // </div>
        <div className=' relative'>

            {/* Navigation buttons */}
            <div className='absolute top-1/2 z-30 left-5'>
                <IoIosArrowBack className='swiper-button-prev cursor-pointer text-2xl text-white' />
            </div>
            <div className='absolute top-1/2 z-30 right-5'>
                <IoIosArrowForward className='swiper-button-next cursor-pointer text-2xl text-white' />
            </div>
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
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
                freeMode={true}

            >

                {
                    carouselSlides.map((item, id) => (
                        <SwiperSlide key={id}>
                            <img src={item.image} alt={item.title} className='w-full h-[450px] rounded-xl' />
                        </SwiperSlide>
                    ))
                }


            </Swiper>

        </div>

    )
}

export default Carousel