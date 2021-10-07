import React from 'react'
import {Link} from "react-router-dom";

const Index = () => {
    return (
        <div className='flex flex-col'>
            <Link to='/usuarios'>
            <button type='submit' className='x-3 py-1  bg-green-200 rounded-md'> usuarios </button>
            </Link>
        </div>
    )
}

export default Index;
