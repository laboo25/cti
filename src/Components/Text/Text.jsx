// Text.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Data } from './CtiTxt';

const Text = () => {
  const { username } = useParams();
  // const history = useHistory();

  return (
    <div>
      <div className='w-full flex justify-center bg-[#6d6d6d]'>
        <div className='w-[600px] bg-[#0f172a] p-5'>
          {/* <button onClick={() => history.goBack()}>
            Go Back{username}
          </button> */}
          
            {
                Data.map((item)=>(
                  <div className='w-full' key={item.id}>
              <h1 className='text-[30px] my-4'>{item.name}</h1>
              <p className='text-[12px] text-justify font-noto font-light uppercase  py-[10px]'>
              {
                item.catagory.map((catagory)=>{
                  return (
                    
                      <span className='mr-3' key={catagory}>
                      {catagory}
                    </span>
                    
                  )
                })
              }
              </p>
              <p className='text-[15px] text-justify font-noto font-semibold text-[#6d6d6d] leading-8'>
                {item.text}
              </p>
            </div>
                ))
            }
          
        </div>
      </div>
    </div>
  );
};

export default Text;
