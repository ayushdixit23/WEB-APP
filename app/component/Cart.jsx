import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { API } from '../../Essentials'

const Cart = ({ d, id, removeItem }) => {
	const [quantity, setQuantity] = useState(1)


	const handlePlus = async (cartId) => {
		try {
			setQuantity(quantity + 1)
			const res = await axios.post(`${API}/updatequantityweb/${id}/${cartId}`, { quantity: quantity + 1 })
			console.log(res.data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (d) {
			setQuantity(d?.c?.quantity)
		}
	}, [d])

	const handleMinus = async (cartId) => {
		try {
			if (quantity !== 1) {
				setQuantity(quantity - 1)
				const res = await axios.post(`${API}/updatequantityweb/${data?.id}/${cartId}`, { quantity: quantity + 1 })
				console.log(res.data)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div
			className="w-[90%] h-[110px] py-1 justify-center bg-white flex flex-col mt-1 rounded-lg items-center"
		>
			<div className="w-[95%] h-[100%] bg-white mt-2 flex flex-row items-center justify-between">
				<div className="flex">
					<img
						alt="image"
						src={d?.image}
						className="bg-contain h-[90px] w-[90px] bg-[#f9f9f9]"
					/>
					<div className="flex flex-col text-black bg-white px-2">
						<div className="text-[14px] font-semibold">
							{d?.c?.product?.name}
						</div>
						<div className="text-[10px] font-semibold py-1">
							sold by {d?.c?.product?.sellername}
						</div>
						<div className="flex flex-row  items-center">
							<div className="text-[14px]">
								{d?.c?.product?.discountedprice}
							</div>
							<strike className="text-[12px] text-[#A1A1A1] px-1">
								{d?.c?.product?.price}
							</strike>
							<div className="text-[8px] text-[#B858ED] px-1">
								{d?.c?.product?.percentoff}% Off
							</div>
						</div>
						<div className="flex flex-row justify-between px-2 items-center rounded-lg bg-[#F6F6F6] h-[30px] w-[120px]">
							<div onClick={() => handleMinus(d?.c?._id)} className="bg-[#fefefe] rounded-md text-black text-[20px] h-[20px] flex justify-center items-center w-[20px]">
								-
							</div>
							<div className=" text-black text-[14px]">
								{quantity}
							</div>
							<div onClick={() => handlePlus(d?.c?._id)} className="bg-[#fefefe] rounded-md text-black text-[20px] h-[20px] flex justify-center items-center w-[20px]">
								+
							</div>
						</div>
					</div>
				</div>
				<MdDelete
					onClick={() => removeItem(d?.c?._id, d?.c?.product?._id)}
					className="h-6 w-6 text-[#3e3e3e]"
				/>
			</div>
		</div >
	)
}

export default Cart