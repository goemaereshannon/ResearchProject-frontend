import React from "react";

import Router from "next/router";

import jwt from "jsonwebtoken";

import Header from "../../components/organisms/Header";
import { getAppCookies, verifyToken } from "../../libs/middlewareUtils";

function Cart({ products }) {
	console.log(products);
	const getDetail = (id) => {
		const path = `/products/${id}`;
		Router.push(path);
	};
	if (products != null && products.length != 0) {
		console.log(products);
		return (
			<>
				<Header />
				<main className="c-detail">
					<h1>Winkelmandje</h1>
					<div>
						{products.map((product) => (
							<div
								key={product.id}
								onClick={() => {
									getDetail(product.id);
								}}
							>
								<img src={product.imageUrl} alt={product.name} />
								<p>{product.name}</p>
								<p>{product.price.value}</p>
							</div>
						))}
					</div>
				</main>
			</>
		);
	} else {
		return (
			<>
				<Header />
				<main className="c-detail">
					<h1>Winkelmandje</h1>
					<p>
						U kunt enkel de inhoud van uw winkelmandje zien wanneer u bent
						ingelogd.
					</p>
				</main>
			</>
		);
	}
}

export async function getStaticProps() {
	let products;
	const getCartItems = (data) => {
		console.log(data);
		fetch(`http://localhost:63875/api/cartitems/${data}`)
			.then(async (response) => {
				const data = await response.json();
				if (!response.ok) {
					const error = (data && data.message) || response.status;
					return Promise.reject(error);
				} else {
					console.log(data);
					return data;
				}
			})
			.catch((error) => {
				console.error("There was an error!", error);
				return null;
			});
	};
	const checkAuthentication = (token, email) => {
		console.log(email);
		console.log(token);
		fetch(
			`http://localhost:63980/api/auth/validate?email=${email}&token=${token}`
		)
			.then(async (response) => {
				const data = await response.json();
				if (!response.ok) {
					const error = (data && data.message) || response.status;
					return null;
				} else {
					return data;
				}
			})
			.catch((error) => {
				console.error("There was an error!", error);
				return null;
			});
	};
	const token = process.env.JWT_KEY;
	const decoded = jwt.decode(token);
	try {
		const res = await fetch(
			`http://localhost:63875/api/cartitems/${decoded.thisUserId}`
		);
		products = await res.json();
	} catch (error) {
		console.log(error);
		products = null;
	}
	return {
		props: {
			products,
		},
	};
}

// export async function getServerSideProps(context) {
// 	let products;
// 	let decoded;
// 	console.log("Server side props");
// 	const { req } = context;

// 	const { token } = getAppCookies(req);

// 	if (token) {
// 		decoded = jwt.decode(token);
// 		const userId = decoded.thisUserId;
// 		// const base64Url = token.split(".")[1];
// 		// console.log("ER IS EEN BASE");
// 		// console.log(base64Url);
// 		// const base64 = base64Url.replace("-", "+").replace("_", "/");
// 		// console.log(JSON.parse(window.atob(base64)));
// 		// const email = JSON.parse(window.atob(base64)).sub;
// 		// checkAuthentication(token, email);
// 		products = null;
// 	} else {
// 		products = null;
// 	}
// 	console.log("PRDDDD");
// 	console.log(products);
// 	return {
// 		props: {
// 			products,
// 		},
// 	};
// }

export default Cart;
