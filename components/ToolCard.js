import React from 'react'

const ToolCard = ({ tool }) => {
    return (

        <div className='relative border-gray border-[1px] min-h-[350px] max-w-[235px] rounded-md px-5 py-6 mr-8 mb-8 text-center flex '>
            <div className='absolute w-full h-full bg-gray-900 opacity-70 top-0 right-0 rounded-md -z-10'>f</div>
            <div className='space-y-5 text-center'>
                <div className='w-full flex justify-center'>
                    <img className='w-20 h-20 rounded-lg' src="https://images.ai-finder.net/logos/no-logo.png" alt="" />
                </div>
                <h4 className='text-white text-lg font-semibold'>{tool.name}</h4>
                <div className='flex-wrap flex gap-2 justify-center'>
                    {tool.tags.map((tag)=>{
                        return <span className='px-4 py-1 rounded-full border-gray-300 border-[1px] text-[10px] text-white uppercase cursor-pointer'>{tag}</span>
                    })}
                  </div>
                <p className='text-gray-400'>{tool.description} ...</p>
                <button className='w-full bg-gray-200 rounded-lg py-2'>View Details</button>
            </div>
        </div>
    )
}

export default ToolCard