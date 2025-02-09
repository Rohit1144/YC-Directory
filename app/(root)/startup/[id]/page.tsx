import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries'
import React from 'react'

import { client } from '@/sanity/lib/client'
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import markdownit from 'markdown-it'
import View from '@/components/View';

const md = markdownit()

const page = async ({params} : {params: Promise<{id : string}>}) => {

    const id = (await params).id

    const startup = await client.fetch(STARTUP_BY_ID_QUERY, {id})

    if(!startup) return notFound()

        const pasrsedContent = md.render(startup?.pitch || '')

    return (
        <>
            <section className='pink_container !min-h-[230px]'>
                <p className='tag'>{formatDate(startup?._createdAt)}</p>

                <h1 className='heading'>{startup.title}</h1>

                <p className='sub-heading !max-w-5xl'>{startup.description}</p>

            </section>

            <section className='section_container'>
                <img src={startup.image} alt="startup_image" className='w-full rounded-xl h-auto' />

                <div className='space-y-5 max-w-4xl mt-10 mx-auto'>
                    <div className='flex-between gap-5'>
                        <Link href={`/user/${startup.author._id}`} className='flex items-center gap-2 mb-3'>
                            <Image
                            src={startup.author.image}
                            alt='avatar'
                            width={64}
                            height={64}
                            className='rounded-full drop-shadow-lg'
                            />

                            <div>
                                <p className='text-20-medium'>{startup.author.name}</p>
                                <p className='text-16-meidum !text-black-300'>@{startup.author.username}</p>
                            </div>
                        </Link>

                        <p className='category-tag'>{startup.category}</p>

                    </div>

                    <h3 className='text-30-bold'>Pitch Details</h3>
                    {pasrsedContent ? (
                        <article className='max-w-4xl font-work-sans break-full prose'
                        
                        dangerouslySetInnerHTML={{ __html: pasrsedContent }}
                        />
                            
                    ): (
                        <p className='no-result'>No details provided</p>
                    )}

                </div>

                <hr className='divider'/>

                <View id={id}/>

            </section>
        </>
    )
}

export default page