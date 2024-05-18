"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import area from "../../../assets/Images/Livearea.png";
import fromm from "../../../assets/Images/from.png";
import { useSearchParams } from "next/navigation";
import Tick from "../../../assets/Images/tick.png";
import Illustration from "../../../assets/Images/Illustration.png";
import { useAuthContext } from "../../../utils/AuthWrapper";
import axios from "axios";
import { API } from "../../../../Essentials";

function page() {
  const search = useSearchParams();
  const { data: user } = useAuthContext()
  const [value, setValue] = useState(1);
  const data = search.get("data");
  const pids = search.get("pids");
  const quantity = search.get("quantity");
  const address = search.get("address");
  const load = search.get("load");
  const total = search.get("total");
  const dataa = search.get("dataa");
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/fetchorders/${user?.id}`)
      console.log(res.data)
      setOrders(res.data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user.id) {

      fetchOrders()
    }
  }, [user.id])


  console.log(data?.length);
  return (
    <div className="md:flex h-[91vh] ">
      <div className="pn:max-md:w-[100%] md:min-w-[390px] pn:max-md:h-[100%] bg-[#f9f9f9] dark:bg-[#171717] border-r-2 border-[#f9f9f9] flex items-center pt-6 flex-col">
        <div className="text-[#27272A] dark:text-white text-[16px] font-bold flex justify-start w-[90%] ">
          General info
        </div>

        {/* Order */}
        <div className="h-[15%] w-[80%] rounded-lg flex flex-col bg-white">
          <div className="w-[100%] h-[50%] flex flex-row justify-between items-center px-2">
            <div className="text-[#27272A] dark:text-white text-[14px]  font-sans">
              Order ID
            </div>
            <div className="text-[#27272A] dark:text-white text-[14px]  font-sans">
              247-96024
            </div>
          </div>
          <div className="w-[100%] h-[50%] flex flex-row justify-between items-center px-2 border-t-2">
            <div className="text-[#27272A] dark:text-white text-[14px] font-bold font-sans">
              Order date
            </div>
            <div className="text-[#27272A] dark:text-white text-[14px]  font-sans font-bold">
              20/04/2020, 04:20
            </div>
          </div>
        </div>
        <div className="text-[#27272A] dark:text-white text-[14px] font-bold flex justify-start w-[90%] py-1">
          Shipping details
        </div>

        <div className="py-1 w-[80%] rounded-lg flex flex-col bg-white">
          {/* from */}
          <div className="h-[50%] w-[100%]   flex flex-row justify-center items-center py-1">
            <div className="w-[10%] h-[80%] flex justify-center">
              <Image src={fromm} className="h-[20px] w-[20px]" alt="area" />
            </div>
            {/* Address */}
            <div className="w-[80%] h-[80%]  flex flex-col">
              <div className="text-[12px] text-[#2D2D2D] ">From store</div>
              <div className="text-[11px] text-[#2D2D2D] py-0.5 font-bold">
                13 Han Thuyen, D.1, HCM city
              </div>
            </div>
          </div>
          {/* To */}
          <div className="h-[50%] w-[100%] border-t-2  flex flex-row justify-center items-center py-1">
            <div className="w-[10%] h-[80%] flex justify-center">
              <Image src={area} className="h-[20px] w-[20px]" alt="area" />
            </div>
            {/* Address */}
            <div className="w-[80%] h-[80%]  flex flex-col">
              <div className="text-[12px] text-[#2D2D2D] ">To</div>
              <div className="text-[11px] text-[#2D2D2D] py-0.5 font-bold">
                13 Han Thuyen, D.1, HCM city
              </div>
            </div>
          </div>
        </div>

        <div className="text-[#27272A] text-[12px] font-bold flex justify-start w-[90%] py-1">
          Product Info
        </div>

        {/* Products */}
        {/* <div className="w-[80%] py-1 rounded-lg bg-white dark:bg-[#000] mt-2 flex flex-row">
          <img
            src={data?.image}
            alt="image"
            className="bg-contain h-[90px] w-[90px] "
          />
          <div className="flex flex-col text-black bg-white px-2">
            <div className="text-[14px]">{data?.c?.product?.brandname}</div>
            <div className="text-[8px] py-1">{data?.c?.product?.name}</div>
            <div className="flex flex-row justify-center items-center">
              <div className="text-[14px]">
                {data?.c?.product?.discountedprice}
              </div>
              <div className="text-[12px] text-[#A1A1A1] px-1">
                {data?.c?.price}
              </div>
              <div className="text-[8px] text-[#A1A1A1] px-1">70% Off</div>
            </div>
            <div className="flex flex-row justify-between px-2 items-center rounded-lg bg-[#F6F6F6] h-[30px] w-[120px]">
              <div className="bg-white text-black text-[30px] h-[20px] flex justify-center items-center w-[20px]">
                -
              </div>
              <div className=" text-black text-[14px]">{data?.c?.quantity}</div>
              <div className="bg-white text-black text-[24px] h-[20px] w-[20px] flex justify-center items-center">
                +
              </div>
            </div>
          </div>
        </div> */}
        {
          orders.map((d, i) => (
            <div key={i} className="w-[80%] py-1 rounded-lg bg-white dark:bg-[#000] mt-2 flex flex-row">
              <img
                src={d?.image}
                alt="image"
                className="bg-contain h-[90px] w-[90px] "
              />

              <div className="flex flex-col text-black bg-white px-2">
                <div className="text-[14px]">{d?.orders?.productId?.[0].name}</div>
                <div className="text-[8px] py-1">By {d?.orders?.productId?.[0].brandname}</div>
                <div className="flex flex-row justify-center items-center">
                  <div className="text-[14px]">
                    {data?.c?.product?.discountedprice}
                  </div>
                  <div className="text-[12px] text-[#A1A1A1] px-1">
                    {data?.c?.price}
                  </div>
                  <div className="text-[8px] text-[#A1A1A1] px-1">70% Off</div>
                </div>
                <div className="flex flex-row justify-between px-2 items-center rounded-lg bg-[#F6F6F6] h-[30px] w-[120px]">
                  {/* <div className="bg-white text-black text-[30px] h-[20px] flex justify-center items-center w-[20px]">
                    -
                  </div> */}
                  <div>Rupee{d?.orders?.total}</div>
                  <div className=" text-black text-[14px]">{d?.orders?.quantity}</div>
                  {/* <div className="bg-white text-black text-[24px] h-[20px] w-[20px] flex justify-center items-center">
                    +
                  </div> */}
                  <div>Status: {d?.orders?.currentStatus}</div>
                </div>
              </div>
            </div>

          ))
        }

      </div>
      <div className=" bg-white pn:max-md:hidden w-[100%] h-[100%] flex space-y-10 flex-col items-center  ">
        <div className="flex text-blue-500 text-[30px] font-semibold items-center space-x-2 ">
          {" "}
          <div>Confirmed</div>
          <Image src={Tick} alt="tick" className="h-[30px] w-[30px]" />
        </div>
        <div className="text-[30px] font-medium">THANK YOU FOR YOUR ORDER!</div>
        <div className="text-[20px] font-medium">Order Id: 56089</div>
        <Image alt="ill" src={Illustration} className="h-[200px] w-[400px]" />

        <div className="text-[20px]">Estimated Delivery </div>
        <div className="text-[20px]">Monday, 09th January, 2023</div>
        <div className="bg-[#171717] text-white py-3 px-40 rounded-2xl ">
          Continue Shopping
        </div>
      </div>
    </div>
  );
}

export default page;
