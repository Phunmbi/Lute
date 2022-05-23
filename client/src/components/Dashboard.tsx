import React from "react";
import {
	GetAllOrderQueryHookResult,
	useGetAllOrderQuery,
} from "../graphql/generated";
import ActionButton from "./ActionButton";
import { useGlobalProvider } from "../providers/GlobalProvider";

const Dashboard = () => {
	const {
		state: { count },
		dispatch,
	} = useGlobalProvider();

	const { loading, error, data, fetchMore }: GetAllOrderQueryHookResult =
		useGetAllOrderQuery({
			variables: {
				first: count,
			},
			notifyOnNetworkStatusChange: true,
		});
	const pageInfo = data?.allOrders?.pageInfo;

	const handleNext = () => {
		void fetchMore({
			variables: {
				first: count,
				after: pageInfo?.endCursor,
			},
		});
	};

	const handleCountChange = (newCount: number) => {
		dispatch({ count: newCount });
		void fetchMore({
			variables: {
				first: newCount,
			},
		});
	};

	return (
		<div className="mt-5">
			{error && <p>Error loading order</p>}
			{loading && <p>...Loading</p>}
			<table className="table is-bordered is-striped is-fullwidth">
				<thead>
					<tr>
						<th>No.</th>
						<th>Title</th>
						<th>Customer Name</th>
						<th>Address</th>
						<th>Booking Date</th>
						<th>Manage Orders</th>
					</tr>
				</thead>
				{data?.allOrders?.edges?.map((edge, index) => {
					const singleOrder = edge?.node;
					const parsedDate = new Date(singleOrder?.bookingDate);
					return (
						<tbody key={singleOrder?.uid}>
							<tr>
								<th className="has-text-weight-normal">{index + 1}</th>
								<th className="has-text-weight-normal">{singleOrder?.title}</th>
								<th className="has-text-weight-normal">
									{singleOrder?.customer?.name}
								</th>
								<th className="has-text-weight-normal">
									{singleOrder?.address?.country}
								</th>
								<th className="has-text-weight-normal">
									{parsedDate.toDateString()}
								</th>
								<th>
									<div className="buttons are-medium">
										<ActionButton
											buttonClass="is-warning is-small is-rounded"
											buttonType="edit"
											order={singleOrder}
										/>
										<ActionButton
											order={singleOrder}
											buttonClass="is-info is-small is-rounded"
											buttonType="view"
										/>
									</div>
								</th>
							</tr>
						</tbody>
					);
				})}
			</table>
			<div className="is-flex column pl-0 pr-0 is-justify-content-space-between">
				<div className="select is-info">
					<select
						onChange={(e) =>
							handleCountChange(parseInt(e.currentTarget.value, 10))
						}
					>
						<option>10</option>
						<option>25</option>
						<option>50</option>
						<option>100</option>
					</select>
				</div>

				<button
					className="button is-link"
					type="button"
					disabled={!pageInfo?.hasNextPage}
					onClick={() => handleNext()}
				>
					Load more
				</button>
			</div>
		</div>
	);
};

export default Dashboard;
