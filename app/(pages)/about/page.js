'use client'
import Head from 'next/head'
import React from 'react'

const AboutPage = () => {

    return (

        <>
            <meta name='title' content='About - Which AI'/> 
            <meta name='description' content='Welcome to Which AI, your ultimate directory for discovering useful and innovative AI tools from around the globe. With the rapid pace of AI development, countless tools are released daily, making it challenging to find the perfect solution for your specific needs. Our mission is to simplify this process by curating a comprehensive and easily navigable collection of AI tools, ensuring you find exactly what you need.' />


            <div
                className={`bg-center bg-no-repeat  bg-cover flex gap-8 flex-col items-center justify-between pt-16 pb-16 px-60`}
            >
                <h2 className="text-6xl font-extrabold text-white">About Which AI</h2>
                <p className='text-white pb-2 leading-7 text-center'>Welcome to "Which AI," your ultimate directory for discovering useful and innovative AI tools from around the globe. With the rapid pace of AI development, countless tools are released daily, making it challenging to find the perfect solution for your specific needs. Our mission is to simplify this process by curating a comprehensive and easily navigable collection of AI tools, ensuring you find exactly what you need.</p>
                <p className='text-white pb-2 leading-7 text-center'>At "Which AI," we also empower the AI community by allowing users to submit new and exciting AI tools they love. By fostering this collaborative environment, we aim to keep our directory fresh, relevant, and valuable for everyone seeking the latest advancements in AI technology.</p>
                <p className='text-white pb-2 leading-7 text-center'>Discover, explore, and contribute to the ever-evolving world of AI with "Which AI."</p>
                <button className='bg-slate-300 p-4 rounded-lg'>Submit a new AI Tool</button>
            </div>
        </>
    )
}

export default AboutPage