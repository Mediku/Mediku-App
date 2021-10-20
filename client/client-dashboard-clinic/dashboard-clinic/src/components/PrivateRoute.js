import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
	return (
		<Route {...rest}>
			{localStorage.access_token ? (
				children
			) : (
				<Redirect
					to={{
						pathname: "/login",
					}}
				/>
			)}
		</Route>
	);
}