import React from 'react'
import { FaLink } from 'react-icons/fa'
import { HiLink } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const ImportantLinks = () => {
    return (
        <div className='w-[300px]'>
            <div className='text-white bg-gradient-to-r from-primary to-secondary rounded-t-xl px-2 py-3'>
                <h2 className='text-center text-xl font-semibold'>Important Links</h2>
            </div>
            <div className='border border-t-0 border-gray-300 rounded-b-xl  px-3 py-2 flex flex-col gap-2 h-[250px]'>
                <Link to={'http://www.moedu.gov.bd'} className='border border-gray-300 rounded-md px-2 py-1 hover:bg-gray-300 flex gap-1 items-center'> <HiLink size={18} /> <span>Ministry of Education</span></Link>
                <Link to={'http://www.educationboard.gov.bd'} className='border border-gray-300 rounded-md px-2 py-1 hover:bg-gray-300 flex gap-1 items-center'><HiLink size={18} /> <span>Educationboard</span></Link>
                <Link to={'http://www.educationboardresults.gov.bd'} className='border border-gray-300 rounded-md px-2 py-1 hover:bg-gray-300 flex gap-1 items-center'><HiLink size={18} /> <span>Education Board Results</span></Link>
                <Link to={'http://www.nctb.gov.bd'} className='border border-gray-300 rounded-md px-2 py-1 hover:bg-gray-300 flex gap-1 items-center'><HiLink size={18} /> <span>NCTB</span></Link>
                <Link to={'http://www.banbeis.gov.bd/'} className='border border-gray-300 rounded-md px-2 py-1 hover:bg-gray-300 flex gap-1 items-center'><HiLink size={18} /> <span>Banbeis</span></Link>
            </div>
        </div>
    )
}

export default ImportantLinks