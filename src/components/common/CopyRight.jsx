import React from 'react'
import { INSTITUTE_NAME_EN } from '../../utils/constants/constants'
import { LucideCopyright } from 'lucide-react'

const CopyRight = ({ textColor }) => {
    const date = new Date()
    const year = date.getFullYear()
    return (
        <span className={`w-full flex justify-center gap-1 ${textColor} text-xs items-center`}><LucideCopyright size={18} /> <p>{year} {INSTITUTE_NAME_EN}.All rights reserved.</p></span>
    )
}

export default CopyRight