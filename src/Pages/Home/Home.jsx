import React from 'react'
import Carousel from '../../components/Home/Carousel'
import NoticeBoard from '../../components/Home/NoticeBoard'
import PriciplesVoice from '../../components/Home/PriciplesVoice'
import ImportantLinks from '../../components/Home/ImportantLinks'

const Home = () => {
    return (
        <div className='container mx-auto mt-5 mb-10'>
            <section className='flex gap-5'>
                <div className='w-[70%]'>
                    <Carousel />
                </div>
                <div className='w-[30%] h-[450px]'>
                    <NoticeBoard />
                </div>

            </section>
            <section className='mt-14 flex gap-5'>
                <PriciplesVoice />
                <ImportantLinks />
            </section>
        </div>
    )
}

export default Home