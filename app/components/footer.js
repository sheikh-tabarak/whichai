import Link from 'next/link'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import React from 'react'
import Image from 'next/image'

const Footer = () => {
    return (


        <footer className='bg-slate-300 rounded-t-lg text-sm  py-5 px-12 text-slate-950'>
            <div className='flex justify-between items-end border-b-[1px] border-slate-500 pb-2 mb-2'>
                <div className=''>
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
        <div className='py-2'>A directory with 2500+ useful AI Tools.</div>
                </div>
                

<div className='space-y-2'>
                <div className='flex gap-4 text-lg justify-end'>
                    <Link target='_' className='cursor-pointer' href={'https://github.com/sheikh-tabarak/whichai'}><FaGithub /></Link>
                    <Link target='_' className='cursor-pointer' href={'https://linkedin.com/in/sheikhtabarak'}><FaLinkedin /></Link>
                    <Link target='_' className='cursor-pointer' href={'https://instagram.com/smtdigitaltech'}><FaInstagram /></Link>
                </div>
                <div className='flex gap-2 items-center'> 
                
                <div className='text-slate-500'>Made with ❤️ by <Link className='px-1' href={'https://sheikhtabarak.me'}> Muhammad Tabarak </Link>
                </div>
                </div>
                </div>
            </div>

            <div className='flex justify-center w-full '>
                <div>© 2024 <Link className='px-1' href={'/'}>WHICH AI</Link> All rights reserved.            </div>
            </div>

        </footer>
    )
}

export default Footer