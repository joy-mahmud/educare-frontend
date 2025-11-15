import React from 'react'
import Carousel from '../../components/Home/Carousel'
import NoticeBoard from '../../components/Home/NoticeBoard'
import PriciplesVoice from '../../components/Home/PriciplesVoice'
import ImportantLinks from '../../components/Home/ImportantLinks'
import Gallary from '../../components/Home/Gallary'
import ContactUs from '../../components/Home/ContactUs'
import Footer from '../../components/Footer/Footer'
import Demo from '../../components/Home/demo'

const Home = () => {
    return (
        <div className='container mx-auto mt-5 mb-10'>
            <section className='flex gap-5 items-start'>
                <div className='w-[69%]'>
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
            <section className='mt-10'>
                <ContactUs />
            </section>
            <section className='mt-10'>
                <Footer />
            </section>
            <Demo />
        </div>
    )
}

export default Home