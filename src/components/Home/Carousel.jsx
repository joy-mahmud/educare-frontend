import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import campusImg1 from '../../assets/campus-img/campus-1.jpg'
import campusImg2 from '../../assets/campus-img/campus-2.jpg'
import campusImg3 from '../../assets/campus-img/campus-3.jpg'
const Carousel = () => {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])
    const carouselSlides = [
        { image: campusImg1 },
        { image: campusImg2 },
        { image: campusImg3 }
    ]
    return (
        <div className="embla rounded-xl" ref={emblaRef}>
            <div className="embla__container rounded-xl">
                {
                    carouselSlides.map((slide, index) => (
                        <div className="embla__slide rounded-xl">
                            <img src={slide.image} alt={`image${index}`} className='w-full h-[450px] rounded-xl' />
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Carousel