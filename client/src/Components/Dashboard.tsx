import React from 'react';
import {GetAllOrderQueryHookResult, OrderResponse, useGetAllOrderQuery} from '../graphql/generated';

function Dashboard() {
	const {
		loading,
		error,
		data,
	}: GetAllOrderQueryHookResult = useGetAllOrderQuery();
	
	return (
		<>
			{error && <p>Error loading order</p>}
			{loading && <p>...Loading</p>}
			<table>
				<thead>
				<tr>
					<th>Title</th>
					<th>Customer</th>
					<th>Address</th>
					<th>Booking Date</th>
				</tr>
				</thead>
				{data && data.allOrders?.map((singleOrder: OrderResponse) => {
					const parsedDate = new Date(singleOrder.bookingDate)
					return (
						<tbody key={singleOrder.uid}>
						<tr>
							<th>{singleOrder.title}</th>
							<th>{singleOrder.customer?.name}</th>
							<th>{singleOrder.address?.country}</th>
							<th>{parsedDate.toDateString()}</th>
						</tr>
						</tbody>)
				})}
			</table>
		</>
	);
}

export default Dashboard;
