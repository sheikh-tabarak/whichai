'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdCancel, MdCheck, MdCheckCircle, MdErrorOutline } from "react-icons/md";
import ToolCard from '@/app/components/ToolCard';
import { useRouter } from 'next/navigation';

const AddNewTool = () => {

  const router = useRouter();


  const [Errors,setErrors] = useState(['Name can\'t be empty','Message cannt be empty'])

  const [tools, setTools] = useState([{
    name: 'Chat Gpt',
    description: '3sdfsdf',
    link: 'asdas',

    postedBy: 'asd',
    category: 'asd',
    tags: ['fd', 'sdf']
  },
  {
    name: 'Chat Gpt',
    description: '3sdfsdf',
    link: 'asdas',
    postedBy: 'asd',
    category: 'asd',
    tags: ['fd', 'sdf']
  }]);
  const [CurrentTool, setCurrentTool] = useState({
    name: '',
    description: '',
    link: '',
    image: '',
    tags: [],
    posted_by: '',
    posted_by_email: '',
    category: ''
  });
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  const handleChangeTags = (e) => {
    setNewTag(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTag();
    }
  };

  const addTag = () => {
    if (newTag.trim() !== '') {
      setTags([...tags, newTag.trim()]);
      setNewTag('');

    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((tag, i) => i !== index));
  };

  useEffect(()=>{
    setCurrentTool({
      ...CurrentTool,
      tags: tags
    })
  },[tags])

  useEffect(() => {

    axios.get('/api/aitool')
      .then(response => {
        console.log(response.data)
        setTools(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get('/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    console.log(CurrentTool)
  }, [CurrentTool])

  useEffect(() => {

    if (CurrentTool.link == '') {
      setCurrentTool({
        ...CurrentTool,
        image: ''
      })
    }
    else {
      setCurrentTool({
        ...CurrentTool,
        image: 'https://logo.clearbit.com/' + CurrentTool.link
      })
    }
  }, [CurrentTool.link])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTool({ ...CurrentTool, [name]: value });
  };

  const handleCategoryChange = (event) => {
    console.log(event)
    const { value } = event.target;
    setCurrentTool({ ...CurrentTool, category: value });
  };


  const handleSubmit = (event) => {

    event.preventDefault();

    axios.post('/api/aitool', CurrentTool)
      .then(async response => {

        if (response.data.ok) {
          
          router.replace('/submitted')

          setCurrentTool({
            name: '',
            description: '',
            link: '',
            image: '',
            tags: [],
            posted_by: '',
            posted_by_email: '',
            category: ''
          });

          setTags([])


        }
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
        console.error( error.response);
        console.error( error.message);
      });
  };


  // const handleDelete = (id) => {
  //   axios.delete(`/api/tools/${id}`)
  //     .then(response => {
  //       setTools(tools.filter(tool => tool.id !== id));
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };


  return (

    <>
    <title>Submit a new Tool - Which AI</title>
    <meta name='title' content='Submit a new Tool - Which AI' />

    <div className='px-6 lg:px-16 py-12'>
    <div className='lg:flex gap-6 w-full'>

      <div className='space-y-6 lg:w-2/3'>

        <div className='mx-3'>
          <h1 className="text-2xl lg:text-4xl text-slate-200 font-bold ">Submit a new AI Tool</h1>
          <p className='border-y-[1px] py-4 my-4 border-slate-600 text-slate-400 text-xs lg:text-sm'> Please provide accurate and complete details when submitting your AI tool. Inaccurate or incomplete information may result in your tool not being published on our website. Your attention to detail helps us maintain a high-quality platform.</p>
        </div>

        <div className="w-full md:w-full px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-slate-400 text-xs font-bold mb-2" htmlFor="name">
            Tool Name<span className='text-red-500'> *</span>
          </label>
          <input placeholder='Enter name of tool i.e "Chat GPT"'
            className="appearance-none block w-full text-slate-300 border border-slate-500 bg-slate-950 rounded py-3 px-4 leading-tight focus:outline-none "
            id="name"
            name='name'
            type="text"
            value={CurrentTool.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="w-full md:w-full px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-slate-400 text-xs font-bold mb-2" htmlFor="category">
            Category<span className='text-red-500'> *</span>
          </label>
          <select
            className="appearance-none block w-full text-slate-300 border border-slate-500 bg-slate-950 rounded py-3 px-4 leading-tight focus:outline-none"
            id="category"
            name='category'
            value={CurrentTool.category}
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-full px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-slate-400 text-xs font-bold mb-2" htmlFor="description">
            Tool Description <span className='text-red-500'> *</span>
          </label>
          <textarea
            placeholder='Write up the description'
            rows={5}
            className="appearance-none block w-full text-slate-300 border border-slate-500 bg-slate-950 rounded py-3 px-4 leading-tight focus:outline-none"
            id="description"
            name='description'
            value={CurrentTool.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="w-full md:w-full px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-slate-400 text-xs font-bold mb-2" htmlFor="link">
            Tool Link <span className='text-red-500'> *</span>
          </label>
          <input
            className="appearance-none block w-full text-slate-300 border border-slate-500 bg-slate-950 rounded py-3 px-4 leading-tight focus:outline-none"
            id="link"
            name='link'
            type="text"
            value={CurrentTool.link}
            onChange={handleInputChange}
          />
        </div>

        <div className="w-full md:w-full px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-slate-400 text-xs font-bold mb-2" htmlFor="posted_by">
            Name <span className='text-red-500'> *</span>
          </label>
          <input
            placeholder='Enter your name for credits'
            className="appearance-none block w-full text-slate-300 border border-slate-500 bg-slate-950 rounded py-3 px-4 leading-tight focus:outline-none"
            id="posted_by"
            type="text"
            name='posted_by'
            value={CurrentTool.posted_by}
            onChange={handleInputChange}
          />
        </div>

        <div className="w-full md:w-full px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-slate-400 text-xs font-bold mb-2" htmlFor="posted_by_email">
            Email <span className='text-red-500'> *</span>
          </label>
          <input
            placeholder='Enter you email (only visible to admin)'
            className="appearance-none block w-full text-slate-300 border border-slate-500 bg-slate-950 rounded py-3 px-4 leading-tight focus:outline-none"
            id="posted_by_email"
            type="email"
            name='posted_by_email'
            value={CurrentTool.posted_by_email}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full md:w-full px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-slate-400 text-xs font-bold mb-2" htmlFor="category">
            Tags
          </label>
          <div className='flex flex-wrap gap-2 appearance-none w-full text-slate-300 border border-slate-500 bg-slate-950 rounded  leading-tight '>
            <ul className='flex flex-wrap gap-2 py-3 px-4 ' >
              {tags.map((tag, index) => (
                <li className='text-white bg-slate-500 p-2 flex gap-2 rounded-sm' key={index}>
                  {tag}
                  <span className='cursor-pointer hover:text-red-500' onClick={() => removeTag(index)}>×</span>
                </li>
              ))}
              <input
                className='p-2 flex bg-transparent focus:outline-none'
                type="text"
                value={newTag}
                onChange={handleChangeTags}
                onKeyPress={handleKeyPress}
                placeholder="Add new tag"
              />
            </ul>
          </div>
        </div>

          <ul className=' text-white px-4 text-xs space-y-2'>
            {!CurrentTool.name&&<li className='text-slate-500 flex gap-1 items-center'><span className='text-red-500'><MdCancel/></span>Tool name cannot be empty</li>}
            {!CurrentTool.description&&<li className='text-slate-500 flex gap-1 items-center'><span className='text-red-500'><MdCancel/></span>Tool Description cannot be empty</li>}
            {!CurrentTool.category&&<li className='text-slate-500 flex gap-1 items-center'><span className='text-red-500'><MdCancel/></span>Tool Category cannot be empty</li>}
            {!CurrentTool.link&&<li className='text-slate-500 flex gap-1 items-center'><span className='text-red-500'><MdCancel/></span>Tool Link cannot be empty</li>}

            {!CurrentTool.posted_by&&<li className='text-slate-500 flex gap-1 items-center'><span className='text-red-500'><MdCancel/></span>Name for credits cannot be empty</li>}
            {!CurrentTool.posted_by_email&&<li className='text-slate-500 flex gap-1 items-center'><span className='text-red-500'><MdCancel/></span>Email is required</li>}

           
            {CurrentTool.posted_by_email&&CurrentTool.posted_by&&CurrentTool.link&&CurrentTool.description&&CurrentTool.link&&CurrentTool.category&&CurrentTool.posted_by&&CurrentTool.posted_by_email&&<li className='flex gap-1 items-center'><span className='text-green-500'><MdCheckCircle/></span>You are good to submit (Admin will verfiy the details and publish your tool as soon as possible)</li>}
          </ul>

        <div className='w-full md:w-full px-3 mb-6 md:mb-0'>
          <button disabled ={(CurrentTool.link&&CurrentTool.description&&CurrentTool.link&&CurrentTool.category)?false:true} onClick={handleSubmit}
            className="bg-slate-200 hover:bg-slate-300 font-bold text-slate-900  w-full py-2 px-4 rounded">
            Submit a new Tool
          </button></div>



      </div>

      <div className='hidden lg:w-1/3 lg:flex justify-center sticky top-48 h-full'>
        <ToolCard tool={CurrentTool} />
      </div>


    </div>
  </div>
  </>
  )
}

export default AddNewTool