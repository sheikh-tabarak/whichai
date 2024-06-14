"use client"
import ToolCard from '@/components/ToolCard';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useState } from "react";


const HomePage = () => {

  const router = useRouter();

  const [RecentCategories, setRecentCategories] = useState([])
  const [SearchText, setSearchText] = useState('')
  const [Refresh, setRefresh] = useState()
  const [Tools, setTools] = useState([{}, {}, {}, {}, {}])


  useEffect(() => {
    if (!RecentCategories) {
      axios.get('/api/categories')
        .then(async response => {

          if (response.data) {
            console.log(response.data)
            setRecentCategories(response.data.slice(-5))
          }
        })
        .catch(error => {
          console.error('Error:', error);
          console.error('Error response:', error.response);
          console.error('Error message:', error.message);
        });
    }

  })


  return (
    <div>
      <div
        className={`bg-center bg-no-repeat  bg-cover flex gap-8 flex-col items-center justify-between pt-16 pb-16`}
      >
        <h2 className="text-6xl font-extrabold text-white">Explore Al's Around </h2>
        <div className='text-white pb-6'>Unlock AI's Potential: Discover <span className='bg-white text-black rounded-md mx-1 px-2 py-1'>2500+</span> Tools to Supercharge Your Workflow and Productivity</div>

        <div className="w-[700px] relative">
<form action="">
          <input value={SearchText} onChange={
            (e) => {
              setSearchText(e.target.value);
              console.log(SearchText)
            }
          } className="flex rounded-lg p-[20px] w-full" type="text" name="search" placeholder="Search the best AI Tool" />

            <button onClick={(e)=>{
              e.preventDefault();
              router.push('/search?search='+SearchText)
            }} type='submit'
              className="hover:opacity-[0.9] absolute bg-black text-white rounded-lg bottom-1 top-1 right-1 z-10 px-16 flex gap-2 items-center"> Search</button>

          </form>
        </div>


        <div className='text-white'>
          <h3 className="py-4">Recent Categories:</h3>

          <ul className="grid lg:flex gap-4">
            {
              RecentCategories.map((category) => {
                return <Link rel="stylesheet" href={`/api/aitool/category/${category._id}`} >
                  <li className="border-white text-[12px] border-[1px] border-radius-1  rounded-full px-6 py-2 flex gap-2 cursor-pointer items-center hover:bg-white-200 hover:opacity-[0.8]">
                    {category.name}</li>
                </Link>
              })
            }

          </ul>
        </div>
      </div>

      <div className='justify-center flex w-full'>
        <div className="text-2xl font-semibold text-white py-6">Popular AI Tools</div>
      </div>
      <div className='flex flex-wrap py-4 justify-center'>
        {
          Tools.map((blogItem, key) => {
            return <ToolCard />

          })
        }
      </div>

    </div>

  )
}

export default HomePage