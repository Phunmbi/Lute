import React from 'react';
import Sidebar from './Sidebar';
import Main from './Main';
import 'firebaseui/dist/firebaseui.css'

function Layout() {
	return (
		<div>
			<Sidebar/>
			<Main/>
		</div>
	);
}

export default Layout;
