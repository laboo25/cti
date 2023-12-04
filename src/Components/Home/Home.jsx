import React, { useState } from 'react'
import '../Home/home.css'
import { Data } from './CtiList'
import { Link } from 'react-router-dom'

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const handleCategoryChange = (catagory) => {
        setSelectedCategory(catagory);
    };

    const uniqueCategories = Array.from(
        new Set(Data.flatMap((item) => item.catagory)),
    );

    const filterByCategory = (category) => {
        handleCategoryChange(category);
    };

    const filteredData =
        selectedCategory === "All"
            ? Data
            : Data.filter((item) => item.catagory.includes(selectedCategory));

    return (
        <>
            <div>
                <div>
                    <div className="filter ">
                        <button onClick={() => filterByCategory("All")} className='text-white'>All</button>
                        {uniqueCategories.map((category) => (
                            <button key={category} onClick={() => filterByCategory(category)}>
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='containerwr bg-[#dedede] mx-auto'>
                    {
                        filteredData.map((item) => (
                            <div className='cards' key={item.id}>
                                <div className='title w-full p-[5px]' style={{ backgroundColor: item.ncol }}>
                                    <h2 className='text-[18px] font-bold capitalize'>{item.name}</h2>
                                </div>
                                <div className='w-full h-[100px] p-[5px] overflow-hidden bg-[#677077] border-b-[1px] border-black'>
                                    <Link to={item.to}>
                                        <p className='text-[12px] text-[#3f464c] text-justify'>{item.description}</p>
                                    </Link>
                                </div>
                                <div className='w-full h-auto p-[5px] bg-[#677077]'>
                                    <ul className='text-[13px] uppercase text-[blue]'>
                                        <li>tag</li>
                                    </ul>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Home