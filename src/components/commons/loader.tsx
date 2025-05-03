import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10 border-4 border-red-300 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
