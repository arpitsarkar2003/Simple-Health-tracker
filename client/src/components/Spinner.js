import React from 'react';

function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-blue-500 border-t-transparent"></div>
    </div>
  );
}

export default Spinner;
