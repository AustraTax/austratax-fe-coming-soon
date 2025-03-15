"use client";

import { useState, useEffect } from "react";

export default function ComingSoon() {
  const targetDate = new Date("2025-04-30T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
        Austratax <span className="text-[#ed8936]">Coming Soon</span>
      </h1>
      <p className="mt-4 text-base sm:text-lg md:text-xl font-semibold text-gray-700 max-w-2xl">
        Empowering You to Master Your Taxes.
      </p>
      <p className="mt-6 text-sm sm:text-base text-gray-600 max-w-lg">
        We’re launching soon! Stay tuned.
      </p>

      {/* Countdown Timer */}
      <div className="mt-8 flex space-x-4 text-2xl sm:text-3xl font-semibold">
        <div className="flex flex-col items-center">
          <span className="text-[#ed8936]">{timeLeft.days}</span>
          <span className="text-gray-600 text-sm">Days</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[#ed8936]">{timeLeft.hours}</span>
          <span className="text-gray-600 text-sm">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[#ed8936]">{timeLeft.minutes}</span>
          <span className="text-gray-600 text-sm">Minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[#ed8936]">{timeLeft.seconds}</span>
          <span className="text-gray-600 text-sm">Seconds</span>
        </div>
      </div>

      <div className="mt-10 w-full flex justify-center">
        <img
          src="/mainimage.png" // Replace with actual image path
          alt="Coming Soon Illustration"
          className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 max-w-lg"
        />
      </div>
    </div>
  );
}
