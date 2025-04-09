import backgroundImage from "../assets/wedding_template_1.png";
import halaman1logo from "../assets/halaman1logo.png";
import logoletter from "../assets/letter.png";
import { useNavigate } from "react-router-dom";

const Halaman1 = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div
        className="w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className=" items-center justify-center gap-7 -translate-y-3 h-full text-white text-2xl flex flex-col">
          {/* Menambahkan gambar halaman1logo */}
          <img
            src={halaman1logo}
            alt="halaman1logo"
            className="mb-4 h-32 w-40 translate-y-5"
          />
          <p className="text-customGreen  text-2xl font-lora ">Pernikahan</p>
          <p className="font-allura text-customGreen text-4xl">Sidqi & Aman</p>
          <div className="flex justify-center flex-col items-center gap-3">
            <p className=" text-customGreen text-xl font-lora">
              Special Invite To
            </p>
            <p className="text-customGreen text-xl font-lora">cipaw</p>
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
