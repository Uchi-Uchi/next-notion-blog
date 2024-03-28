import React from 'react';

const TitleVar = () => {
  return (
    <>
      <div className="relative mb-5">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/TitleVarImege.jpg")', opacity: '0.3' }}></div>
        <div className="relative z-10 flex justify-center items-center"> 
          <h1 className="text-gray-900 mt-20 mb-20 text-5xl font-medium text-center">
            SKILLUP BLOG
          </h1>
        </div>
      </div>
    </>
  );
};

export default TitleVar;