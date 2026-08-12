'use client';
import React, { Suspense, useEffect, useState } from 'react';
import Loading from '@/app/components/Loading';
import ToolCard from '@/app/components/ToolCard';
import axios from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiSearch, FiArrowLeft, FiFilter } from 'react-icons/fi';
import { MdSearchOff } from 'react-icons/md';

const Search = () => {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [tools, setTools] = useState([]);
  const [searchText, setSearchText] = useState(initialSearch);

  useEffect(() => {
    if (initialSearch) {
      setSearchText(initialSearch);
      performSearch(initialSearch);
    }
  }, [initialSearch]);

  const performSearch = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get('/api/search?query=' + query);
      setTools(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/search?search=' + searchText);
    performSearch(searchText);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pt-44 lg:pt-48 pb-20">
      <div className="w-[95%] max-w-screen-2xl mx-auto px-4 md:px-8">
        {/* Search Header */}
        <div className="max-w-4xl mx-auto space-y-8 lg:space-y-12 flex flex-col items-center">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <span className="text-slate-300">Search Results</span>
          </nav>

          <div className="text-center space-y-4">
            <h1 className="text-3xl lg:text-6xl font-black text-white tracking-tighter">
              Search Results
            </h1>
            <p className="text-slate-500">
              Showing results for &quot;{initialSearch}&quot;
            </p>
          </div>

          <div className="w-full relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <form onSubmit={handleSubmit} className="relative flex items-center bg-slate-900 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
              <div className="pl-6 text-slate-500">
                <FiSearch size={24} />
              </div>
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="flex-grow bg-transparent p-5 lg:p-6 text-white text-base lg:text-lg focus:outline-none placeholder:text-slate-600 w-full"
                type="text"
                placeholder="Search another tool..."
              />
              <button
                type="submit"
                className="mr-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 lg:py-4 lg:px-8 rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/20 text-sm lg:text-base"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Results Info */}
        <div className="mt-12 lg:mt-20 space-y-8 lg:space-y-12">
          <div className="flex items-center justify-between border-b border-white/5 pb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-white">
              {tools.length} <span className="text-slate-500 font-normal">Solutions Found</span>
            </h2>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/60 text-sm font-medium cursor-pointer hover:bg-white/10 transition-colors">
              <FiFilter /> Sort: Relevance
            </div>
          </div>

          {!loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tools.length > 0 ? tools.map((tool, key) => (
                <ToolCard key={key} tool={tool} />
              )) : (
                <div className="col-span-full py-40 flex flex-col items-center space-y-4 text-center">
                  <div className="p-8 bg-slate-900 border border-white/5 rounded-full text-slate-700">
                    <MdSearchOff size={80} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-3xl font-bold text-white">No tools found</h3>
                    <p className="text-slate-500 text-lg">We couldn&apos;t find any tools matching your query. Try different keywords.</p>
                    <div className="pt-8">
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Try these instead:</h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {['Chatbots', 'Video Generation', 'Coding', 'Marketing'].map(tag => (
                          <button key={tag} onClick={() => { setSearchText(tag); performSearch(tag); }} className="px-4 py-2 bg-white/5 rounded-full text-sm text-blue-400 hover:bg-blue-600/10 transition-colors">{tag}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-40 flex justify-center">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
