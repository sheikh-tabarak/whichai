'use client'
import React, { Suspense, useEffect, useState } from 'react'
import Loading from '@/app/components/Loading';
import ToolCard from '@/app/components/ToolCard'
import axios from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CiSearch } from 'react-icons/ci';
import { MdOutlineHourglassEmpty, MdSearchOff } from 'react-icons/md';

const Search = () => {

  const searchParams = useSearchParams();
  const Search = searchParams.get('search')
  const router = useRouter();

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

    router.push('/search?search=' + SearchText)

  }, [SearchText])


  return (
    <>
      <Suspense>
        <meta name='title' content='Search a tool - Which AI' />
        <meta name='description' content='Discover, explore, and contribute to the ever-evolving world of AI with "Which AI.' />


        <div className='pt-16 px-12 lg:px-18'>
          <div className="w-full relative">
            <form action="">
              <input value={SearchText} onChange={
                (e) => {
                  setSearchText(e.target.value);
                  console.log(SearchText)
                }
              } className="flex rounded-lg p-5 bg-white w-full" type="text" name="search" placeholder="Search the best AI Tool" />

              <Link rel="stylesheet" href={`/search?search=${SearchText}`}>
                <button type="submit" className="hover:opacity-[0.9] absolute bg-slate-950 text-white rounded-lg bottom-2 top-2 right-2 z-10 px-4 lg:px-16 flex gap-2 items-center"> <CiSearch className="text-2xl" /> <span className='hidden lg:flex'> Search</span></button>
              </Link></form>
          </div>

          {!loading ?
            <div>
              <div className='text-left flex w-full py-6'>
                <div className="text-sm text-white text-left">{filtredTools?.length} Tools Found</div>
              </div>
              <div className='flex flex-wrap justify-start'>


                {
                  filtredTools?.length > 0 ? filtredTools.map((tool, key) => {
                    return <ToolCard key={key} tool={tool} />

                  }) : <div className='h-screen w-full flex justify-center text-white'>
                    <div className='space-y-4 text-center'>
                      <div className='flex w-full justify-center text-slate-500 text-8xl'>
                        <MdSearchOff /></div>
                      <div className='text-slate-200 text-2xl'>No Tool Found</div>
                      <div className='text-slate-400'>Try changing the keywords to find the tools</div>
                    </div>
                  </div>}
              </div></div> : <Loading />

          }
        </div>
      </Suspense>
    </>
  )
}
export default Search