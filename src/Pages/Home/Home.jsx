import React from 'react'
import Carousel from '../../components/Home/Carousel'
import NoticeBoard from '../../components/Home/NoticeBoard'

const Home = () => {
    return (
        <div className='container mx-auto mt-5 mb-10'>
            <div className='flex gap-5'>
                <div className='w-[70%]'>
                    <Carousel />
                </div>
                <div className='w-[30%] h-[400px]'>
                    <NoticeBoard />
                </div>

            </div>
        </div>
    )
}

export default Home