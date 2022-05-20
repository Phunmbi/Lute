import React from 'react';
import {GetAllOrderQueryHookResult, useGetAllOrderQuery} from '../graphql/generated';
import EditButton from './Buttons/EditButton';

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
		<div className='section'>
			{error && <p>Error loading order</p>}
			{loading && <p>...Loading</p>}
			<table className='table is-striped is-bordered is-narrow is-hoverable is-fullwidth'>
				<thead>
				<tr>
					<th>Title</th>
					<th>Customer Name</th>
					<th>Address</th>
					<th>Booking Date</th>
					<th>Manage Orders</th>
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
							<th><EditButton /></th>
						</tr>
						</tbody>)
				})}
			</table>
			<div className='is-flex is-justify-content-center'>
				<button  className='button is-link' type="button" disabled={!pageInfo?.hasNextPage} onClick={() => handleNext()}>Load more</button>
			</div>
		</div>
	);
}

export default Dashboard;
