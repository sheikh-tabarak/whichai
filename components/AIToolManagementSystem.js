"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AIToolManagementSystem = () => {
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
    name: 'This is from New One',
    description: 'This is from New One',
    link: 'This is from New One',
    image: '',
    tags: ['sd', 'asd'],
    posted_by: 'This is from New One',
    posted_by_email: 'test@gmail.com',
    category: '666a198b327443cd6e8079bf'
  });
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

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

    // axios.get('/api/tags')
    //   .then(response => {
    //     setTags(response.data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  }, []);

  useEffect(() => {
    console.log(CurrentTool)
  }, [CurrentTool])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTool({ ...CurrentTool, [name]: value });
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setCurrentTool({ ...CurrentTool, category: value });
  };

  // const handleTagChange = (event) => {
  //   const { value } = event.target;
  //   setNewTool({ ...newTool, tags: [...newTool.tags, value] });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('/api/aitool', CurrentTool)
      .then(async response => {

        if (response.data.ok) {
          setCurrentTool({
            name: '',
            description: '',
            link: '',
            image: '',
            tags: [],
            posted_by: '',
            posted_by_email: '',
            category: '6668c7cbb462421da75559f2'
          });
        }
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
        console.error('Error response:', error.response);
        console.error('Error message:', error.message);
      });


    // axios.post('/api/aitool', newTool)
    //   .then(response => {
    //     setTools([...tools, response.data]);
    //     console.log(tools)
    //     setNewTool({
    //       name: '',
    //       description: '',
    //       link: '',
    //       postedBy: '',
    //       category: '',
    //       tags: []
    //     });
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/tools/${id}`)
      .then(response => {
        setTools(tools.filter(tool => tool.id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">AI Tool Management System</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
              Tool Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="name"
              name='name'
              type="text"
              value={CurrentTool.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
              Tool Description
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="description"
              name='description'
              value={CurrentTool.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="link">
              Tool Link
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="link"
              name='link'
              type="text"
              value={CurrentTool.link}
              onChange={handleInputChange}
            />
          </div>


          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="posted_by">
              Posted By
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="posted_by"
              type="text"
              name='posted_by'
              value={CurrentTool.posted_by}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          {/* <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="category">
              Category
            </label>
            <select
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="category"
              name='category'
              value={newTool.category}
              onChange={handleCategoryChange}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div> */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            {/* <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tags">
              Tags
            </label>
            <select
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="tags"
              value={newTool.tags}
              onChange={handleTagChange}
              multiple
            >
              <option value="">Select a tag</option>
              {tags.map(tag => (
                <option key={tag.id} value={tag.name}>{tag.name}</option>
              ))}
            </select> */}
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="posted_by_email">
              Email Posted
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="posted_by_email"
              type="email"
              name='posted_by_email'
              value={CurrentTool.posted_by_email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Add Tool
        </button>
      </form>
      {/* <ul className="list-none mb-0">
        {tools.map(tool => (
          <li key={tool.id} className="py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold">{tool.name}</h2>
            <p className="text-gray-600">{tool.description}</p>
            <p className="text-gray-600">Posted by: {tool.postedBy}</p>
            <p className="text-gray-600">Category: {tool.category}</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDelete(tool.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default AIToolManagementSystem;
