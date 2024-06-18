import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { CiSearch } from "react-icons/ci";
import { CiMenuFries } from "react-icons/ci";
import { FaUpload } from 'react-icons/fa';
import { MdAddBox } from 'react-icons/md';


const Header = () => {
  return (
    <div className='pt-24'>
      <header className=' fixed flex z-30 text-black justify-between items-center top-4 right-4 left-4 bg-slate-300 py-4 px-6 rounded-lg'>
        <Link href={'/'}>
          <Image
            className="relative"
            src="/whichailogo.png"
            alt="Which AI Logo"
            width={170}
            height={600}
            priority
          />
        </Link>

        <ul className='main-menu hidden lg:flex gap-4'>
          <Link href={'/about'}><li className='py-3 uppercase  px-4 cursor-pointer rounded-lg hover:bg-slate-200 text-sm'>About</li>
          </Link>
  
        </ul>
        <div className='flex justify-center gap-4 items-center'>
          <ul className='flex lg:gap-4 items-center'>
            <Link href={'/search?search='}> <li className='py-3 uppercase  px-2 cursor-pointer rounded-lg hover:bg-gray-200 text-sm'><CiSearch className="text-2xl" /></li></Link>
            <Link href={'/newtool'}><li className='hidden lg:flex cursor-pointer rounded-lg bg-slate-950 text-sm p-4 text-white'>Submit a new Tool</li></Link> 
            <Link href={'/newtool'}><li className='flex lg:absolute lg:hidden py-3 px-2  uppercase cursor-pointer rounded-lg hover:bg-gray-200 text-sm text-slate-950'> <MdAddBox className='text-2xl' /></li></Link> 
          </ul>
        </div>
      </header>
    </div>
  )
}

export default Header