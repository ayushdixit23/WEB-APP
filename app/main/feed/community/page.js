import Image from 'next/image'
import React from 'react'
// import Empty from "../../../assets/Images/community.png";

function page() {
  return (
    <div className="w-[100%] pn:max-md:hidden h-screen flex p-2 bg-white dark:bg-[#171717] text-[#3e3e3e] flex-col justify-center items-center">
      <div className="flex bg-[#f9f9f9]  dark:bg-[#1d1d1d] dark:text-[#fff] p-4 py-8 rounded-2xl justify-center flex-col items-center">
        {/* <Image src={Empty} alt="empty" /> */}
        <div className="text-[20px] font-bold">
          Open Community To see Posts
        </div>
        <div className="font-medium">No messages in your inbox</div>
      </div>
    </div>
  )
}

export default page