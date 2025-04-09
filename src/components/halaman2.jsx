import { useEffect, useState } from "react";
import image1 from "../assets/image1.jpeg";
import image2 from "../assets/image2.jpeg";
import image3 from "../assets/image3.jpeg";
import ig from "../assets/ig.png";

const Halaman2 = () => {
  // 🎯 Target waktu (ubah sesuai kebutuhanmu)
  const targetDate = new Date("2025-06-01T09:00:00");

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      const days = String(
        Math.floor(difference / (1000 * 60 * 60 * 24))
      ).padStart(2, "0");
      const hours = String(
        Math.floor((difference / (1000 * 60 * 60)) % 24)
      ).padStart(2, "0");
      const minutes = String(
        Math.floor((difference / 1000 / 60) % 60)
      ).padStart(2, "0");
      const seconds = String(Math.floor((difference / 1000) % 60)).padStart(
        2,
        "0"
      );

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <>
      <div className="relative">
        <img src={image1} alt="" className="w-full h-auto" />
        <div className="bg-black bg-opacity-15 absolute inset-0 "></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white  space-y-4 p-6 translate-y-24">
          <p className="text-xl">The Wedding of</p>
          <p className="font-allura text-5xl font-bold text-cyan-100">
            Sidqi & Aman
          </p>
          <p className="text-base mt-2">Menuju Hari Bahagia:</p>

          {/* ⏳ Countdown */}
          <div className="flex space-x-4 text-center mt-2 bg-black bg-opacity-30 p-2">
            <div>
              <p className="text-2xl font-bold">{timeLeft.days}</p>
              <p className="text-sm">Days</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{timeLeft.hours}</p>
              <p className="text-sm">Hours</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{timeLeft.minutes}</p>
              <p className="text-sm">Minutes</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{timeLeft.seconds}</p>
              <p className="text-sm">Seconds</p>
            </div>
          </div>
          <div className="text-center text-xs">
            "Cinta itu adalah perasaan yang mesti ada pada tiap-tiap diri
            manusia, ia laksana setetes embun yang turun dari langit, bersih dan
            suci"
          </div>
        </div>
      </div>
      <div className="mt-4 mx-5 relative">
        <img src={image2} alt="" className="w-full h-auto" />
        <div className="absolute bottom-4 w-full flex justify-center">
          <div className="bg-gray-300 bg-opacity-40 text-white px-4 py-3 rounded flex flex-col  gap-3 mx-5 ">
            <h1 className="text-4xl">Sidqi</h1>
            <h2 className="text-lg">Sidqi Amanullah</h2>
            <div className="flex items-center gap-2">
              <img src={ig} alt="" className="w-5 h-5" />
              <p>@sidqiaman</p>
            </div>
            <hr className="w-full border-white/30" />
            <p>Putra dari bapak lord thanos dan queen bumi</p>
          </div>
        </div>
      </div>
      <div className="mt-4 mx-5 relative">
        <img src={image3} alt="" className="w-full h-auto" />
        <div className="absolute bottom-4 w-full flex justify-center">
          <div className="bg-gray-300 bg-opacity-40 text-white px-4 py-3 rounded flex flex-col  gap-3 mx-5 ">
            <h1 className="text-4xl">Sidqi</h1>
            <h2 className="text-lg">Sidqi Amanullah</h2>
            <div className="flex items-center gap-2">
              <img src={ig} alt="" className="w-5 h-5" />
              <p>@sidqiaman</p>
            </div>
            <hr className="w-full border-white/30" />
            <p>Putra dari bapak lord thanos dan queen bumi</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Halaman2;
