import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import imagecouple from "../assets/imagecouple.jpg";
import imagecouple2 from "../assets/imagecouple2.jpg";
import imagecouple3 from "../assets/imagecouple3.jpg";
import imagecouple4 from "../assets/imagecouple4.jpg";
import imagesolo1 from "../assets/imagesolo1.jpg";
import landscape from "../assets/landscape.jpg";
import solo2 from "../assets/solo2.jpg";
import Snowfall from "react-snowfall";
import igblack from "../assets/igblack.png";
import ig from "../assets/ig.png";
import wa from "../assets/wa.png";
import image4 from "../assets/imag4.jpg";
import image5 from "../assets/image5.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import sanitizeHtml from "sanitize-html";

const Halaman2 = () => {
  const targetDate = new Date("2025-09-01T09:00:00");
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    message: "",
    status: "",
  });
  const [gambarsekarang, setGambarSekarang] = useState(imagecouple2);
  const lagu = "/assets/shanefilan.mp3";
  const [isPlaying, setIsPlaying] = useState(true);
  const [audio] = useState(
    typeof Audio !== "undefined" ? new Audio(lagu) : null
  );

  // Preload gambar
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    const images = [
      imagecouple,
      imagecouple2,
      imagecouple3,
      imagecouple4,
      imagesolo1,
      landscape,
      solo2,
      igblack,
      ig,
      wa,
      image4,
      image5,
    ];

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

  // Mengambil komentar dari Firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "comments-09"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(data);
      },
      (err) => {
        console.error("Gagal mendengarkan komentar:", err);
        alert("Terjadi kesalahan saat memuat komentar.");
      }
    );

    return () => unsubscribe();
  }, []);

  // Logika countdown
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

  // Mengontrol audio
  useEffect(() => {
    if (!audio) return;
    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (!audio) return;
    return () => {
      audio.pause();
    };
  }, [audio]);

  // Mengirim komentar
  const handleSubmit = async (e) => {
    e.preventDefault();
    const sanitizedForm = {
      name: sanitizeHtml(form.name, { allowedTags: [], allowedAttributes: {} }),
      message: sanitizeHtml(form.message, {
        allowedTags: [],
        allowedAttributes: {},
      }),
      status: form.status,
    };

    if (
      !sanitizedForm.name ||
      !sanitizedForm.message ||
      !sanitizedForm.status
    ) {
      return alert("Harap lengkapi semua kolom form.");
    }
    if (sanitizedForm.name.length > 50) {
      return alert("Nama tidak boleh lebih dari 50 karakter.");
    }
    if (sanitizedForm.message.length < 5) {
      return alert("Ucapan minimal 5 karakter.");
    }

    try {
      await addDoc(collection(db, "comments-09"), {
        ...sanitizedForm,
        createdAt: new Date(),
      });
      setForm({ name: "", message: "", status: "" });
      alert("Komentar berhasil dikirim!");
    } catch (err) {
      console.error("Gagal mengirim komentar:", err);
      alert("Gagal mengirim komentar. Silakan coba lagi.");
    }
  };

  // Fungsi untuk mengubah gambar galeri
  function ubahgambar(params) {
    setGambarSekarang(params);
  }

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
    <div className="overflow-x-hidden">
      <Snowfall
        snowflakeCount={50}
        color="#a3e2f2"
        speed={[0.5, 1.5]}
        wind={[-0.5, 0.5]}
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />

      <div className="relative">
        <img src={imagecouple} alt="Couple" className="w-full h-auto" />
        <div className="bg-black bg-opacity-15 absolute inset-0"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-4 p-6 translate-y-24">
          <p className="text-xl">The Wedding of</p>
          <p className="font-allura text-5xl font-bold text-cyan-100">
            Sidqi & Aman
          </p>
          <p className="text-base mt-2">Menuju Hari Bahagia:</p>

          {/* Countdown */}
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
            <q>
              Cinta itu adalah perasaan yang mesti ada pada tiap-tiap diri
              manusia, ia laksana setetes embun yang turun dari langit, bersih
              dan suci
            </q>
            <p className="mt-2 font-bold">- Buya Hamka -</p>
          </div>
        </div>
      </div>

      <div className="mt-4 mx-3 relative">
        <img src={imagesolo1} alt="Solo 1" className="w-full h-auto" />
        <div className="absolute bottom-4 w-full flex justify-center">
          <div className="bg-gray-300 bg-opacity-40 text-black px-4 py-3 rounded flex flex-col gap-3 mx-5">
            <h1 className="text-4xl font-lora">Sidqi</h1>
            <h2 className="text-lg">Sidqi Amanullah</h2>
            <div className="flex items-center bg-opacity-30 p-2 bg-gray-500 gap-2">
              <img src={igblack} alt="Instagram" className="w-5 h-5" />
              <p>@sidqiaman</p>
            </div>
            <hr className="w-full border-white/30" />
            <p className="italic">
              Putra dari bapak lord thanos dan queen bumi
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 mx-3 relative" data-aos="zoom-in">
        <img src={solo2} alt="Solo 2" className="w-full h-auto" />
        <div className="absolute bottom-4 w-full flex justify-center">
          <div className="bg-gray-300 bg-opacity-40 text-black px-4 py-3 rounded flex flex-col gap-3 mx-5">
            <h1 className="text-4xl font-lora">Aman</h1>
            <h2 className="text-lg">Sidqia Amanull</h2>
            <div className="flex items-center gap-2 bg-gray-400 bg-opacity-30 p-2">
              <img src={igblack} alt="Instagram" className="w-5 h-5" />
              <p>@amansidqi</p>
            </div>
            <hr className="w-full border-white/30" />
            <p className="italic">
              Putra dari bapak lord thanos dan queen bumi
            </p>
          </div>
        </div>
      </div>

      <div data-aos="fade-up">
        <p className="text-center mt-10 mx-5 text-xs">
          <q>
            Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
            pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung
            merasa tenteram kepadanya. Dan Dia menjadikan di antaramu rasa kasih
            dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat
            tanda-tanda kebesaran Allah bagi kaum yang berpikir
          </q>
        </p>
        <div className="flex items-center justify-center gap-4 mt-5">
          <hr className="w-20 border-t border-gray-400" />
          <p className="text-gray-700 uppercase tracking-widest font-bold text-xs">
            ar-rum
          </p>
          <hr className="w-20 border-t border-gray-400" />
        </div>
      </div>

      <div className="mt-10 relative" data-aos="zoom-in-left">
        <img src={image4} alt="Image 4" className="opacity-30" />
        <div className="absolute top-0 flex mt-10 justify-center items-center flex-col w-full">
          <p className="text-4xl font-extralight">
            Save <p className="inline font-allura text-gray-500">The</p> Date
          </p>
          <p className="text-xs text-center mt-7">
            Dengan Memohon rahmat dan ridho Allah SWT, Kami Mengundang
            Bapak/Ibu/Saudara/i, untuk menghadiri acara pernikahan Kami.
            InsyaAllah kami akan menyelenggarakan acara pernikahan:
          </p>
          <div className="mx-20 mt-6">
            <img src={image5} alt="Image 5" />
          </div>
        </div>
      </div>

      <div
        className="flex text-xl flex-col mt-10 justify-center items-center gap-8"
        data-aos="fade-up"
      >
        <h1 className="font-playfair text-2xl">Wedding Event</h1>
        <h1 className="text-gray-500 font-bold tracking-wider font-lora">
          Akad Nikah
        </h1>
        <div className="text-base text-center">
          <h3 className="italic font-semibold">Minggu, 12 Januari 2030</h3>
          <h4>09.00 - Selesai</h4>
        </div>
        <div className="text-base text-center">
          <h3 className="bold italic font-semibold">
            Kediaman Mempelai Wanita
          </h3>
          <h4>Perum Griya Bumi Praja, Kab. Garut</h4>
        </div>
        <div className="text-base text-center border border-black bg-slate-300 p-2">
          <p>Google Maps</p>
        </div>

        <div className="bg-gray-300 text-black px-5 pt-5 flex flex-col items-center w-full">
          <h1 className="font-bebas text-3xl tracking-wider">Galeri</h1>
          <h2>Sidqi & Aman</h2>
          <div className="bg-white p-4 pb-7 mt-5" data-aos="fade-left">
            <img src={landscape} alt="Landscape" />
          </div>
          <div className="bg-white p-2 mt-5" data-aos="fade-up">
            <img src={gambarsekarang} alt="Current Image" />
            <div className="gap-2 grid grid-cols-3 pt-2">
              <img
                onClick={() => ubahgambar(imagecouple3)}
                className="basis-1/3 w-full h-auto object-cover"
                src={imagecouple3}
                alt="Couple 3"
              />
              <img
                onClick={() => ubahgambar(imagecouple4)}
                className="basis-1/3 w-full h-auto object-cover"
                src={imagecouple4}
                alt="Couple 4"
              />
              <img
                onClick={() => ubahgambar(imagecouple2)}
                className="basis-1/3 w-full h-auto object-cover"
                src={imagecouple2}
                alt="Couple 2"
              />
            </div>
          </div>
          <div className="h-0.5 w-full bg-white mt-10"></div>

          <div className="mt-10 text-center">
            <h1>RSVP & WISHES</h1>
            <h3 className="text-base">Konfirmasi Kehadiran & Ucapan Selamat</h3>
          </div>
          <div
            data-aos="zoom-in"
            className="mt-10 p-2 text-center text-white bg-gray-500 w-full flex justify-center flex-col items-center border-white border-4"
          >
            <p>{comments.length} Comments</p>
            <div className="flex flex-row gap-5 mt-4">
              <div className="flex w-20 border rounded-lg text-sm border-white justify-center flex-col items-center">
                <h1 className="font-bold">
                  {comments.filter((c) => c.status === "hadir").length}
                </h1>
                <h2>Hadir</h2>
              </div>
              <div className="flex w-20 border text-base rounded-lg border-white justify-center flex-col items-center">
                <h1 className="font-bold">
                  {comments.filter((c) => c.status === "tidak_hadir").length}
                </h1>
                <h2 className="text-xs">Tidak Hadir</h2>
              </div>
              <div className="flex w-20 border text-base rounded-lg border-white justify-center flex-col items-center">
                <h1 className="font-bold">
                  {comments.filter((c) => c.status === "masih_ragu").length}
                </h1>
                <h2 className="text-xs">Masih Ragu</h2>
              </div>
            </div>
            <div className="h-0.5 w-full bg-white mt-10"></div>

            <div>
              <form onSubmit={handleSubmit}>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-4 p-2 w-full text-base text-black border border-gray-300 rounded-md"
                  type="text"
                  placeholder="Name"
                />
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="mt-4 p-2 h-20 w-full border text-base text-black border-gray-300 rounded-md resize-none"
                  placeholder="Ucapan"
                />
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="mt-4 p-2 text-black w-full text-base border border-gray-300 rounded-md"
                  name="status"
                >
                  <option value="">Pilih status kehadiran</option>
                  <option value="hadir">Hadir</option>
                  <option value="tidak_hadir">Tidak Hadir</option>
                  <option value="masih_ragu">Masih Ragu</option>
                </select>
                <button
                  type="submit"
                  className="mt-4 p-1 font-bold text-lg rounded-md w-full bg-gray-400 text-white"
                >
                  Kirim
                </button>
              </form>

              <div className="h-0.5 w-full bg-white mt-10"></div>
              <div id="comments">
                {comments.length === 0 ? (
                  <p className="text-center text-gray-300">
                    Belum ada komentar.
                  </p>
                ) : (
                  comments
                    .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate())
                    .map((c) => (
                      <div
                        key={c.id}
                        className="flex gap-1 mb-5 flex-col text-sm justify-start items-start pl-7 pt-4"
                      >
                        <h1 className="font-bold">{sanitizeHtml(c.name)}</h1>
                        <p>{sanitizeHtml(c.message)}</p>
                        <p className="text-xs italic text-gray-300">
                          {c.status}
                        </p>
                        <hr />
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          data-aos="zoom-out"
          id="Gift"
          className="flex gap-5 mb-10 mx-4 justify-center items-center flex-col"
        >
          <h1>WEDDING GIFT</h1>
          <h2 className="text-xs text-center">
            Mungkin karena jarak, waktu ataupun keadaan yang menghalangi untuk
            hadir dalam momen bahagia kami, Silakan klik tombol di bawah untuk
            mengirimkan kado/hadiah.
          </h2>
          <h3 className="text-base">082329392901</h3>
          <button className="bg-gray-400 p-2 px-4 text-xs border border-black text-white">
            Bank Dana
          </button>
          <p className="text-xs">A/n. Sidqi Ganteng</p>
          <h3 className="text-base">1444111112</h3>
          <button className="bg-gray-400 p-2 px-4 text-xs border border-black text-white">
            Bank BCA
          </button>
          <p className="text-xs">A/n. Sidqi Ganteng</p>
        </div>

        <div
          className="relative flex justify-center items-center flex-col"
          data-aos="fade-in"
        >
          <img className="opacity-70" src={imagecouple2} alt="Couple 2" />
          <div className="absolute -translate-y-20 w-screen px-10">
            <div className="text-center bg-opacity-50 bg-black text-white border-white border-4 py-20 p-2 rounded-t-full">
              <p className="opacity-100 font-playfair tracking-wider">
                Terima Kasih
              </p>
              <p className="opacity-100 tracking-widest text-2xl mt-6 mb-6 font-allura">
                Kami yang berbahagia
              </p>
              <p className="text-base">Kedua Mempelai & Keluarga Besar</p>
            </div>
          </div>
          <div className="absolute h-60 gap-5 translate-y-32 w-full text-white bg-gray-500 flex justify-center items-center flex-col bottom-0">
            <p className="italic">Design by qi tech</p>
            <div className="flex gap-3">
              <img src={ig} className="w-6" alt="Instagram" />
              <img src={wa} className="w-6" alt="WhatsApp" />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-5 right-5 z-[9999] bg-white shadow-lg p-3 rounded-full flex items-center gap-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-sm bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
};

export default Halaman2;
