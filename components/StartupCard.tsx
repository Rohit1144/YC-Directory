import { formatDate } from '@/lib/utils'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { Startup, Author } from '@/sanity/types'

export type StartupTypeCard = Omit<Startup, "author"> & {author?: Author}

const StartupCard = ({post} : {post: StartupTypeCard}) => {

    const {title, description, image, category, author, _id, _createdAt, views} = post  

    return (
        <li className='startup-card group'>
            <div className='flex-between'>
                <p className='startup-card_date'> {formatDate(_createdAt)}</p>
                <div className='flex gap-1.5'>
                    <MdOutlineRemoveRedEye className='size-6 text-primary'/>
                    <span className='text-16-medium'>{views}</span>
                </div>
            </div>

            <div className='flex-between gap-5 mt-5'>
                <div className='flex-1 '>
                    <Link href={`/user/${author?._id}`}>
                        <p className='text-16-medium line-clamp-1'>{author?.name}</p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
                    </Link>
                </div>
                <Link href={`/user/${author?._id}`}>
                    <Image src={author?.image!} alt={author?.name!} width={48} height={48} className='rounded-full'/>
                </Link>
            </div>

            <Link href={`/startup/${_id}`}>
                <p className='startup-card_desc'>{description}</p>
                <img src={image} alt={title} className='startup-card_img'/>
            </Link>

            <div className='flex-between mt-5 gp-3'>
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className='text-16-medium'>{category}</p>
                </Link>

                <Button className='startup-card_btn' asChild>
                    <Link href={`/startup/${_id}`}>
                        Details
                    </Link>
                </Button>
            </div>

            
            
        </li>
    )
}

export default StartupCard