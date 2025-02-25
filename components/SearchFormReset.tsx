"use client"

import { MdOutlineClear } from "react-icons/md";
import Link from 'next/link'
import React from 'react'



const SearchFormReset = () => {

    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement

        if(form) form.reset()
    }

    return (
        <button type='reset' onClick={reset} className='search-btn text-white'>
            <Link href='/'><MdOutlineClear className='size-5'/></Link>
        </button>
    )
}

export default SearchFormReset