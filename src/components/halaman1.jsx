import backgroundImage from "../assets/wedding_template_1.png";
import halaman1logo from "../assets/halaman1logo.png";
import logoletter from "../assets/letter.png";

const Halaman1 = () => {
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
          <p className="text-customGreen text-3xl ">Pernikahan</p>
          <p className="font-allura text-customGreen text-5xl">Sidqi & Aman</p>
          <div className="flex justify-center flex-col items-center gap-3">
            <p className=" text-customGreen">Special Invite To</p>
            <p className="text-customGreen">Keluarga Besar Hampor</p>
          </div>
          <div className="text-base rounded justify-center items-center bg-customGreen px-2 py-1 flex">
            <img src={logoletter} className="h-8 w-8" alt="" />
            <button className="text-base rounded bg-customGreen px-3 py-2 text-white">
              Buka Undangan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Halaman1;
