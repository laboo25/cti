import React, { useState } from 'react';
import '../Home/home.css';
import { Data } from './CtiList';
import { Link } from 'react-router-dom';

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Adjust as needed

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Reset to the first page when category changes
    };

    const uniqueCategories = Array.from(
        new Set(Data.flatMap((item) => item.catagory || [])),
    );

    const filterByCategory = (category) => {
        handleCategoryChange(category);
    };

    const filteredData =
        selectedCategory === 'All'
            ? Data
            : Data.filter((item) => (item.catagory || []).includes(selectedCategory));

    const filteredAndSearchedData = filteredData.filter((item) => {
        const itemName = item.name && item.name.toLowerCase();
        const itemTitle = item.title && item.title.toLowerCase();
        const itemCategory = item.catagory && typeof item.catagory === 'string' && item.catagory.toLowerCase();

        return (
            (itemName && itemName.includes(searchQuery.toLowerCase())) ||
            (itemTitle && itemTitle.includes(searchQuery.toLowerCase())) ||
            (itemCategory && itemCategory.includes(searchQuery.toLowerCase()))
        );
    });

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAndSearchedData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div>
                <div>
                    <div className="filter">
                        <input
                            type="text"
                            placeholder="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button onClick={() => filterByCategory('All')} className="text-white">
                            all
                        </button>
                        {uniqueCategories.map((category) => (
                            <button key={category} onClick={() => filterByCategory(category)}>
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="containerwr bg-[#dedede] mx-auto">
                    {filteredAndSearchedData.map((item) => (
                        <div className="cards" key={item.id}>
                            <div className="title w-full p-[5px]" style={{ backgroundColor: item.ncol }}>
                                <h2 className="text-[18px] font-bold capitalize">
                                    {item.name}
                                </h2>
                            </div>
                            <div className="w-full h-[100px] p-[5px] overflow-hidden bg-[#677077] border-b-[1px] border-black">
                                <Link to={item.to}>
                                    <p className="text-[12px] text-[#3f464c] text-justify">{item.description}</p>
                                </Link>
                            </div>
                            <div className="tag w-full h-auto p-[5px] bg-[#677077]">
                                <ul className="text-[13px] uppercase text-[blue] flex">
                                    {item.catagory.map((categoryItem) => (
                                        <li className='mr-2' key={categoryItem}>{categoryItem}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}

                </div>
                <div className="pagination flex justify-center py-3">
                    {Array.from({ length: Math.ceil(filteredAndSearchedData.length / itemsPerPage) }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={currentPage === index + 1 ? 'active bg-red-600' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
