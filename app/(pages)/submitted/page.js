'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { MdCheckCircleOutline } from 'react-icons/md'

const page = () => {
    const router = useRouter();
    return (
        <div className='pt-16 pb-16 h-screen'>

            <div className='h-screen w-96 mx-auto flex justify-center text-white'>
                <div className='space-y-4 text-center'>
                    <div className='flex w-full justify-center text-green-500 text-8xl'>
                        <MdCheckCircleOutline /></div>
                    <div className='text-slate-200 text-2xl'>Tool Submission Successful!</div>
                    <div className='text-slate-400 pb-2'>Thank you for submitting your tool! We are currently reviewing it and will publish it shortly after a brief review.</div>
                    <button onClick={()=>router.push('/newtool')} className='bg-slate-300 rounded-lg p-4 text-slate-950'>Add a new Tool</button>
                </div>
            </div>
        </div>
    )
}
export default page