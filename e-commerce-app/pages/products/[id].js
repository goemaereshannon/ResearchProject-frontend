import React, { useContext, useState } from "react";

import { useRouter } from "next/router";

import { Context } from "../../libs/context.js";
import Header from "../../components/organisms/Header";

export default function Details({ product }) {
	const [context, setContext] = useContext(Context);
	const [message, setMessage] = useState("c-detail-msg-none");
	const router = useRouter();
	const id = router.query.id;
	console.log(id);
	console.log(product);
	const postToCart = (userId) => {
		const cartProduct = {
			userId: userId,
			productId: id,
		};
		console.log(cartProduct);
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(cartProduct),
		};
		fetch("http://localhost:63875/api/cartproduct", requestOptions)
			.then(async (response) => {
				const data = await response.json();
				if (!response.ok) {
					const error = (data && data.message) || response.status;
					return Promise.reject(error);
				} else {
					console.log(data);
					setMessage("c-detail-msg");
				}
			})
			.catch((error) => {
				console.error("There was an error!", error);
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
					return Promise.reject(error);
				} else {
					postToCart(data);
				}
			})
			.catch((error) => {
				console.error("There was an error!", error);
			});
	};
	const addToCart = (prodId) => {
		console.log(prodId);
		const usertoken = JSON.parse(context);
		if (usertoken.token) {
			const base64Url = usertoken.token.split(".")[1];
			const base64 = base64Url.replace("-", "+").replace("_", "/");
			console.log(JSON.parse(window.atob(base64)));
			const email = JSON.parse(window.atob(base64)).sub;
			checkAuthentication(usertoken.token, email);
		} else {
			router.push("/profile/account");
		}
	};

	return (
		<div>
			<header className="c-detail-head-lg">
				<Header />
				<div className="c-head c-detail-head-lg-subnav">
					<p className="c-detail-catcrumb">
						<span className="c-detail-catcrumb-cat">
							{product.subcategory.category.name} {">"}
						</span>
						<span> {product.subcategory.name}</span>
					</p>
				</div>
			</header>
			<header className="c-head c-detail-head">
				<div
					onClick={() => {
						router.back();
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="11.625"
						viewBox="0 0 24 11.625"
					>
						<g
							id="right-arrow_1_"
							data-name="right-arrow (1)"
							transform="translate(24 143.625) rotate(180)"
						>
							<g
								id="Group_14"
								data-name="Group 14"
								transform="translate(0 132)"
							>
								<path
									id="Path_13"
									data-name="Path 13"
									d="M23.725,137.149h0l-4.9-4.875A.938.938,0,0,0,17.5,133.6l3.289,3.273H.937a.938.938,0,0,0,0,1.875H20.792L17.5,142.023a.938.938,0,0,0,1.323,1.329l4.9-4.875h0A.938.938,0,0,0,23.725,137.149Z"
									transform="translate(0 -132)"
								/>
							</g>
						</g>
					</svg>
				</div>
				<div className="c-logo-V">
					<svg
						id="like"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="21.203"
						viewBox="0 0 24 21.203"
					>
						<g id="Group_2" data-name="Group 2">
							<path
								id="Path_9"
								data-name="Path 9"
								d="M22.249,31.919a6.045,6.045,0,0,0-9.652.694,9.2,9.2,0,0,0-.6.969,9.194,9.194,0,0,0-.6-.969,6.045,6.045,0,0,0-9.652-.694A7.275,7.275,0,0,0,0,36.751,8.909,8.909,0,0,0,2.454,42.6a54.625,54.625,0,0,0,6.141,5.737c.929.791,1.889,1.61,2.912,2.5l.031.027a.7.7,0,0,0,.926,0l.031-.027c1.022-.895,1.983-1.713,2.912-2.5A54.618,54.618,0,0,0,21.546,42.6,8.909,8.909,0,0,0,24,36.751,7.275,7.275,0,0,0,22.249,31.919ZM14.493,47.263c-.8.682-1.625,1.384-2.493,2.14-.869-.755-1.693-1.457-2.494-2.14-4.878-4.157-8.1-6.9-8.1-10.512a5.871,5.871,0,0,1,1.4-3.9,4.694,4.694,0,0,1,3.569-1.606,4.74,4.74,0,0,1,3.88,2.184,8.336,8.336,0,0,1,1.076,2.14.7.7,0,0,0,1.337,0,8.337,8.337,0,0,1,1.076-2.14,4.641,4.641,0,0,1,7.449-.578,5.871,5.871,0,0,1,1.4,3.9C22.594,40.36,19.371,43.106,14.493,47.263Z"
								transform="translate(0 -29.836)"
								fill="#1c1c1c"
							/>
						</g>
					</svg>
				</div>
			</header>
			<main className="c-detail">
				<img className="c-detail-img" src={product.imageUrl}></img>
				<div className="c-detail-body">
					<p className="c-detail-product">
						{product.name}
						<span className="c-detail-price">€{product.price.value}</span>
					</p>
					<p className="c-detail-cat">{product.subcategory.name}</p>
					<p className="c-detail-descr">{product.description}</p>{" "}
					{product.productHasProperties.map((property) => (
						<div className="c-detail-extra" key="property.property.id">
							<p className="c-detail-prop-title">{property.property.name}</p>
							{property.property.propertyValues.map((propval) => (
								<div className="c-detail-prop" key="propval.id">
									<input
										type="radio"
										id={propval.value}
										name="property"
										className="c-detail-radio"
									/>
									<label
										className="c-detail-prop-value"
										htmlFor={propval.value}
									>
										<p> {propval.value}</p>
									</label>
								</div>
							))}
						</div>
					))}
					<input
						value="Voeg toe aan winkelmandje"
						type="button"
						className="c-button c-detail-button"
						onClick={() => {
							addToCart(product.id);
						}}
					/>
					<div className={message}>
						<svg width="48" height="48" viewBox="0 0 48 48">
							<g fill="#1c1c1c" stroke="#fff" strokeWidth="1">
								<circle cx="24" cy="24" r="24" stroke="none" />
								<circle cx="24" cy="24" r="23.5" fill="none" />
							</g>
							<path
								id="interface"
								d="M8.877,18.059a1.183,1.183,0,0,1-1.674,0L.52,11.376a1.775,1.775,0,0,1,0-2.51l.837-.837a1.775,1.775,0,0,1,2.511,0L8.04,12.2,19.314.926a1.775,1.775,0,0,1,2.511,0l.837.837a1.775,1.775,0,0,1,0,2.51Zm0,0"
								transform="translate(12 14.594)"
								fill="#fff"
							/>
						</svg>
						Item toegevoegd aan winkelmandje.
					</div>
				</div>
			</main>
		</div>
	);
}

export async function getStaticPaths() {
	let products;
	let paths;
	try {
		const res = await fetch("http://localhost:63875/api/products");
		products = await res.json();

		paths = products.map((prod) => ({
			params: { id: prod.id },
		}));
	} catch (error) {
		console.log(error);
	}

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	let product;
	try {
		const res = await fetch(`http://localhost:63875/api/products/${params.id}`);
		product = await res.json();
	} catch (error) {
		console.log(error);
	}

	return {
		props: {
			product,
		},
	};
}
