import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const images = [
  'https://fermeliadental.com/wp-content/uploads/2019/05/benefits-of-regular-dental-visits.jpeg',
  'https://domf5oio6qrcr.cloudfront.net/medialibrary/12039/4304238e-7b37-4747-ac28-d5769290e5d9.jpg',
  'https://medanta.s3.ap-south-1.amazonaws.com/blogs/September2024/Sl6A4AR0xWroNkrFXnsUGmrjIS1Y2Q-metaRGVudGFsIENoZWNrLVVwcy5qcGc=-.jpg'
];

const Banner2 = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full ">
      {/* Banner Section */}
      <div className="relative h-screen overflow-hidden max-h-[786px]">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 bg-opacity-70 flex flex-col justify-center gap-4 items-start z-20 ">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <p className="text-lg mb-2 text-white">Family Dental Care</p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
              Elevating Smiles with <br /> Expert Care and a <br /> Gentle Touch
            </h1>
<Link
  to="/#appointment"
  className="text-md mt-6 relative group text-white font-semibold px-6 py-3 rounded shadow overflow-hidden h-[48px] min-w-[180px] inline-flex items-center justify-center no-underline"
  style={{ textDecoration: 'none' }}
>
  {/* Outer layer with border + top text */}
  <span className="border border-white rounded-lg absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:border-transparent group-hover:bg-[#001F5B]">
    {/* Text that slides up AND fades out */}
    <span className="transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
      Book Appointment
    </span>
  </span>

  {/* Second text fading + sliding in from below */}
  <span className="rounded-lg absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100">
    Book Appointment
  </span>
</Link>

<Link
  to="/download/reports"
  className="text-md mt-2 ml-0 md:ml-2 relative group text-white font-semibold px-6 py-3 rounded shadow overflow-hidden h-[48px] min-w-[180px] inline-flex items-center justify-center no-underline"
  style={{ textDecoration: 'none' }}
>
  {/* Outer layer with border + top text */}
  <span className="border border-white rounded-lg absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:border-transparent group-hover:bg-orange-500">
    {/* Text that slides up AND fades out */}
    <span className="transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
      Download Report
    </span>
  </span>

  {/* Second text fading + sliding in from below */}
  <span className="rounded-lg absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100">
    Download Report
  </span>
</Link>


           <a
  href="https://g.co/kgs/UNBZRpR" // Replace with actual Google reviews link
  target="_blank"
  rel="noopener noreferrer"
  className="block"
>
  <div className="flex flex-col md:flex-row mt-4 gap-2 text-md text-white  cursor-pointer">
    <span className="ml-2">Google Rating</span>
    <span>
      <span className="ml-2 font-bold">5.0</span>
      <span className="ml-2 text-yellow-400">★★★★★</span>
    </span>
    <span className="ml-2 text-lg">Based on 23k Reviews</span>
  </div>
</a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner2;
