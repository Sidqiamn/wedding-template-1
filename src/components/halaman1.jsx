import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import backgroundImage from "../assets/wedding_template_1.png";
import halaman1logo from "../assets/halaman1logo.png";
import logoletter from "../assets/letter.png";

const Halaman1 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Preload gambar
  useEffect(() => {
    const images = [backgroundImage, halaman1logo, logoletter];

    const preloadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => reject();
      });
    };

    Promise.all(images.map((src) => preloadImage(src)))
      .then(() => {
        setIsLoading(false); // Semua gambar selesai dimuat
      })
      .catch((err) => {
        console.error("Gagal memuat gambar:", err);
        setIsLoading(false); // Tetap lanjut meski gagal
      });
  }, []);

  // Tampilkan loading jika masih memuat
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  // Konten utama setelah loading selesai
  return (
    <div className="">
      <div
        className="w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="items-center justify-center gap-7 -translate-y-3 h-full text-white text-2xl flex flex-col">
          <img
            src={halaman1logo}
            alt="halaman1logo"
            className="mb-4 h-32 w-40 translate-y-5"
          />
          <p className="text-customGreen text-2xl font-lora">Pernikahan</p>
          <p className="font-allura text-customGreen text-4xl">Sidqi & Aman</p>
          <div className="flex justify-center flex-col items-center gap-3">
            <p className="text-customGreen text-xl font-lora">
              Special Invite To
            </p>
            <p className="text-customGreen text-xl font-lora">
              Keluarga besar ujang
            </p>
          </div>
          <div className="text-base rounded justify-center items-center bg-customGreen px-2 py-1 flex">
            <img src={logoletter} className="h-8 w-8" alt="" />
            <button
              onClick={() => navigate("/undangan")}
              className="text-base rounded bg-customGreen px-3 py-2 text-white"
            >
              Buka Undangan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Halaman1;
