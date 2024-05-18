import React from "react";
import yupp from "../assets/Images/yupp.png";
import Image from "next/image";

function page() {
  return (
    <div className="bg-white text-black overflow-auto scrollbar-hide w-screen h-screen">
      <div className="h-[100px] w-full bg-green-300 flex justify-between items-center px-4">
        <div className="flex gap-2 bg-slate-100 p-2 rounded-2xl">
          <div className="h-[50px] w-[50px] bg-slate-400 rounded-2xl" />
          <div className="text-black ">
            <div className="text-[18px] font-semibold">divyanshi</div>
            <div className="text-[12px]">@divyanshi421</div>
          </div>
        </div>
        {/* <div className="flex bg-slate-50 items-center justify-between p-2 rounded-2xl">
          <div className="h-[50px] bg-black rounded-2xl text-white flex items-center justify-center px-2"> Community</div>
          <div className="h-[50px] bg-black rounded-2xl text-white flex items-center justify-center px-2"> Store</div>
          <div className="h-[50px] bg-black rounded-2xl text-white flex items-center justify-center px-2"> Bio</div>
        </div> */}
        <div className="bg-[#00ff] text-white p-2 px-4 font-semibold rounded-2xl  ">chat</div>
      </div>
      <div className="flex pn:max-md:flex-col-reverse items-center py-4 w-[100%] h-[60%]">
          <div className="flex  flex-col md:w-[50%] h-[100%] justify-center items-center">
            <div className="flex flex-col w-[60%] h-[60%] justify-center items-center">
              <div className="md:text-[25px] text-center text-black font-bold my-2">
                "Unleash your passion to personalize your space and show the
                world the extraordinary things you're capable of “
              </div>
              <div className="text-[16px] text-center text-black font-medium">
                Prosite : fully customizable layouts for an enhanced
                personalization experience
              </div>
              <div className="bg-[#0075FF] text-white font-sans mt-6 font-medium text-[16px] w-[160px] flex justify-center items-center  py-2 rounded-lg">
                Edit now
              </div>
            </div>
          </div>
          <div className="h-[100%] md:w-[50%] flex justify-center items-center ">
            <Image src={yupp} className="h-[100%] w-[100%] object-contain" />
          </div>
        </div>
    </div>
  );
}

export default page;
