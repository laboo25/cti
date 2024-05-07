import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CtiTxt } from '../Text/CtiTxt';
import "../Text/text.css";

const Text = () => {
  const { title } = useParams();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const item = CtiTxt.find((item) => item.title.toLowerCase() === title.toLowerCase());

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowBackToTop(scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sortedItems = CtiTxt.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div className={`w-full body ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
        <div className='textcontainer bg-[#f4f3ee]'>
          <div className='coverph w-full h-[250px]'>
            <img src={item.cover} alt="" className='w-full h-full object-contain' />
          </div>
          <div className={`w-full p-2 ${isDarkMode ? '#6A0DAD' : ''}`}>
            <h1 className={`text-[30px] font-bold my-1 mb-6 ${isDarkMode ? 'text-[white]' : 'text-red-500'}`} style={{ color: item.ncol }}>
              {item.name}
            </h1>
            <div className={`text font-noto leading-8 w-full text-[#353535] ${isDarkMode ? ' text-[#8B008B]' : 'text-[#00171f]'}`}>
              {item.text}
              <div>
                <br /><br /><br /><br /><br /><br />
              </div>
            </div>
          </div>
        </div>

        <button
          className={`w-6 h-6 fixed bottom-8 right-8 rounded-full ${isDarkMode ? 'bg-gray-800 text-white' : ' text-black'}`}
          onClick={scrollToTop}
        >
          ▲
        </button>

        <button
          className={`absolute top-4 right-4 p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-[#ffffff48] text-black'}`}
          onClick={toggleTheme}
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </div>
    </>
  );
};

export default Text;
