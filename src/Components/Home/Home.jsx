import React, { useState } from 'react';
import '../Home/home.css';
import { Link } from 'react-router-dom';
import { CtiTxt } from '../Text/CtiTxt';

const ITEMS_PER_PAGE = 50;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Extract unique categories from CtiTxt
  const allCategories = Array.from(
    new Set(CtiTxt.flatMap((item) => item.catagory))
  );

  const filteredData = CtiTxt.filter((item) => {
    // Filter by category
    const categoryFilter =
      selectedCategory === '' || item.catagory.includes(selectedCategory);

    // Filter by name or title (case-insensitive) in English
    const searchFilter = searchText.toLowerCase();
    const isNameMatch = item.name.toLowerCase().includes(searchFilter);

    // Check if item.text is a string before using toLowerCase()
    const isTitleMatch =
      typeof item.text === 'string' &&
      item.text.toLowerCase().includes(searchFilter);

    // Filter by name or title (case-insensitive) in Bengali
    const isNameBengaliMatch = item.name.includes(searchText);

    // Check if item.text is a string before using includes()
    const isTitleBengaliMatch =
      typeof item.text === 'string' && item.text.includes(searchText);

    return (
      categoryFilter &&
      (isNameMatch || isTitleMatch || isNameBengaliMatch || isTitleBengaliMatch)
    );
  });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className='w-full'>
      {/* Search Bar and Category Filter */}
      <div className="flex flex-wrap space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border p-2 rounded-md w-64"
        />

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="">All Categories</option>
          {/* Generate category options dynamically */}
          {allCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="containerwr">
        {visibleData.map((item) => (
          <div key={item.id} className="cards">
            {/* Your existing code for displaying items */}
            <div className={`w-full px-2 py-1`} style={{ backgroundColor: item.ncol }}>
              <Link
                to={`/${item.title}`}
                className="text-[22px] font-semibold font-noto"
              >
                {item.name}
              </Link>
            </div>
            <p className="w-full h-[100px] font-noto text-[12px] overflow-hidden">
              {item.description }
            </p>
            <ul className="list-none p-0 m-0 flex">
              {item.catagory.map((category, index) => (
                <li key={index} className="mx-1 text-[13px] text-[blue]">
                  {category}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`pagination-btn ${
                currentPage === page ? 'active' : ''
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
