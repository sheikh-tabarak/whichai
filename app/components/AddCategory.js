"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'



const AddCategory = () => {

    const [Refresh, setRefresh] = useState()

    const [CategoryList, setCategoryList] = useState([])


    const [Update, setUpdate] = useState({
        status: "",
        id: ""
    });

    const [CurrentCategory, setCurrentCategory] = useState({
        name: "",
        icon: "",
        description: ""
    })

    useEffect(() => {
        console.log(CurrentCategory)
    }, [CurrentCategory])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentCategory({ ...CurrentCategory, [name]: value });
    };

    useEffect(() => {

        axios.get('/api/categories')
            .then(async response => {

                if (response.data) {
                    setCategoryList(response.data)
                }
            })
            .catch(error => {
                console.error('Error:', error);
                console.error('Error response:', error.response);
                console.error('Error message:', error.message);
            });

    }, [Refresh])

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/categories', CurrentCategory)
            .then(async response => {

                if (response.data.ok) {
                    setCurrentCategory({
                        name: "",
                        icon: "",
                        description: ""
                    })
                }
                console.log(response.data);

                setRefresh(!Refresh)
            })
            .catch(error => {
                console.error('Error:', error);
                console.error('Error response:', error.response);
                console.error('Error message:', error.message);
            });
    };


    const deleteCategory = (id) => {

        event.preventDefault();
        axios.delete('/api/categories/' + id)
            .then(async response => {
                if (response.data.ok) {
                    setRefresh(!Refresh)
                }
                console.log(response.data);

                setRefresh(!Refresh)
            })
            .catch(error => {
                console.error('Error:', error);
                console.error('Error response:', error.response);
                console.error('Error message:', error.message);
            });
    }



    const updateCategory = (id) => {

        event.preventDefault();
        axios.put('/api/categories/' + id, CurrentCategory)
            .then(async response => {
                if (response.data.ok) {
                    setRefresh(!Refresh)
                }
                console.log(response.data);

                // setRefresh(!Refresh)
            })
            .catch(error => {
                console.error('Error:', error);
                console.error('Error response:', error.response);
                console.error('Error message:', error.message);
            });
    }



    return (
        <div>
            <form onSubmit={handleSubmit} action="">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                    Category Name
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                    id="name"
                    name='name'
                    type="text"
                    value={CurrentCategory.name}
                    onChange={handleInputChange}
                />

                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="icon">
                    Icon
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                    id="icon"
                    name='icon'
                    type="text"
                    value={CurrentCategory.icon}
                    onChange={handleInputChange}
                />

                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                    Category Destription
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                    id="description"
                    name='description'
                    type="text"
                    value={CurrentCategory.description}
                    onChange={handleInputChange}
                />

                <button type='submit'>
                    Add new
                </button>

                <button onClick={() => {
                    updateCategory(Update.id)

                }}>Update this</button>

            </form>


            <div>
                {
                    CategoryList.map((category) => {
                        return <div>

                            {category.name} - {category._id}

                            <div><button onClick={() => deleteCategory(category._id)}>Delete this</button></div>
                            <div><button onClick={() => {
                                
                                setCurrentCategory({
                                    name: category.name,
                                    icon: category.icon,
                                    description: category.description,
                                })

                                setUpdate({
                                    ...Update, id: category._id
                                })

                            }}>Update this</button></div>
                        </div>
                    })
                }
            </div>



        </div>
    )
}

export default AddCategory