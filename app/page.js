'use client'
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ToolCard from "./components/ToolCard";
import { CiSearch } from "react-icons/ci";
import Loading from "./components/Loading";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { MdSearchOff } from 'react-icons/md';


export default function Home() {


  const router = useRouter();

  const [RecentCategories, setRecentCategories] = useState([])
  const [SearchText, setSearchText] = useState('')
  const [Refresh, setRefresh] = useState()
  const [filtredTools, setfilteredTools] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (RecentCategories.length == 0) {
      setLoading(true)
      axios.get('/api/categories')
        .then(async response => {
          if (response.data) {
            setLoading(false)

            setRecentCategories(response.data)
          }
          console.log(response.data)
        })
        .catch(error => {
          console.error('Error:', error);
          console.error('Error response:', error.response);
          console.error('Error message:', error.message);
        });
    }


    if (filtredTools.length == 0) {
      setLoading(true)
      axios.get('/api/aitool')
        .then(async response => {
          if (response.data) {
            setLoading(false)
            setfilteredTools(response.data)
          }
          console.log(response.data)
        })
        .catch(error => {
          console.error('Error:', error);
          console.error('Error response:', error.response);
          console.error('Error message:', error.message);
        });
    }
  })

  return (
    <>

      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <div
          className={`bg-center bg-no-repeat  bg-cover flex gap-6 flex-col items-center justify-between pt-16 pb-16`}
        >
          <h2 className="text-3xl lg:text-6xl font-extrabold text-white">Explore Als Around </h2>
          <div className='text-white px-4 leading-9  text-center lg:pb-6'>Unlock AIs Potential: Discover <span className='bg-white text-black rounded-md mx-1 px-2 py-1'>2500+</span> Tools to Supercharge Your Workflow and Productivity</div>

          <div className="w-[300px] lg:w-[700px] relative">
            <form action="">
              <input value={SearchText} onChange={
                (e) => {
                  setSearchText(e.target.value);
                }
              } className="flex rounded-lg p-[20px] w-full" type="text" name="search" placeholder="Search the best AI Tool" />

              <button onClick={(e) => {
                e.preventDefault();
                router.push('/search?search=' + SearchText)
              }} type='submit'
                className="hover:opacity-[0.9] absolute bg-slate-950 text-white rounded-lg bottom-1 top-1 right-1 z-10 px-4 lg:px-16 flex gap-2 items-center"> <CiSearch /><span className="hidden lg:flex"> Search</span></button>
            </form>
          </div>

          <div className='text-white text-center'>
            <h3 className="py-4 ">Recent Categories:</h3>

            {RecentCategories ? <ul className="flex flex-wrap lg:flex justify-center gap-4">
              {
                RecentCategories?.map((category, key) => {
                  return <li key={key} onClick={() => router.push('/category/' + category._id)} className="border-white text-[12px] border-[1px] border-radius-1  rounded-full px-6 py-2 flex gap-2 cursor-pointer items-center hover:bg-white-200 hover:opacity-[0.8]">
                    {category.name}</li>
                })
              }

            </ul> : <Loading />}
          </div>
        </div>
        <div className='flex justify-center w-full py-2'>
          <div className="text-2xl font-semibold text-white py-6">Popular AI Tools</div>
        </div>
        {!loading ?
          <div>
            <div className='flex flex-wrap justify-center'>
              {filtredTools?.length > 0 ? filtredTools.map((tool, key) => {
                return <ToolCard key={key} tool={tool} />;
              }) :
                <div className='h-screen w-full flex justify-center text-white'>
                  <div className='space-y-4 text-center'>
                    <div className='flex w-full justify-center text-slate-500 text-8xl'>
                      <MdSearchOff /></div>
                    <div className='text-slate-200 text-2xl'>No Tool Found</div>
                    <div className='text-slate-400'>Try changing the keywords to find the tools</div>
                  </div>
                </div>}
            </div></div> :
          <Loading />
        }

        {/* <div className='flex justify-center w-full'>
          <div className="text-2xl font-semibold text-white py-6">Popular AI Tools</div>
        </div> */}

        {/* {AITools ? <div className='flex flex-wrap py-4 justify-center'>
          {
            AITools?.map((tool, key) => {
              return <ToolCard key={key} tool={tool} />

            })
          }
        </div> : <Loading />} */}

      </ErrorBoundary>

    </>
  );
}
