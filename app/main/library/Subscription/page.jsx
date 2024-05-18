"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API } from '../../../../Essentials'
import { useAuthContext } from '../../../utils/AuthWrapper'

const page = () => {
	const [sub, setSub] = useState([])
	const { data } = useAuthContext()

	const fetchSubscription = async () => {
		try {
			const res = await axios.get(`${API}/fetchallsubscriptions/${data?.id}`)
			console.log(res.data)
			if (res.data.success) {
				setSub(res.data.merged)
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (data.id) {
			fetchSubscription()
		}
	}, [data?.id])

	return (
		<div>
			<div>
				{sub.map((d, i) => (
					<div key={i}>
						<div>Topic {d?.status.topic}</div>
						<div>community {d?.status.community}</div>
						<div>validity {d?.status.validity}</div>
						<div>dp
							<img src={d?.status.dp} className='h-[50px] w-[50px] rounded-xl' />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default page