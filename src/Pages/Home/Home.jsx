import React from 'react'
import Carousel from '../../components/Home/Carousel'
import NoticeBoard from '../../components/Home/NoticeBoard'
import PriciplesVoice from '../../components/Home/PriciplesVoice'
import ImportantLinks from '../../components/Home/ImportantLinks'
import Gallary from '../../components/Home/Gallary'

const Home = () => {
    return (
        <div className='container mx-auto mt-5 mb-10'>
            <section className='flex gap-5'>
                <div className='w-[70%]'>
                    <Carousel />
                </div>
                <div className='w-[30%]'>
                    <NoticeBoard />
                </div>

            </section>
            <section className='mt-10 flex gap-5'>
                <PriciplesVoice />
                <ImportantLinks />
            </section>
            <section className='mt-10'>
                <Gallary />
            </section>
        </div>
    )
}

export default Home