import Router from "next/router";
import Cookies from "js-cookie";

import jwt from "jsonwebtoken";

let SECRET_KEY = process.env.JWT_KEY;

/*
 * @params {jwtToken} extracted from cookies
 * @return {object} object of extracted token
 */
// export function verifyToken(jwtToken) {
// 	console.log("PROVIDED TOKEN");
// 	console.log({ SECRET_KEY });
// 	console.log(jwt.decode(jwtToken));

// 	try {
// 		console.log({ jwtToken });
// 		return jwt.verify(jwtToken, SECRET_KEY);
// 	} catch (e) {
// 		console.log("e:", e);
// 		return null;
// 	}
// }

/*
 * @params {request} extracted from request response
 * @return {object} object of parse jwt cookie decode object
 */
export function getAppCookies(req) {
	const parsedItems = {};
	if (req.headers.cookie) {
		const cookiesItems = req.headers.cookie.split("; ");

		cookiesItems.forEach((cookies) => {
			const parsedItem = cookies.split("=");
			console.log({ parsedItem });
			parsedItems[parsedItem[0]] = decodeURI(parsedItem[1]);
		});
	}
	console.log(parsedItems.token);
	console.log(jwt.decode(parsedItems.token));
	return parsedItems.token;
}

/*
 * @params {request} extracted from request response, {setLocalhost} your localhost address
 * @return {object} objects of protocol, host and origin
 */
export function absoluteUrl(req, setLocalhost) {
	var protocol = "https:";
	var host = req
		? req.headers["x-forwarded-host"] || req.headers["host"]
		: window.location.host;
	if (host.indexOf("localhost") > -1) {
		if (setLocalhost) host = setLocalhost;
		protocol = "http:";
	}
	return {
		protocol: protocol,
		host: host,
		origin: protocol + "//" + host,
		url: req,
	};
}

/*
 * @params {none} set action for logout and remove cookie
 * @return {function} router function to redirect
 */
export function setLogout(e) {
	e.preventDefault();
	Cookies.remove("token");
	Router.push("/");
}
