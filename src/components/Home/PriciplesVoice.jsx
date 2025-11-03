import React from 'react'
import { LuQuote } from 'react-icons/lu'
import imgPriciple from '../../assets/teachers/principal-photo.jpg'
const PriciplesVoice = () => {
    return (
        <div className='flex-1'>
            <div className='text-white bg-gradient-to-r from-primary to-secondary rounded-t-xl px-4 py-4'>
                <span className='flex gap-1 items-center'>
                    <LuQuote size={24} />
                    <h2 className='text-xl font-semibold '>প্রধান শিক্ষক মহোদয়ের কথা</h2>
                </span>
            </div>
            <div className='border border-t-0 border-gray-300 rounded-b-xl  p-4'>
                <div className='flex gap-5'>
                    <img src={imgPriciple} alt="priciple img" className='h-[200px] w-[200px] rounded-lg' />
                    <p>   শিক্ষা এগিয়ে চলে দুর্বার গতিতে, অজানাকে জানতে, অমৃতের সন্ধানে, সৃজনশীলতার সৃষ্টি-সুখের উল্লাসে, বিন্দু জলে সিন্ধুর গভীরতা খুঁজতে। কমলমতি শিক্ষার্থীদের অদম্য ভাবাবেগ, অনুভূতি, রসবোধ ও সাহিত্য মনোবৃত্তির শুকুমার শিল্প মানস শিক্ষার্থীদের এগিয়ে নিয়ে যাবে দূরে-বহু দূরে সাফল্যের বেদিতে।</p>
                </div>
            </div>
        </div>
    )
}

export default PriciplesVoice