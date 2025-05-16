import React, { useEffect, useState } from "react";
import { HiLocationMarker } from "react-icons/hi";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 2,
    minutes: 0,
    seconds: 0,
  });

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(countdown);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const formatTime = (num) => String(num).padStart(2, "0");

  if (!visible) return null;

  return (
    <div className="fixed right-5 bottom-5 bg-white shadow-xl w-[280px] rounded-2xl p-5 z-50 font-sans border border-blue-500">
      <button
        onClick={() => setVisible(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
        aria-label="Close countdown"
      >
        &#x2715;
      </button>

      <h2 className="text-xl text-blue-600 font-semibold mb-2 uppercase text-center">
        Upcoming Dental Event
      </h2>
      <p className="text-gray-500 text-center mb-4 text-sm px-2">
        Join our dental health awareness camp! Book your appointment now.
      </p>

      <div className="flex justify-center items-center space-x-4 mb-6">
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Minutes", value: timeLeft.minutes },
          { label: "Seconds", value: timeLeft.seconds },
        ].map(({ label, value }) => (
          <div key={label} className="text-center">
            <div className="text-3xl font-bold text-blue-500">
              {formatTime(value)}
            </div>
            <div className="text-xs uppercase tracking-widest text-gray-500">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Location - Improved styling */}
      <div className="flex items-center justify-center text-white  bg-blue-700 text-sm font-medium py-2 px-3 rounded-lg shadow-inner">
        <HiLocationMarker className="mr-1 text-lg" />
        Dental Clinic, Main Street, NY
      </div>
    </div>
  );
};

export default Countdown;
