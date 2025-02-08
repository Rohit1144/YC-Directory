import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries'
import React from 'react'

import { client } from '@/sanity/lib/client'

export const experimental_ppr = true;

const page = async ({params} : {params: Promise<{id : string}>}) => {

    const id = (await params).id

    const startup = await client.fetch(STARTUP_BY_ID_QUERY, {id})

    return (
        <>
            <h1 className='text-5xl'>{startup.title}</h1>
        </>
    )
}

export default page