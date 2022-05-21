import React from "react";

interface IErrorFallback {
	error: { message: string },
	resetErrorBoundary: () => void
}

const ErrorFallback = ({error, resetErrorBoundary}: IErrorFallback) => {
	return (
		<div role="alert">
			<p>Something went wrong with Lute, Sorry about that.</p>
			{/*<pre>{error.message}</pre>*/}
			<button onClick={resetErrorBoundary}>Reset Lute</button>
		</div>
	)
}

export default ErrorFallback