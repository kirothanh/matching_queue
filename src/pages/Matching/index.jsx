import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineStadium } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Matching() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="relative h-[80px] w-full bg-gradient-to-r from-[#2fdcffe2] to-[#963cfdd0] -z-[1]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url('/img/bg-title.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <h2 className="absolute top-1/2 left-[40px] transform -translate-y-1/2 text-white text-3xl font-bold">
          Matching
        </h2>
      </div>
      <div className="mt-[20px]">
        <div className="flex item-center justify-end mr-3">
          <button className="bg-[#37003c] py-1 px-3 text-white rounded-md right-0 hover:bg-[#65416b]" onClick={() => navigate("/matching/create")}>
            Tạo trận bóng
          </button>
        </div>
        <h3 className="ml-[40px] my-2 transform text-xl font-bold text-[#37003c]">
          Thursday 2 January 2025
        </h3>
        <div className="mt-[20px] max-w-[90%] mx-auto border-b-[1px] pb-2">
          <div className="flex gap-[10px]    flex-col md:flex-row justify-between items-center hover:bg-gradient-to-r from-[#05f0ff] via-[#7367ff] to-[#872eed] w-full p-2 rounded-md cursor-pointer hover:text-white group">
            <div className="flex justify-center items-center gap-[10px]">
              <div className="flex justify-center items-center gap-[10px]">
                <p className="font-semibold text-[20px]">Brentford</p>
                <img src="/img/bren.png" className="w-[30px]" />
              </div>
              <div className="border py-1 px-2 rounded-md">
                21:00
              </div>
              <div className="flex justify-center items-center gap-[10px]">
                <img src="/img/arsenal.png" className="w-[30px]" />
                <p className="font-semibold text-[20px]">Arsenal</p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-[10px]">
              <MdOutlineStadium className="text-lg" />
              <span className="text-md">Gtech Community Stadium, Brentford</span>
            </div>
            <div className="flex justify-center items-center gap-[10px] mr-2">
              <button className="border border-gray-300 text-black py-1 px-4 rounded capitalize group-hover:bg-white group-hover:text-[#37003c]">Quick View</button>
              <FaArrowRightLong className="group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>
        </div>
        <div className="mt-[20px] max-w-[90%] mx-auto border-b-[1px] pb-2">
          <div className="flex gap-[10px]    flex-col md:flex-row justify-between items-center hover:bg-gradient-to-r from-[#05f0ff] via-[#7367ff] to-[#872eed] w-full p-2 rounded-md cursor-pointer hover:text-white group">
            <div className="flex justify-center items-center gap-[10px]">
              <div className="flex justify-center items-center gap-[10px]">
                <p className="font-semibold text-[20px]">Brentford</p>
                <img src="/img/bren.png" className="w-[30px]" />
              </div>
              <div className="border py-1 px-2 rounded-md">
                21:00
              </div>
              <div className="flex justify-center items-center gap-[10px]">
                <img src="/img/arsenal.png" className="w-[30px]" />
                <p className="font-semibold text-[20px]">Arsenal</p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-[10px]">
              <MdOutlineStadium className="text-lg" />
              <span className="text-md">Gtech Community Stadium, Brentford</span>
            </div>
            <div className="flex justify-center items-center gap-[10px] mr-2">
              <button className="border border-gray-300 text-black py-1 px-4 rounded capitalize group-hover:bg-white group-hover:text-[#37003c]">Quick View</button>
              <FaArrowRightLong className="group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>
        </div>
        <div className="mt-[20px] max-w-[90%] mx-auto border-b-[1px] pb-2">
          <div className="flex gap-[10px]    flex-col md:flex-row justify-between items-center hover:bg-gradient-to-r from-[#05f0ff] via-[#7367ff] to-[#872eed] w-full p-2 rounded-md cursor-pointer hover:text-white group">
            <div className="flex justify-center items-center gap-[10px]">
              <div className="flex justify-center items-center gap-[10px]">
                <p className="font-semibold text-[20px]">Brentford</p>
                <img src="/img/bren.png" className="w-[30px]" />
              </div>
              <div className="border py-1 px-2 rounded-md">
                21:00
              </div>
              <div className="flex justify-center items-center gap-[10px]">
                <img src="/img/arsenal.png" className="w-[30px]" />
                <p className="font-semibold text-[20px]">Arsenal</p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-[10px]">
              <MdOutlineStadium className="text-lg" />
              <span className="text-md">Gtech Community Stadium, Brentford</span>
            </div>
            <div className="flex justify-center items-center gap-[10px] mr-2">
              <button className="border border-gray-300 text-black py-1 px-4 rounded capitalize group-hover:bg-white group-hover:text-[#37003c]">Quick View</button>
              <FaArrowRightLong className="group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
