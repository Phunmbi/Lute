import React from 'react';
import Dashboard from './Dashboard';

function Main() {
	return (
		<>
			<div>
				<div>
					<h3>Orders History</h3>
					<button type="button">Create Orders</button>
				</div>
				<Dashboard/>
			</div>
		</>
	);
}

export default Main;
