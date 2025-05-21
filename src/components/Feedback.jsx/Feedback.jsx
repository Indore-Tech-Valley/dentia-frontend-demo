import React from 'react';

const Feedback = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-10 font-sans">
      {/* Left side form */}
      <div className="md:w-1/2 bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-center">
        <h2 className="mb-8 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1d42] leading-tight">
          Send Us Your Feedback
        </h2>
        <form className="flex flex-col gap-4 text-base text-gray-700">
          <label className="flex flex-col font-medium">
            Name
            <input
              type="text"
              placeholder="Your Name"
              className="mt-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </label>

          <label className="flex flex-col font-medium">
            Email
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </label>

          <label className="flex flex-col font-medium">
            Message
            <textarea
              placeholder="Write your message here..."
              rows={6}
              className="mt-1 px-4 py-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </label>
<button
  type="submit"
  className="relative group bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors duration-300 hover:bg-[#10244b] overflow-hidden"
>
  <div className="relative h-[24px]">
    {/* Top text slides up and fades out */}
    <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
      Submit Feedback
    </span>

    {/* Bottom text slides in and fades in */}
    <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
      Submit Feedback
    </span>
  </div>
</button>

        </form>
      </div>

      {/* Right side map */}
      <div className="md:w-1/2 rounded-2xl overflow-hidden shadow-lg" style={{ minHeight: 450 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58893.39508171018!2d75.87305547602554!3d22.697103876963777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962e3bc149248a7%3A0x47f0fefe2ffcab6a!2sIndore%20Tech%20Valley%20-%20Coworking%20Space%20%26%20Business%20Center!5e0!3m2!1sen!2sin!4v1747375013817!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: '450px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Indore Tech Valley Location"
        />
      </div>
    </div>
  );
};

export default Feedback;
