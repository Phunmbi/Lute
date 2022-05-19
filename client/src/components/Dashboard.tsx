import React from 'react';
import {GetAllOrderQueryHookResult, useGetAllOrderQuery} from '../graphql/generated';

const Dashboard = () => {
	const {
		loading,
		error,
		data,
		fetchMore
	}: GetAllOrderQueryHookResult = useGetAllOrderQuery({
		variables: {
			first: 10,
		},
		notifyOnNetworkStatusChange: true
	});
	
	const pageInfo = data?.allOrders?.pageInfo;
	
	const handleNext = () => {
		void fetchMore({
			variables: {
				first: 10,
				after: pageInfo?.endCursor
			}
		})
	}
	
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
				{data?.allOrders?.edges?.map((edge) => {
					const singleOrder = edge?.node;
					const parsedDate = new Date(singleOrder?.bookingDate)
					return (
						<tbody key={singleOrder?.uid}>
						<tr>
							<th>{singleOrder?.title}</th>
							<th>{singleOrder?.customer?.name}</th>
							<th>{singleOrder?.address?.country}</th>
							<th>{parsedDate.toDateString()}</th>
						</tr>
						</tbody>)
				})}
			</table>
			<div>
				<button type="button" disabled={!pageInfo?.hasNextPage} onClick={() => handleNext()}>Load more</button>
			</div>
		</>
	);
}

export default Dashboard;
