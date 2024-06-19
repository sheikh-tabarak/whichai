'use client'
import Loading from '@/app/components/Loading';
import ToolCard from '@/app/components/ToolCard';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const CatgeoryTools = ({ params }) => {

  const navigator = useRouter()
  const [loading, setLoading] = useState(true)
  const [Category, setCategory] = useState()
  const [filtredTools, setfilteredTools] = useState([]);

  useEffect(() => {

    axios.get('/api/categories/' + params.id).then((response) => {
      setCategory(response.data)
    }).catch((e) => {
      console.log(e)
    })


    axios.get('/api/aitool/category/' + params.id).then((response) => {
      setfilteredTools(response.data)
      setLoading(false)

    }).catch((e) => {
      console.log(e)
    })

  }, [])

  return (
    loading ? <Loading /> :
      <div className=' gap-4 p-8 lg:p-14 text-white w-full justify-center'>
        <div className=' bg-slate-950 rounded-md border-[0.5px] border-slate-500 p-6 lg:p-8'>
          <div className='lg:flex gap-8 '>
            <div className='flex justify-center'>
            <img src={`${Category?.icon ? (Category.icon) : 'https://images.ai-finder.net/logos/no-logo.png'}`} alt="AI Tool" className=' w-28 h-28  rounded' />
            </div>
            <div>
              <div className='flex gap-4 justify-center lg:justify-start pt-6 lg:pt-0'>
                <h1 className='text-xl lg:text-3xl font-bold pb-4 mb-5 border-b-[1px] border-slate-700'> {Category?.name} <span className='text-sm pl-2 font-normal'>({filtredTools?.length} Tools)</span></h1>
              </div>
              <p className='text-center lg:text-left'>{Category?.description}</p>
            </div></div>
        </div>
        <div className='flex justify-center w-full'>
          <div className='w-0 h-0 
  border-r-[10px] border-r-transparent
  border-t-[15px] border-t-white
  border-l-[10px] border-l-transparent'>
          </div>
        </div>

        <div className='flex flex-wrap justify-center pt-10'>
          {filtredTools?.map((tool, key) => {
            return <ToolCard key={key} tool={tool} />

          })}
        </div>
      </div>


  )
}

export default CatgeoryTools