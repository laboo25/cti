import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Data } from './CtiTxt';
import '../Text/text.css'

const Text = () => {
  const { username } = useParams();

  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Show the back-to-top button when scrolling down and scroll position is over 100vh
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
    <div>
      <div className='w-full flex justify-center bg-[#6d6d6d]'>
        <div className='wrap w-[600px] bg-[#0f172a] p-5'>

          {/* Back to Home Button */}
          <Link to="/" className="back-to-home-button">
            Back to Home
          </Link>

          {/* Your existing content goes here */}

          {
            Data.map((item) => (
              <div className='w-full' key={item.id}>
                <h1 className='text-[30px] font-bold font-noto my-4' style={{ color: item.ncol }}>{item.name}</h1>
                <p className='text-[12px] text-justify font-noto font-light uppercase text-[blue] py-[10px]'>
                  {
                    item.catagory.map((catagory) => (
                      <span className='mr-3' key={catagory}>
                        {catagory}
                      </span>
                    ))
                  }
                </p>
                <p className='text-[15px] text-justify font-noto font-semibold text-[#6d6d6d] leading-8'>
                  {item.text}
                </p>
                <p><br /><br /><br /><br /><br /><br /><br /></p>
              </div>
            ))
          }

          {/* Back to Top Button */}
          <button
            className={`back-to-top-button ${showBackToTop ? 'visible' : ''}`}
            onClick={scrollToTop}
          >
            ▲
          </button>

        </div>
      </div>
    </div>
  );
};

export default Text;
