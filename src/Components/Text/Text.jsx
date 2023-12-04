// Text.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Data } from './CtiTxt';

const Text = () => {
  const { username } = useParams();
  // const history = useHistory();

  return (
    <div>
      <div className='w-full flex justify-center'>
        <div className='w-[600px] bg-blue-400 p-5'>
          {/* <button onClick={() => history.goBack()}>
            Go Back{username}
          </button> */}
          
            {
                Data.map((item)=>(
                  <div className='w-full' key={item.id}>
              <h1 className='text-[30px] my-4'>{item.name}</h1>
              <p className='text-[15px] text-justify font-noto font-semibold'>
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
