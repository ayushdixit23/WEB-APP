import Image from "next/image";
import React from "react";
import Empty from "../../assets/Images/chatk.png";

function page() {
  return (
    <div className="w-[100%] pn:max-md:hidden flex p-2 h-screen bg-white dark:bg-[#171717] text-[#3e3e3e] flex-col justify-center items-center">
      <div className="flex bg-[#f9f9f9] dark:bg-[#3d3d3d] p-4 py-8 rounded-2xl justify-center flex-col items-center">
        <Image src={Empty} alt="empty" />
        <div className="text-[20px] font-bold">You've got message</div>
        <div className="font-medium">No messages in your inbox</div>
      </div>
    </div>
  );
}

export default page;
