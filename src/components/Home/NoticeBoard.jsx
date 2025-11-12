import React, { useState } from 'react'
import { CiCalendar } from 'react-icons/ci'
import { FaRegBell } from 'react-icons/fa'
import { truncateTextWithEllipses } from '../../utils/helpers/truncateTextWithEllipses'
import { Link } from 'react-router-dom'


const NoticeBoard = () => {

    const [notices, setNotices] = useState([
        {
            id: 1,
            title: "Mid-term Exam 2025 Mid-term Exam 2025",
            description: "The mid term exam schedule for all classes The mid term exam schedule for all classes",
            date: '2025-10-25',
            category: 'exam',
            author: "Academic Office",
            pinned: true
        },
        {
            id: 2,
            title: "Mid-term Exam 2025",
            description: "The mid term exam schedule for all classes",
            date: '2025-10-25',
            category: 'exam',
            author: "Academic Office",
            pinned: true
        },
        {
            id: 3,
            title: "Mid-term Exam 2025",
            description: "The mid term exam schedule for all classes",
            date: '2025-10-25',
            category: 'exam',
            author: "Academic Office",
            pinned: true
        }, {
            id: 4,
            title: "Mid-term Exam 2025",
            description: "The mid term exam schedule for all classes",
            date: '2025-10-25',
            category: 'exam',
            author: "Academic Office",
            pinned: true
        },
        {
            id: 5,
            title: "Mid-term Exam 2025",
            description: "The mid term exam schedule for all classes",
            date: '2025-10-25',
            category: 'exam',
            author: "Academic Office",
            pinned: true
        },
        {
            id: 6,
            title: "Mid-term Exam 2025",
            description: "The mid term exam schedule for all classes",
            date: '2025-10-25',
            category: 'exam',
            author: "Academic Office",
            pinned: true
        }
    ])

    return (
        <div className='h-full'>
            <div className='text-white bg-gradient-to-r from-primary to-secondary h-[50px] rounded-t-xl flex gap-1 items-center justify-center'>
                <FaRegBell className='text-xl' />
                <h3 className='text-xl font-semibold'>Notice Board</h3>
            </div>

            <div className='border border-gray-400 border-t-0 h-[400px] rounded-b-xl p-2 flex flex-col gap-3 justify-between items-center'>
                <div className='flex flex-col gap-2 w-full overflow-y-auto'>
                    {
                        notices.map((notice, id) => (
                            <div key={id} className='border border-gray-300 shadow-md rounded-lg px-2 py-1 hover:cursor-pointer'>
                                <Link to={`/notice/${notice.id}`}>
                                    <div className='flex gap-3 items-center'>
                                        <h3 className='text-[18px] font-semibold '>{truncateTextWithEllipses(notice.title, 20)}</h3>
                                        <span className='flex gap-1 items-center text-xs'><CiCalendar size={16} /> <p className='text-gray-600 text-sm'>{notice.date}</p></span>

                                    </div>
                                    <p className='text-sm text-gray-600 font-normal'>{truncateTextWithEllipses(notice.description, 48)}</p>
                                </Link>


                            </div>
                        ))
                    }
                </div>
                <button className='w-full text-white font-medium bg-primary hover:bg-secondary py-2 rounded-lg cursor-pointer'>View all notices</button>

            </div>
        </div>
    )
}

export default NoticeBoard