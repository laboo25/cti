import React, { useState, useEffect } from 'react';
import "../Text/text.css"
import { Link, useParams } from 'react-router-dom';
import { CtiTxt } from '../Text/CtiTxt';

const Text = () => {
  const { title } = useParams();
  const [showBackToTop, setShowBackToTop] = useState(false);

  const item = CtiTxt.find((item) => item.title === title);

  if (!item) {
    return <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
      <p className="text-xl font-semibold mb-4">Page not found</p>
      <p className="text-gray-600 mb-8">The page you are looking for might be in another castle.</p>
      <Link href="/">
        <a className="text-blue-500 hover:underline">Go back home</a>
      </Link>
    </div>
  </div>;
  }

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setShowBackToTop(scrollY > window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className='  w-full'>
        <div className=' textcontainer bg-gray-500'>
        <div className='w-full h-[250px]'>
          <img src={item.cover} alt="" className='w-full h-full object-contain' />
        </div>
        <div className='p-2'>
          <h1 className='text-[30px] font-bold my-1 mb-6' style={{ color: item.ncol }}>{item.name}</h1>
          <div className='font-noto leading-8 w-full'>{item.text}</div>
        </div>
      </div>

      {showBackToTop && (
        <button className='w-6 h-6 fixed bottom-8 right-8 bg-[#ffffff48] text-black rounded-full'
                onClick={scrollToTop}>
          ▲
        </button>
      )}
      </div>
    </>
  );
};

export default Text;

