import { useRouter } from 'next/navigation'
import React from 'react'

const ToolCard = ({ key, tool }) => {

    const router = useRouter();


    return (

        <div key={key} className='relative border-gray border-[1px] min-h-[350px] min-w-[250px] max-w-[235px] rounded-md px-5 py-6 mb-8 text-center flex mx-auto lg:mx-4 '>
            <div className='absolute w-full h-full bg-gray-900 opacity-70 top-0 right-0 rounded-md -z-10'></div>
            <div className='space-y-5 text-center w-full'>

                <div className='w-full flex justify-center'>
                    <img className='w-20 h-20 rounded-lg' src={tool?.image ? tool.image : tool?.category?.icon ? tool.category.icon : 'https://images.ai-finder.net/logos/no-logo.png'} alt={tool ? tool.name : 'Tool'} />
                </div>
                <h4 onClick={() => router.push('/tool/' + tool?._id)} className='cursor-pointer text-white text-lg font-semibold'>{tool?.name ? tool.name : 'Lorem Ispum'}</h4>
                <div className='flex-wrap flex gap-2 justify-center'>
                    {tool?.tags ? tool.tags.map((tag, key) => {
                        return <span key={key} className='px-4 py-1 rounded-full border-gray-300 border-[1px] text-[10px] text-white uppercase cursor-pointer'>{tag}</span>
                    }) : <span className='px-4 py-1 rounded-full border-gray-300 border-[1px] text-[10px] text-white uppercase cursor-pointer'>lorem</span>}
                </div>
                <div className='text-gray-400'>{tool?.description ? tool.description.slice(0, 90) : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ut eveniet, obcaecati vel maiores earum doloribus cum saepe suscipit asperiores?'} ...</div>
                <button onClick={() => router.push('/tool/' + tool?._id)} className='w-full bg-gray-200 text-black text-sm rounded-lg p-2'>View Details </button>
            </div>
        </div>
    )
}

export default ToolCard