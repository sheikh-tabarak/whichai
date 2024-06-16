'use client'
import Loading from '@/components/Loading';
import ToolCard from '@/components/ToolCard';
import axios from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const id = () => {

  const searchParams = useSearchParams();
  const id = searchParams.get('id')
  const navigator = useRouter()
  const [loading, setLoading] = useState(true)
  const [Category, setCategory] = useState()
  const [filtredTools, setfilteredTools] = useState([]);

  useEffect(() => {

    axios.get('api/categories/' + id).then((response) => {
      setCategory(response.data)
    }).catch((e) => {
      console.log(e)
    })


    axios.get('api/aitool/category/' + id).then((response) => {
      setfilteredTools(response.data)
      setLoading(false)

    }).catch((e) => {
      console.log(e)
    })

  }, [])

  return (
    loading ? <Loading /> :
      <div className=' gap-4 p-16 text-white w-full justify-center'>


        <div className=' bg-slate-950 rounded-md border-[0.5px] border-slate-500 p-8'>
          <div className='flex gap-8 items-center'>
            <img src="https://images.ai-finder.net/logos/no-logo.png" alt="AI Tool" className=' w-28 h-28  rounded' />

            <div>
              <div className='flex gap-4'>
                <h1 className='text-3xl font-bold pb-4 mb-5 border-b-[1px] border-slate-700'> {Category?.name} <span className='text-sm pl-2 font-normal'>({filtredTools?.length} Tools)</span></h1>
              </div>
              <p>{Category?.description}</p>
            </div></div>
        </div>
        <div className='flex justify-center w-full'>
          <div className='w-0 h-0 
  border-r-[10px] border-r-transparent
  border-t-[15px] border-t-white
  border-l-[10px] border-l-transparent'>
          </div>
        </div>
        {/* <div className='flex flex-wrap text-center pt-10'> */}
        <div className='flex flex-wrap justify-center pt-10'>
          {filtredTools?.map((tool) => {
            return <ToolCard tool={tool} />

          })}
        </div>
      </div>


  )
}

export default id