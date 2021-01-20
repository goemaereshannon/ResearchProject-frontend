import "../styles/screen.scss";
import React, { useState } from "react";
import { Context } from "../libs/context.js";

function MyApp({ Component, pageProps }) {
	const [context, setContext] = useState("");
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
