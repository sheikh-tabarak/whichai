import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { CiSearch } from "react-icons/ci";
import { CiMenuFries } from "react-icons/ci";


const Header = () => {
  return (
    <div className='pt-24'>
    <header className=' fixed flex z-30 text-black justify-between items-center top-4 right-4 left-4 bg-gray-100 py-4 px-6 rounded-lg'>
<Link href={'/'}>
      {/* <Image
          className="relative"
          src="/next.svg"
          alt="Next.js Logo"
          width={100}
          height={27}
          priority
        /> */}

       <p className='uppercase text-2xl font-mono'>WHICH AI</p> 
        </Link>

        <ul className='main-menu hidden lg:flex gap-4'> 
          <Link href={'/about'}><li className='py-3 uppercase  px-4 cursor-pointer rounded-lg hover:bg-gray-200 text-sm'>About</li>
          </Link>
          <Link href={'/contact'}><li className='py-3 uppercase  px-4 cursor-pointer rounded-lg hover:bg-gray-200 text-sm'>Contact</li>
          </Link>
</ul>
<div className='flex justify-center gap-4 items-center '>
<ul className='flex gap-4'>
         <Link href={'/'}> <li className='py-3 uppercase  px-2 cursor-pointer rounded-lg hover:bg-gray-200 text-sm'><CiSearch className="text-2xl" /></li></Link>
          <li className='hidden lg:flex py-3 px-4 cursor-pointer rounded-lg bg-black text-sm text-white'>Add new Tool</li>
          <li className='flex lg:absolute lg:hidden py-3 px-2  uppercase cursor-pointer rounded-lg hover:bg-gray-200 text-sm'> <CiMenuFries className='text-2xl' /></li>
        </ul>

       
        </div>
      </header>
      </div>
  )
}

export default Header