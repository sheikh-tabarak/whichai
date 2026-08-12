import React, { Suspense } from 'react'
import Search from '@/app/components/Search';

export const metadata = {
  title: 'Search AI Tools - Which AI',
  description: 'Find the best AI tools for your needs on Which AI.',
};

const SearchPage = () => {
  return (
    <Suspense>
      <Search />
    </Suspense>
  )
}

export default SearchPage