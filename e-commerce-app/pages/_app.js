import "../styles/screen.scss";
import React, { useState, useEffect } from "react";
import { Context } from "../libs/context.js";

function MyApp({ Component, pageProps }) {
	let stored;
	const [context, setContext] = useState("");

	useEffect(() => {
		// do  after the first render
		stored = localStorage.getItem("token");
		setContext(stored);
	}, []);
	console.log(context);
	return (
		<>
			<Context.Provider value={[context, setContext]}>
				<Component {...pageProps} />
			</Context.Provider>
		</>
	);
}

export default MyApp;
