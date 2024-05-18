"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import delivery from "../../../assets/Images/delivery.png";
import coupon from "../../../assets/Images/coupon.png";
// import axios from "axios";
// // import { API } from "@/Essentials";
// import useRazorpay from "react-razorpay";
import { MdDelete } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { FaGooglePay } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { SiPhonepe, SiVisa } from "react-icons/si";
import { BsBank } from "react-icons/bs";
import { useAuthContext } from "../../../utils/AuthWrapper";
import axios from "axios";
import Cart from "../../../component/Cart";
import { API } from "../../../../Essentials";

function page() {
  const [data, setData] = useState([]);
  const { data: user } = useAuthContext()
  const [pids, setPids] = useState();
  const [quantity, setQuantity] = useState(0);
  const [address, setAddress] = useState("");
  const [load, setLoad] = useState(false);
  const [total, setTotal] = useState(0);
  const [id, setId] = useState();
  const [up, setUp] = useState(false);
  const [select, setSelect] = useState(0);
  const [popUp, setPopUp] = useState(false);

  const [sum, setSum] = useState(0);
  const [dis, setDis] = useState(0);
  const [t, setT] = useState(0);

  // const fetchCart = useCallback(
  //   async (i) => {
  //     try {
  //       const res = await axios.get(`${API}/fetchcart/${i}`);

  //       if (res?.data?.success) {
  //         const cart = res?.data?.cart;
  //         const imgs = res?.data?.image;
  //         setPids(res?.data?.ids);
  //         setQuantity(imgs?.length);
  //         const merge = cart?.map((c, i) => ({ c, image: imgs[i] }));
  //         setData(merge);
  //         setAddress(res?.data?.address);
  //         setTotal(res?.data?.total[0]);
  //         setLoad(true);
  //       } else {
  //         setLoad(false);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   },
  //   [id]
  // );

  // useEffect(() => {
  //   let sums = 0;

  //   const datas = data.map((d) => Number(d.c.product.price));
  //   for (let i = 0; i < datas.length; i++) {
  //     sums += datas[i];
  //   }

  //   setSum(sums);
  // }, [data]);

  // useEffect(() => {
  //   let dis = 0;
  //   const datas = data.map((d) => Number(d.c.product.discountedprice));
  //   console.log(datas);
  //   for (let i = 0; i < datas.length; i++) {
  //     dis += datas[i];
  //   }
  //   setT(dis);
  //   console.log(sum - dis);
  //   setDis(sum - dis);
  // }, [data, sum]);

  // console.log(data);

  // useEffect(() => {
  //   const i = sessionStorage.getItem("id");
  //   setId(i);
  //   fetchCart(i);
  // }, [fetchCart]);

  const removeItem = async (cardId, productId) => {
    try {

      const res = await axios.post(`${API}/removecartweb/${user?.id}/${cardId}/${productId}`);
      if (res?.data?.success) {
        console.log(res.data)

        await fetchCart()
      } else {
        console.log("failed");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // // Conditional rendering when 'productt' is empty or undefined
  // const handlePayment = useCallback(
  //   async (e) => {
  //     e.preventDefault();
  //     const name = sessionStorage.getItem("fullname");
  //     const id = sessionStorage.getItem("id");
  //     console.log(data?.length);
  //     if (id && name) {
  //       try {
  //         const response = await axios.post(`${API}/createcartorder/${id}`, {
  //           quantity: 1,
  //           total: 100,
  //           productId: pids,
  //           deliveryCharges: 40,
  //         });

  //         if (response.data.success === true) {
  //           const options = {
  //             key: "rzp_test_lD67Bc4TAAnHOv",
  //             amount: inp * 100,
  //             currency: "INR",
  //             name: "Grovyo Platforms",
  //             description: "Test Transaction",
  //             image: "https://example.com/your_logo",

  //             handler: function (response) {
  //               if (response.razorpay_payment_id) {
  //                 console.log("Payment successful!");
  //                 const Final = async () => {
  //                   const re = await axios.post(
  //                     `${API}/updatecartorder/${id}/${res?.data?.orderId}`,
  //                     {
  //                       paymentId: data.razorpay_payment_id,
  //                       success: "success",
  //                       paymentmode: "online",
  //                     }
  //                   );
  //                   if (re?.data?.success) {
  //                     fetchCart();
  //                     setToast({
  //                       appear: true,
  //                       text: "Order Placed successfully.",
  //                       success: true,
  //                     });
  //                     setTimeout(() => {
  //                       setToast({ appear: false });
  //                     }, 5000);
  //                   }
  //                 };
  //                 Final();
  //               } else {
  //                 const Final = async () => {
  //                   const re = await axios.post(
  //                     `${API}/updatecartorder/${id}/${res?.data?.orderId}`,
  //                     {
  //                       success: "fail",
  //                       paymentmode: "online",
  //                     }
  //                   );
  //                 };
  //                 Final();
  //               }
  //             },
  //             prefill: {
  //               name: name,
  //               email: "-",
  //               contact: "-",
  //             },
  //             notes: {
  //               address: "India",
  //             },
  //             theme: {
  //               color: "#313c58",
  //             },
  //           };

  //           const rzpay = new Razorpay(options);
  //           rzpay.open();
  //         } else {
  //           console.log("Add money request failed.");
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     } else {
  //       console.log("Something went wrong...");
  //     }
  //   },
  //   [Razorpay]
  // );


  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API}/fetchcart/${user?.id}`);
      // console.log(res.data?.data)
      setData(res.data?.data)
      setAddress(res?.data?.address);
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user?.id) {
      fetchCart()
    }
  }, [user.id])

  return (
    <div className="md:flex bg-[#fcfcfc] dark:bg-[#3e3e3e] h-[89.5vh]">
      {data.length === 0 ? (
        <div className="pn:max-md:w-[100%] md:min-w-[390px] pn:max-md:h-[100%] bg-[#fdfdfd] dark:bg-[#161616] border-r-2 dark:border-[#3e3e3e] border-[#f9f9f9] flex items-center flex-col">
          <div className="h-[100%] w-[100%] flex items-center flex-col justify-center ">
            {/* <Image
              alt="cart"
              src={cart}
              className="h-[250px] w-[250px] mt-10"
            /> */}
            <div className="text-black text-[27px] font-sans font-bold mt-2 mb-2">
              Your Cart is Empty
            </div>
            <div className="text-[#9E9E9E] text-[16px] font-sans ">
              Looks like you haven’t added
            </div>
            <div className="text-[#9E9E9E] text-[16px] font-sans ">
              anything to your cart yet
            </div>
            <div className="text-white p-2 text-[14px] mt-3 px-4 bg-[#307EF4] rounded-3xl flex justify-center items-center">
              Go Shop
            </div>
          </div>
          <div
            onClick={() => {
              setUp(false);
            }}
            className="h-[40px] w-[90%] justify-between flex items-center"
          >
            <div className="h-6 w-20 bg-slate-100 rounded-xl animate-pulse"></div>
            <div className="text-[14px] font-bold h-6 w-10 bg-slate-100 rounded-xl animate-pulse"></div>
          </div>

          <div className="w-[90%] h-[110px] py-1 justify-center bg-white  dark:bg-black flex flex-col mt-1 rounded-xl items-center">
            <div className="w-[95%] h-[100%]  flex flex-row items-center justify-between">
              <div className="flex">
                <div className="rounded-xl h-[90px] w-[90px] bg-[#f9f9f9] animate-pulse" />
                <div className="flex flex-col space-y-1 text-black px-2 pt-2">
                  <div className=" h-4 w-20 bg-slate-100 rounded-xl animate-pulse "></div>

                  <div className="flex flex-row h-4 w-28 bg-slate-100 rounded-xl animate-pulse items-center"></div>
                  <div className="flex flex-row h-6 w-24 bg-slate-100 rounded-xl animate-pulse items-center"></div>
                </div>
              </div>
              <div
                // onClick={removeItem}
                className="h-8 w-8 dark:bg-[#3e3e3e] bg-slate-100 rounded-md animate-pulse"
              />
            </div>
          </div>
          <div className="w-[90%] h-[110px] py-1 justify-center bg-white dark:bg-black flex flex-col mt-1 rounded-xl items-center">
            <div className="w-[95%] h-[100%]  flex flex-row items-center justify-between">
              <div className="flex">
                <div className="rounded-xl h-[90px] w-[90px] bg-[#f9f9f9] animate-pulse" />
                <div className="flex flex-col space-y-1 text-black px-2 pt-2">
                  <div className=" h-4 w-20 bg-slate-100 rounded-xl animate-pulse "></div>

                  <div className="flex flex-row h-4 w-28 bg-slate-100 rounded-xl animate-pulse items-center"></div>
                  <div className="flex flex-row h-6 w-24 bg-slate-100 rounded-xl animate-pulse items-center"></div>
                </div>
              </div>
              <div
                // onClick={removeItem}
                className="h-8 w-8 dark:bg-[#3e3e3e] bg-slate-100 rounded-md animate-pulse"
              />
            </div>
          </div>
          <div className="w-[90%] h-[110px] py-1 justify-center bg-white dark:bg-black flex flex-col mt-1 rounded-xl items-center">
            <div className="w-[95%] h-[100%]  flex flex-row items-center justify-between">
              <div className="flex">
                <div className="rounded-xl h-[90px] w-[90px] bg-[#f9f9f9] animate-pulse" />
                <div className="flex flex-col space-y-1 text-black px-2 pt-2">
                  <div className=" h-4 w-20 bg-slate-100 rounded-xl animate-pulse "></div>

                  <div className="flex flex-row h-4 w-28 bg-slate-100 rounded-xl animate-pulse items-center"></div>
                  <div className="flex flex-row h-6 w-24 bg-slate-100 rounded-xl animate-pulse items-center"></div>
                </div>
              </div>
              <div
                // onClick={removeItem}
                className="h-8 w-8 dark:bg-[#3e3e3e] bg-slate-100 rounded-md animate-pulse"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="sm:h-[100%] py-6 pn:max-md:w-[100%] md:min-w-[390px] pn:max-sm:pt-40 bg-[#f8f8f8] flex items-center flex-col  h-[100vh] pn:max-md:fixed">
          <div
            onClick={() => {
              setUp(false);
            }}
            className="h-[40px] w-[90%] justify-between flex items-center"
          >
            <div className="text-black font-bold">Order Summary</div>
            <div className="text-[14px] font-bold">{data?.length} items</div>
          </div>
          {/* product */}
          {data.map((d, e) => (
            // <div
            //   key={e}
            //   className="w-[90%] h-[110px] py-1 justify-center bg-white flex flex-col mt-1 rounded-lg items-center"
            // >
            //   <div className="w-[95%] h-[100%] bg-white mt-2 flex flex-row items-center justify-between">
            //     <div className="flex">
            //       <img
            //         alt="image"
            //         src={d?.image}
            //         className="bg-contain h-[90px] w-[90px] bg-[#f9f9f9]"
            //       />
            //       <div className="flex flex-col text-black bg-white px-2">
            //         <div className="text-[14px] font-semibold">
            //           {d?.c?.product?.name}
            //         </div>
            //         <div className="text-[10px] font-semibold py-1">
            //           sold by {d?.c?.product?.sellername}
            //         </div>
            //         <div className="flex flex-row  items-center">
            //           <div className="text-[14px]">
            //             {d?.c?.product?.discountedprice}
            //           </div>
            //           <strike className="text-[12px] text-[#A1A1A1] px-1">
            //             {d?.c?.product?.price}
            //           </strike>
            //           <div className="text-[8px] text-[#B858ED] px-1">
            //             {d?.c?.product?.percentoff}% Off
            //           </div>
            //         </div>
            //         <div className="flex flex-row justify-between px-2 items-center rounded-lg bg-[#F6F6F6] h-[30px] w-[120px]">
            //           <div className="bg-[#fefefe] rounded-md text-black text-[20px] h-[20px] flex justify-center items-center w-[20px]">
            //             -
            //           </div>
            //           <div className=" text-black text-[14px]">
            //             <input />
            //           </div>
            //           <div className="bg-[#fefefe] rounded-md text-black text-[20px] h-[20px] flex justify-center items-center w-[20px]">
            //             +
            //           </div>
            //         </div>
            //       </div>
            //     </div>
            //     <MdDelete
            //       onClick={() => removeItem(d?.c?.product?._id)}
            //       className="h-6 w-6 text-[#3e3e3e]"
            //     />
            //   </div>
            // </div>
            <Cart d={d} key={e} id={user?.id} removeItem={removeItem} />
          ))}

          {/* button for bill */}
          <div
            className="bg-white md:hidden sm:max-md:w-[80%] shadow-3xl sm:max-md:rounded-xl fixed bottom-14 w-full py-4 px-4 rounded-t-xl flex justify-between items-center
           "
          >
            <div className="font-bold text-[16px]">Total Price: ₹ {t}</div>

            <div
              onClick={() => {
                setUp(!up);
              }}
              className="py-2 flex justify-center items-center bg-[#171717] text-[#fff] rounded-xl px-6"
            >
              Place order
            </div>
          </div>
          <div
            className={` ${up
              ? "h-[100%] shadow-xl ring-1 ring-[#f1f1f1] rounded-t-lg bg-[#4e4e4e48] md:hidden justify-center items-center sm:max-md:w-[90%] shadow-3xl w-full absolute bottom-0"
              : "h-[100%] rounded-t-lg bg-[#fff] md:hidden  sm:max-md:w-[90%] shadow-3xl w-full absolute -bottom-[100vh]"
              }`}
          >
            <div
              className={`duration-75 ${up
                ? "h-[50px] w-[100%] rounded-full mt-40  md:hidden shadow-3xl flex justify-center items-center"
                : "rounded-t-lg bg-[#fff] md:hidden shadow-3xl w-full"
                }`}
            >
              <div
                onClick={() => {
                  setUp(false);
                }}
                className={`duration-75 ${up
                  ? "h-[50px] w-[50px] shadow-xl rounded-full bg-[#dbdbdba2] md:hidden shadow-3xl text-[#fff] flex justify-center items-center"
                  : "rounded-t-lg bg-[#fff] md:hidden shadow-3xl w-full"
                  }`}
              >
                <RxCross1 />
              </div>
            </div>
            <div
              className={`duration-75 ${up
                ? "h-[70%] shadow-xl ring-1 ring-[#f1f1f1] rounded-t-lg bg-[#fff] md:hidden  sm:max-md:w-[90%] shadow-3xl w-full absolute bottom-0"
                : "h-[70%] rounded-t-lg bg-[#fff] md:hidden  sm:max-md:w-[90%] shadow-3xl w-full absolute -bottom-[100vh]"
                }`}
            >
              <div
                className="w-[100%] md:hidden bg-white rounded-t-lg
             flex flex-col items-center justify-evenly h-[100%] "
              >
                {/* No charges */}
                <div className="w-[80%] h-[10%] bg-[#f9f9f9] rounded-lg flex flex-row items-center justify-center">
                  <Image
                    src={delivery}
                    alt="delivery"
                    className="h-[30px] w-[30px] "
                  />
                  <div className="text-[18px] text-[#2D2D2D] px-1">Yay!</div>
                  <div className="text-[18px] text-[#2D2D2D]  font-semibold">
                    No Delivery Charge
                  </div>
                  <div className="text-[18px] text-[#2D2D2D] px-1">
                    on this order
                  </div>
                </div>

                {/* Apply coupon */}
                {/* <div className="w-[60%] h-[15%] flex flex-col items-center justify-center">
              <div className="w-[100%] h-[50%] font-bold text-black text-[18px] bg-white  flex items-center">
                Have a Coupon?
              </div>

            
              <div className="w-[100%] h-[50%] font-bold text-black text-[20px] bg-[#F6F6F6] border-[#D2D2D2] rounded-lg border-2 flex flex-row">
                <div className="w-[10%] h-[100%] flex items-center justify-center ">
                  <Image
                    src={coupon}
                    alt="coupon"
                    className="h-[30px] w-[20px]"
                  />
                </div>

                <input
                  placeholder="Enter Coupon Code"
                  className="text-[#737373] font-sans outline-none w-[70%] h-[100%] text-[16px] font-thin bg-[#F6F6F6] "
                />
                <div className="text-[#0075FF] w-[20%] h-[100%] text-[16px] flex items-center justify-center ">
                  APPLY
                </div>
              </div>
            </div> */}

                {/* Price details*/}
                <div className="w-[60%] h-[55%] bg-white flex flex-col justify-between">
                  <div className="text-[16px] font-semibold text-black">
                    PRICE DETAILS{" "}
                    {data.map((d, i) => (
                      <div key={i}>{d?.length}</div>
                    ))}
                    {/* ({d?.c?.quantity} items) */}
                  </div>
                  {/* MRP */}
                  <div className="flex flex-row justify-between items-center">
                    <div className="text-[#737373] text-[14px]">Total MRP</div>
                    <div className="text-black text-[14px]">
                      Rs. {sum}
                      {/* {d?.c?.product?.price} */}
                    </div>
                  </div>

                  {/* Discount */}
                  <div className="flex flex-row justify-between items-center">
                    <div className="text-[#737373] text-[14px]">
                      Discount on MRP
                    </div>
                    <div className="text-[#2DC071] text-[14px]">-Rs. {dis}</div>
                  </div>

                  {/* Coupon Discount */}
                  <div className="flex flex-row justify-between items-center">
                    <div className="text-[#737373] text-[14px]">
                      Coupon Discount
                    </div>
                    <div className="text-black text-[14px]">Rs. 0</div>
                  </div>

                  {/* delivery charge */}
                  <div className="flex flex-row justify-between items-center">
                    <div className="text-[#737373] text-[14px]">
                      Delivery Charge
                    </div>
                    <div className="text-[#2DC071] text-[14px]">Free</div>
                  </div>

                  {/* Total charge */}
                  <div className="border-t-2 flex flex-row justify-between items-center py-2 bg">
                    <div className="text-[#737373] text-[14px]">
                      Total Amount
                    </div>
                    <div className="text-black font-bold text-[14px]">
                      Rs. {t}
                      {/* {d?.c?.product?.discountedprice} */}
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setPopUp(false);
                    }}
                    className="bg-black rounded-lg flex flex-row justify-center items-center py-3"
                  >
                    <div className="text-white text-[14px]">Continue</div>
                  </div>
                </div>
                {/* PopUp */}
                <div
                  className={` ${popUp
                    ? "h-[100%] shadow-xl ring-1 ring-[#f1f1f1] rounded-t-lg bg-[#4e4e4e48] flex sm:max-md:w-[90%] shadow-3xl w-[100%] absolute bottom-0 left-0 right-0 top-0 z-40"
                    : "h-[100%] rounded-t-lg bg-[#272727] sm:max-md:w-[90%] shadow-3xl absolute bottom-0 hidden"
                    }`}
                >
                  <div className="p-2 w-[100%] bg-white rounded-2xl px-2 pt-4">
                    <div className="flex justify-between items-center px-2">
                      <div className="w-[100%] font-medium ">
                        Shipping details
                      </div>
                      <RxCross1
                        onClick={() => {
                          setPopUp(false);
                        }}
                      />
                    </div>
                    <div className="px-4">
                      <div className="w-[100%] mt-2 bg-[#f9f9f9]  p-2 rounded-2xl">
                        <div className="">To</div>
                        <div>guyghu.gyguyg.gggui</div>
                        <div className="text-[#569aff] font-medium w-full text-right">
                          Change..
                        </div>
                      </div>
                    </div>
                    <div className="w-[100%] font-medium mt-4">
                      SELECT PAYMENT OPTION
                    </div>
                    <div className="px-4">
                      <div
                        onClick={() => {
                          setSelect(1);
                        }}
                        className="w-[100%] mt-2 bg-[#f9f9f9] p-2 rounded-2xl flex justify-between px-4 items-center"
                      >
                        <div className="flex gap-2 items-center">
                          <div
                            className={`${select === 1
                              ? "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-blue-600 flex justify-center items-center"
                              : "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-white flex justify-center items-center"
                              }`}
                          >
                            <div className="ring-5 ring-blue-600 h-2 w-2 bg-white rounded-full"></div>
                          </div>{" "}
                          <div>Cash On Delivery</div>{" "}
                        </div>
                        <TbTruckDelivery className="text-green-500" />
                      </div>
                      <div
                        onClick={() => {
                          setSelect(2);
                        }}
                        className="w-[100%] mt-2 bg-[#f9f9f9] p-2 rounded-2xl flex justify-between px-4 items-center"
                      >
                        <div className="flex gap-2 items-center">
                          <div
                            className={`${select === 2
                              ? "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-blue-600 flex justify-center items-center"
                              : "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-white flex justify-center items-center"
                              }`}
                          >
                            <div className="ring-5 ring-blue-600 h-2 w-2 bg-white rounded-full"></div>
                          </div>{" "}
                          <div>PhonePay/Google Pay/BHIM UPI </div>{" "}
                        </div>
                        <div className="gap-2 flex">
                          <FaGooglePay />
                          <SiPhonepe className="text-purple-600" />
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          setSelect(3);
                        }}
                        className="w-[100%] mt-2 bg-[#f9f9f9] p-2 rounded-2xl flex justify-between px-4 items-center"
                      >
                        <div className="flex gap-2 items-center">
                          <div
                            className={`${select === 3
                              ? "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-blue-600 flex justify-center items-center"
                              : "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-white flex justify-center items-center"
                              }`}
                          >
                            <div className="ring-5 ring-blue-600 h-2 w-2 bg-white rounded-full"></div>
                          </div>{" "}
                          <div>Net Banking</div>{" "}
                        </div>
                        <BsBank className="text-blue-300" />
                      </div>
                      <div
                        onClick={() => {
                          setSelect(4);
                        }}
                        className="w-[100%] mt-2 bg-[#f9f9f9] p-2 rounded-2xl px-4 "
                      >
                        <div className="flex justify-between items-center w-full">
                          <div className="flex gap-2 items-center">
                            <div
                              className={`${select === 4
                                ? "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-blue-600 flex justify-center items-center"
                                : "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-white flex justify-center items-center"
                                }`}
                            >
                              <div className="ring-5 ring-blue-600 h-2 w-2 bg-white rounded-full"></div>
                            </div>{" "}
                            <div>Credit/Debit Card</div>{" "}
                          </div>
                          <SiVisa className="text-purple-600" />
                        </div>
                        <div className="w-full px-4">
                          <input
                            placeholder="Card Number"
                            className="bg-[#fff] w-full mt-2 h-10 rounded-xl pl-2"
                          />
                          <input
                            placeholder="Name on Card"
                            className="bg-[#fff] w-full mt-2 h-10 rounded-xl pl-2"
                          />
                          <div className="flex justify-between w-full mt-2 items-center">
                            <input
                              placeholder="MM/YY"
                              className="bg-[#fff] w-[45%] h-10 rounded-xl pl-2"
                            />
                            <input
                              placeholder="CVV"
                              className="bg-[#fff] w-[45%] h-10 rounded-xl pl-2"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-[#171717] rounded-2xl py-2 text-white flex justify-center items-center mt-4">
                        {" "}
                        Continue
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* out */}
      {data.length === 0 ? (
        // Render content when data is empty
        <div
          className="w-[100%] pn:max-md:hidden bg-white dark:bg-black


             flex flex-col items-center justify-center "
        >
          <div
            className="pn:max-md:hidden bg-[#f9f9f9] dark:bg-[#171717]
             flex flex-col items-center justify-evenly m-2 p-4 w-[80%] rounded-2xl h-[80%] "
          >
            {/* No charges */}
            <div className="w-[80%] h-[10%] bg-[#f9f9f9] dark:bg-[#3e3e3e] rounded-lg flex flex-row items-center justify-center">
              <Image
                src={delivery}
                alt="delivery"
                className="h-[30px] w-[30px] "
              />
              <div className="text-[18px] px-1">Yay!</div>
              <div className="text-[18px] font-semibold">
                No Delivery Charge
              </div>
              <div className="text-[18px] px-1">
                on this order
              </div>
            </div>
            {/* Apply coupon */}
            <div className="w-[60%] h-[15%] flex flex-col items-center justify-center">
              <div className="w-[100%] h-[50%] font-bold text-[18px] flex items-center">
                Have a Coupon?
              </div>

              <div className="w-[100%] h-[50%] font-bold text-[20px] bg-[#f3f3f3] rounded-lg flex flex-row">
                <div className="w-[10%] h-[100%] flex items-center justify-center ">
                  <Image
                    src={coupon}
                    alt="coupon"
                    className="h-[30px] w-[20px]"
                  />
                </div>

                <input
                  placeholder="Enter Coupon Code"
                  maxLength={"6"}
                  className="text-[#737373] font-sans outline-none w-[70%] h-[100%] text-[16px] font-thin bg-[#f3f3f3] "
                />
                <div className="text-[#0075FF] w-[20%] h-[100%] text-[16px] flex items-center justify-center ">
                  APPLY
                </div>
              </div>
            </div>
            {/* Price details*/}
            <div className="w-[60%] h-[55%]  flex flex-col justify-between">
              <div className="text-[16px] font-semibold">
                PRICE DETAILS{" "}
                {data.map((d, i) => (
                  <div key={i}>{d?.length}</div>
                ))}
                {/* ({d?.c?.quantity} items) */}
              </div>
              {/* MRP */}
              <div className="flex flex-row justify-between items-center">
                <div className="text-[#737373] text-[14px]">Total MRP</div>
                <div className="h-6 w-20 bg-slate-100 rounded-xl animate-pulse">

                  {/* {d?.c?.product?.price} */}
                </div>
              </div>
              {/* Discount */}
              <div className="flex flex-row justify-between items-center">
                <div className="text-[#737373] text-[14px]">
                  Discount on MRP
                </div>
                <div className="h-6 w-20 bg-slate-100 rounded-xl animate-pulse"></div>
              </div>
              {/* Coupon Discount */}
              <div className="flex flex-row justify-between items-center">
                <div className="text-[#737373] text-[14px]">
                  Coupon Discount
                </div>
                <div className="h-6 w-20 bg-slate-100 rounded-xl animate-pulse"></div>
              </div>
              {/* delivery charge */}
              <div className="flex flex-row justify-between items-center">
                <div className="text-[#737373] text-[14px]">
                  Delivery Charge
                </div>
                <div className="h-6 w-20 bg-slate-100 rounded-xl animate-pulse"></div>
              </div>
              {/* Total charge */}
              <div className="border-t-2 flex flex-row justify-between items-center py-2 bg">
                <div className="text-[#737373] text-[14px]">Total Amount</div>
                <div className="h-6 w-20 bg-slate-100 rounded-xl animate-pulse">

                </div>
              </div>
              <div
                onClick={() => {
                  setPopUp(!popUp);
                }}
                className="bg-slate-100 animate-pulse rounded-lg flex flex-row justify-center items-center h-10"
              >

              </div>
            </div>
          </div>
          {/* PopUp */}
          <div
            className={` ${popUp
              ? "h-[100%] shadow-xl ring-1 ring-[#f1f1f1] rounded-t-lg bg-[#4e4e4e48] flex justify-center items-center sm:max-md:w-[90%] shadow-3xl w-[100%] absolute bottom-0 left-0 right-0 top-0 z-40"
              : "h-[100%] rounded-t-lg bg-[#272727] sm:max-md:w-[90%] shadow-3xl absolute bottom-0 hidden"
              }`}
          >
            <div className="p-2 w-[30%] bg-white min-w-[349px] rounded-2xl px-2 pt-4">
              <div className="flex justify-between items-center px-2">
                <div className="w-[100%] font-medium ">Shipping details</div>
                <RxCross1
                  onClick={() => {
                    setPopUp(false);
                  }}
                />
              </div>
              {/* <div className="px-4">
                <div className="w-[100%] mt-2 bg-[#f9f9f9]  p-2 rounded-2xl">
                  <div className="">To</div>
                  <div>guyghu.gyguyg.gggui</div>
                  <div className="text-[#569aff] font-medium w-full text-right">
                    Change..
                  </div>
                </div>
              </div> */}
              <div className="w-[100%] font-medium mt-4">
                SELECT PAYMENT OPTION
              </div>
              <div className="px-4">
                <div
                  onClick={() => {
                    setSelect(1);
                  }}
                  className="w-[100%] mt-2 bg-[#f9f9f9] p-2 rounded-2xl flex justify-between px-4 items-center"
                >
                  <div className="flex gap-2 items-center">
                    <div
                      className={`${select === 1
                        ? "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-blue-600 flex justify-center items-center"
                        : "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-white flex justify-center items-center"
                        }`}
                    >
                      <div className="ring-5 ring-blue-600 h-2 w-2 bg-white rounded-full"></div>
                    </div>{" "}
                    <div>Cash On Delivery</div>{" "}
                  </div>
                  <TbTruckDelivery className="text-green-500" />
                </div>
                <div
                  onClick={() => {
                    setSelect(2);
                  }}
                  className="w-[100%] mt-2 bg-[#f9f9f9] p-2 rounded-2xl flex justify-between px-4 items-center"
                >
                  <div className="flex gap-2 items-center">
                    <div
                      className={`${select === 2
                        ? "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-blue-600 flex justify-center items-center"
                        : "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-white flex justify-center items-center"
                        }`}
                    >
                      <div className="ring-5 ring-blue-600 h-2 w-2 bg-white rounded-full"></div>
                    </div>{" "}
                    <div>PhonePay/Google Pay/BHIM UPI </div>{" "}
                  </div>
                  <div className="gap-2 flex">
                    <FaGooglePay />
                    <SiPhonepe className="text-purple-600" />
                  </div>
                </div>
                <div
                  onClick={() => {
                    setSelect(3);
                  }}
                  className="w-[100%] mt-2 bg-[#f9f9f9] p-2 rounded-2xl flex justify-between px-4 items-center"
                >
                  <div className="flex gap-2 items-center">
                    <div
                      className={`${select === 3
                        ? "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-blue-600 flex justify-center items-center"
                        : "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-white flex justify-center items-center"
                        }`}
                    >
                      <div className="ring-5 ring-blue-600 h-2 w-2 bg-white rounded-full"></div>
                    </div>{" "}
                    <div>Net Banking</div>{" "}
                  </div>
                  <BsBank className="text-blue-300" />
                </div>
                <div
                  onClick={() => {
                    setSelect(4);
                  }}
                  className="w-[100%] mt-2 bg-[#f9f9f9] p-2 rounded-2xl px-4 "
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2 items-center">
                      <div
                        className={`${select === 4
                          ? "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-blue-600 flex justify-center items-center"
                          : "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-white flex justify-center items-center"
                          }`}
                      >
                        <div className="ring-5 ring-blue-600 h-2 w-2 bg-white rounded-full"></div>
                      </div>{" "}
                      <div>Credit/Debit Card</div>{" "}
                    </div>
                    <SiVisa className="text-purple-600" />
                  </div>
                  <div className="w-full px-4">
                    <input
                      placeholder="Card Number"
                      className="bg-[#fff] w-full mt-2 h-10 rounded-xl pl-2"
                    />
                    <input
                      placeholder="Name on Card"
                      className="bg-[#fff] w-full mt-2 h-10 rounded-xl pl-2"
                    />
                    <div className="flex justify-between w-full mt-2 items-center">
                      <input
                        placeholder="MM/YY"
                        className="bg-[#fff] w-[45%] h-10 rounded-xl pl-2"
                      />
                      <input
                        placeholder="CVV"
                        className="bg-[#fff] w-[45%] h-10 rounded-xl pl-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full bg-[#171717] rounded-2xl py-2 text-white flex justify-center items-center mt-4">
                  {" "}
                  Continue
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="w-[100%] pn:max-md:hidden bg-white
             flex flex-col items-center justify-center "
        >
          <div
            className="pn:max-md:hidden bg-[#f9f9f9]
             flex flex-col items-center justify-evenly m-2 p-4 w-[80%] rounded-2xl h-[80%] "
          >
            {/* No charges */}
            <div className="w-[80%] h-[10%] bg-[#f9f9f9] rounded-lg flex flex-row items-center justify-center">
              <Image
                src={delivery}
                alt="delivery"
                className="h-[30px] w-[30px] "
              />
              <div className="text-[18px] text-[#2D2D2D] px-1">Yay!</div>
              <div className="text-[18px] text-[#2D2D2D]  font-semibold">
                No Delivery Charge
              </div>
              <div className="text-[18px] text-[#2D2D2D] px-1">
                on this order
              </div>
            </div>
            {/* Apply coupon */}
            <div className="w-[60%] h-[15%] flex flex-col items-center justify-center">
              <div className="w-[100%] h-[50%] font-bold text-black text-[18px] bg-[#f9f9f9] flex items-center">
                Have a Coupon?
              </div>

              <div className="w-[100%] h-[50%] font-bold text-black text-[20px] bg-[#f3f3f3] rounded-lg flex flex-row">
                <div className="w-[10%] h-[100%] flex items-center justify-center ">
                  <Image
                    src={coupon}
                    alt="coupon"
                    className="h-[30px] w-[20px]"
                  />
                </div>

                <input
                  placeholder="Enter Coupon Code"
                  maxLength={"6"}
                  className="text-[#737373] font-sans outline-none w-[70%] h-[100%] text-[16px] font-thin bg-[#f3f3f3] "
                />
                <div className="text-[#0075FF] w-[20%] h-[100%] text-[16px] flex items-center justify-center ">
                  APPLY
                </div>
              </div>
            </div>
            {/* Price details*/}
            <div className="w-[60%] h-[55%] bg-[#f9f9f9] flex flex-col justify-between">
              <div className="text-[16px] font-semibold text-black">
                PRICE DETAILS{" "}
                {data.map((d, i) => (
                  <div key={i}>{d?.length}</div>
                ))}
                {/* ({d?.c?.quantity} items) */}
              </div>
              {/* MRP */}
              <div className="flex flex-row justify-between items-center">
                <div className="text-[#737373] text-[14px]">Total MRP</div>
                <div className="text-black text-[14px]">
                  Rs. {sum}
                  {/* {d?.c?.product?.price} */}
                </div>
              </div>
              {/* Discount */}
              <div className="flex flex-row justify-between items-center">
                <div className="text-[#737373] text-[14px]">
                  Discount on MRP
                </div>
                <div className="text-[#2DC071] text-[14px]">-Rs. {dis}</div>
              </div>
              {/* Coupon Discount */}
              <div className="flex flex-row justify-between items-center">
                <div className="text-[#737373] text-[14px]">
                  Coupon Discount
                </div>
                <div className="text-black text-[14px]">Rs. 0</div>
              </div>
              {/* delivery charge */}
              <div className="flex flex-row justify-between items-center">
                <div className="text-[#737373] text-[14px]">
                  Delivery Charge
                </div>
                <div className="text-[#2DC071] text-[14px]">Free</div>
              </div>
              {/* Total charge */}
              <div className="border-t-2 flex flex-row justify-between items-center py-2 bg">
                <div className="text-[#737373] text-[14px]">Total Amount</div>
                <div className="text-black font-bold text-[14px]">
                  Rs. {t}
                  {/* {d?.c?.product?.discountedprice} */}
                </div>
              </div>
              <div
                onClick={() => {
                  setPopUp(!popUp);
                }}
                className="bg-black rounded-lg flex flex-row justify-center items-center py-3"
              >
                <div className="text-white text-[14px]">PLACE ORDER</div>
              </div>
            </div>
          </div>
          {/* PopUp */}
          <div
            className={` ${popUp
              ? "h-[100%] shadow-xl ring-1 ring-[#f1f1f1] rounded-t-lg bg-[#4e4e4e48] flex justify-center items-center sm:max-md:w-[90%] shadow-3xl w-[100%] absolute bottom-0 left-0 right-0 top-0 z-40"
              : "h-[100%] rounded-t-lg bg-[#272727] sm:max-md:w-[90%] shadow-3xl absolute bottom-0 hidden"
              }`}
          >
            <div className="p-2 w-[30%] bg-white min-w-[349px] rounded-2xl px-2 pt-4">
              <div className="flex justify-between items-center px-2">
                <div className="w-[100%] font-medium ">Shipping details</div>
                <RxCross1
                  onClick={() => {
                    setPopUp(false);
                  }}
                />
              </div>
              <div className="px-4">
                <div className="w-[100%] mt-2 bg-[#f9f9f9]  p-2 rounded-2xl">
                  <div className="">To</div>
                  <div>guyghu.gyguyg.gggui</div>
                  <div className="text-[#569aff] font-medium w-full text-right">
                    Change..
                  </div>
                </div>
              </div>
              <div className="w-[100%] font-medium mt-4">
                SELECT PAYMENT OPTION
              </div>
              <div className="px-4">
                <div
                  onClick={() => {
                    setSelect(1);
                  }}
                  className="w-[100%] mt-2 bg-[#f9f9f9] p-2 rounded-2xl flex justify-between px-4 items-center"
                >
                  <div className="flex gap-2 items-center">
                    <div
                      className={`${select === 1
                        ? "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-blue-600 flex justify-center items-center"
                        : "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-white flex justify-center items-center"
                        }`}
                    >
                      <div className="ring-5 ring-blue-600 h-2 w-2 bg-white rounded-full"></div>
                    </div>{" "}
                    <div>Cash On Delivery</div>{" "}
                  </div>
                  <TbTruckDelivery className="text-green-500" />
                </div>
                <div
                  onClick={() => {
                    setSelect(2);
                  }}
                  className="w-[100%] mt-2 bg-[#f9f9f9] p-2 rounded-2xl flex justify-between px-4 items-center"
                >
                  <div className="flex gap-2 items-center">
                    <div
                      className={`${select === 2
                        ? "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-blue-600 flex justify-center items-center"
                        : "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-white flex justify-center items-center"
                        }`}
                    >
                      <div className="ring-5 ring-blue-600 h-2 w-2 bg-white rounded-full"></div>
                    </div>{" "}
                    <div>PhonePay/Google Pay/BHIM UPI </div>{" "}
                  </div>
                  <div className="gap-2 flex">
                    <FaGooglePay />
                    <SiPhonepe className="text-purple-600" />
                  </div>
                </div>
                <div
                  onClick={() => {
                    setSelect(3);
                  }}
                  className="w-[100%] mt-2 bg-[#f9f9f9] p-2 rounded-2xl flex justify-between px-4 items-center"
                >
                  <div className="flex gap-2 items-center">
                    <div
                      className={`${select === 3
                        ? "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-blue-600 flex justify-center items-center"
                        : "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-white flex justify-center items-center"
                        }`}
                    >
                      <div className="ring-5 ring-blue-600 h-2 w-2 bg-white rounded-full"></div>
                    </div>{" "}
                    <div>Net Banking</div>{" "}
                  </div>
                  <BsBank className="text-blue-300" />
                </div>
                <div
                  onClick={() => {
                    setSelect(4);
                  }}
                  className="w-[100%] mt-2 bg-[#f9f9f9] p-2 rounded-2xl px-4 "
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2 items-center">
                      <div
                        className={`${select === 4
                          ? "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-blue-600 flex justify-center items-center"
                          : "h-4 w-4 rounded-full ring-1 ring-[#f5f5f5] bg-white flex justify-center items-center"
                          }`}
                      >
                        <div className="ring-5 ring-blue-600 h-2 w-2 bg-white rounded-full"></div>
                      </div>{" "}
                      <div>Credit/Debit Card</div>{" "}
                    </div>
                    <SiVisa className="text-purple-600" />
                  </div>
                  <div className="w-full px-4">
                    <input
                      placeholder="Card Number"
                      className="bg-[#fff] w-full mt-2 h-10 rounded-xl pl-2"
                    />
                    <input
                      placeholder="Name on Card"
                      className="bg-[#fff] w-full mt-2 h-10 rounded-xl pl-2"
                    />
                    <div className="flex justify-between w-full mt-2 items-center">
                      <input
                        placeholder="MM/YY"
                        className="bg-[#fff] w-[45%] h-10 rounded-xl pl-2"
                      />
                      <input
                        placeholder="CVV"
                        className="bg-[#fff] w-[45%] h-10 rounded-xl pl-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full bg-[#171717] rounded-2xl py-2 text-white flex justify-center items-center mt-4">
                  {" "}
                  Continue
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
