'use client'

import Loading from '@/components/Loading';
import ToolCard from '@/components/ToolCard'
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import React, { useEffect, useState } from 'react'



const Search = () => {

  const searchParams = useSearchParams();
  const Search = searchParams.get('search')

  // const [Loading, setLoading] = useState('')
  const [loading, setLoading] = useState(false)
  const [filtredTools, setfilteredTools] = useState([{}, {}, {}, {}, {}, {}, {}, {}]);
  const [SearchText, setSearchText] = useState('')

  useEffect(() => {
    setLoading(true)
    console.log(Search)
    setSearchText(Search)
    setLoading(false)
  }, [])


  useEffect(() => {
    setLoading(true)
    axios.get('/api/search?query=' + SearchText).then((response) => {
      setfilteredTools(response.data);
      console.log(response.data)
      setLoading(false)

    }).catch((e) => {
      console.log(e)
    })
  }, [SearchText])

  return (

    <div className='pt-16 px-24'>
      <div className="w-full relative">
        <form action="">
          <input value={SearchText} onChange={
            (e) => {
              setSearchText(e.target.value);
              console.log(SearchText)
            }
          } className="flex rounded-lg p-5 bg-white w-full" type="text" name="search" placeholder="Search the best AI Tool" />

          <Link rel="stylesheet" href={`/tools?search=${SearchText}`}>
            <button type="submit" className="hover:opacity-[0.9] absolute bg-black text-white rounded-lg bottom-2 top-2 right-2 z-10 px-16 flex gap-2 items-center"> Search</button>
          </Link></form>
      </div>


      {!loading&&SearchText?
        <div>
          <div className='text-left flex w-full py-6'>
            <div className="text-sm text-white text-left">{filtredTools?.length} Tools Found</div>
          </div>
          <div className='flex flex-wrap justify-start'>
            {filtredTools.map((tool) => {
              return <ToolCard tool={tool}/>

            })}
          </div></div> : <Loading />
      }
    </div>
  )
}
export default Search