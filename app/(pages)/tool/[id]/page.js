'use client'
import Loading from '@/app/components/Loading';
import axios from 'axios';
import { generateMetadata } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const AITool = ({ params }) => {


  const [Tool, setTool] = useState()
  const [loading, setLoading] = useState(true)

  const navigator = useRouter()

  useEffect(() => {

    
    axios.get('/api/aitool/' + params?.id).then((response) => {
      setTool(response?.data)
      setLoading(false)

    }).catch((e) => {

    })
  }, [])

  return (
    loading ? <Loading /> :

      <>

        <div className='lg:flex gap-4 p-8 lg:p-28 text-white w-full justify-center'>

          <title>{Tool?.name && Tool.name} | Which AI</title>

          <div className='lg:w-1/3 text-center  '>
            <div className='flex justify-center sticky top-48 items-center'>
              <div>
                <img src={Tool?.image ? Tool.image : Tool?.category?.icon ? Tool.category.icon : 'https://images.ai-finder.net/logos/no-logo.png'} alt="AI Tool" className=' w-60 h-60  rounded' />
                <div className='flex justify-center lg:hidden'>
                  <div className='  w-0 h-0 
  border-r-[10px] border-r-transparent
  border-t-[15px] border-t-white
  border-l-[10px] border-l-transparent'>
                  </div>
                </div>
              </div>

              <div className='hidden lg:flex w-0 h-0 
  border-t-[10px] border-t-transparent
  border-l-[15px] border-l-white
  border-b-[10px] border-b-transparent'> </div>
            </div>

          </div>

          <div className='lg:w-2/3 mt-6 lg:mt-0 bg-slate-950 rounded-md border-[0.5px] border-slate-500 p-8'>

            <h1 className='text-3xl font-bold pb-4 mb-5 border-b-[1px] border-slate-700'>{Tool?.name}</h1>

            <p>{Tool?.description}</p>

            <h2 className='text-base font-semibold pt-5 mt-5 border-t-[1px] border-slate-700 '>Category: <span onClick={() => navigator.push('/category/' + Tool?.category?._id)} className='font-normal mx-4 px-4 py-1 rounded-md border-gray-300 border-[1px] text-sm text-white uppercase cursor-pointer'>{Tool?.category?.name}</span></h2>

            <div className='flex-wrap flex items-center gap-2 pt-5 mt-5 border-t-[1px] border-slate-700 '>
              <div className='text-base font-semibold'>Tags:</div>
              {Tool?.tags?.map((tag, key) => {
                return <span key={key} className='px-4 py-1 rounded-full border-gray-300 border-[1px] text-[10px] text-white uppercase cursor-pointer'>{tag}</span>
              })}
            </div>

            <h2 className='text-base font-semibold pt-5 pb-2 mt-5 border-t-[1px] border-slate-700 '>Credits:</h2>
            <Link target='_' href={Tool?.link && Tool?.link}> <div className='font-normal  rounded-md border-gray-300 text-sm text-white'>
              <div className=''>{Tool?.link && Tool?.link}</div>
            </div></Link>

            <h2 className='text-base font-semibold pt-5 pb-2 mt-5 border-t-[1px] border-slate-700 '>Credits:</h2>
            <div className='font-normal  rounded-md border-gray-300 text-sm text-white'>
              <div className=''>{Tool?.posted_by && Tool.posted_by}</div>
            </div>

          </div>
        </div>

      </>
  )
}

export default AITool