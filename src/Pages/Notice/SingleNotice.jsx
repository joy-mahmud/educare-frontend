import React from 'react'
import { useParams } from 'react-router-dom'

const SingleNotice = () => {
    const { id } = useParams()

    return (
        <div>notice:{id}</div>
    )
}

export default SingleNotice