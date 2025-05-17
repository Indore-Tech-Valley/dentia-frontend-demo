import React from 'react';

const Header = ({ title, image }) => {
  return (
    <div
      className="relative h-[300px] flex items-center justify-center text-white text-center"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient overlay: same as in Banner2 */}
      <div className="absolute inset-0 bg-indigo-800 bg-opacity-70

" />

      {/* Content */}
      <div className="relative z-10 px-4">
        <h2 className=" sm:text-4xl lg:text-5xl font-bold leading-tight">{title}</h2>
      </div>
    </div>
  );
};

export default Header;
