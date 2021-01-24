import Head from "next/head";
import cookies from "next-cookies";

import React, { useContext, useState } from "react";

import jwt from "jsonwebtoken";
import moment from "moment";

import Header from "../../components/organisms/Header";
import ToggleButton from "../../components/atoms/ToggleButton";
import { Context } from "../../libs/context.js";

export default function Account({ orders, user, role, products }) {
	function parseJwt(token) {
		if (!token) {
			return (
				<>
					<Head>
						<title>Mijn account- ByViChi</title>
					</Head>
					<Header />
					<main className="c-container">
						<img
							className="c-img"
							src="/svgs/undraw_web_shopping_dd4l.svg"
							alt="Tekening van meisje met dozen en webshop"
						/>
						<ToggleButton
							title="Registreren"
							titleTwo="Inloggen"
							pathOne="/profile/sign-up"
							pathTwo="/profile/log-in"
						></ToggleButton>
						<p className="c-caption">
							Houd uw verlanglijstje bij, volg uw bestellingen op en bestel
							sneller door eenmalig uw gegevens in te vullen…{" "}
						</p>
					</main>
				</>
			);
		}
		const base64Url = token.split(".")[1];
		const base64 = base64Url.replace("-", "+").replace("_", "/");
		return JSON.parse(window.atob(base64));
	}
	const [context, setContext] = useContext(Context);
	if (context) {
		parseJwt(context.token);
		if (role == "Customer" && orders && products) {
			return (
				<>
					<Head>
						<title>Mijn account- ByViChi</title>
					</Head>
					<Header />
					<main className="c-discover">
						<h1 className="c-prodlist-sum-cap">Dag {user.firstName}!</h1>
						<div>
							<h2>Recente bestellingen</h2>
							<div className="c-prodlist-sum c-order-sum">
								<img src={products.imageUrl} className="c-prodlist-img" />
								<div className="c-order-sum-body">
									Geplaatst:
									{moment(orders[0].placementDate).format("DD-mm-yyyy")}
									<br />
									Verzonden:{" "}
									{moment(orders[0].shippingDate).format("DD-mm-yyyy")}
									<br />
									Items: {orders[0].orderProducts.length}
									<br />
									Totaal: €{orders[0].totalPrice}
									<br />
								</div>
							</div>

							<p className="c-more">Toon alle</p>
						</div>
						<input value="Uitloggen" type="button" className="c-button" />
					</main>
				</>
			);
		} else if (role == "Admin") {
			return (
				<>
					<Header />
				</>
			);
		}
	} else {
		return (
			<>
				<Head>
					<title>Mijn account- ByViChi</title>
				</Head>
				<Header />
				<main className="c-container">
					<img
						className="c-img"
						src="/svgs/undraw_web_shopping_dd4l.svg"
						alt="Tekening van meisje met dozen en webshop"
					/>
					<ToggleButton
						title="Registreren"
						titleTwo="Inloggen"
						pathOne="/profile/sign-up"
						pathTwo="/profile/log-in"
					></ToggleButton>
					<p className="c-caption">
						Houd uw verlanglijstje bij, volg uw bestellingen op en bestel
						sneller door eenmalig uw gegevens in te vullen…{" "}
					</p>
				</main>
			</>
		);
	}
}

export async function getServerSideProps(context) {
	let user;
	let role;
	let orders;
	let products;
	const decoded = jwt.decode(cookies(context).token);
	console.log({ decoded });
	if (decoded) {
		role = decoded.role;
		try {
			const res = await fetch(
				`http://localhost:63980/api/auth/${decoded.thisUserId}`
			);
			user = await res.json();
		} catch (error) {
			console.log(error);
			user = null;
		}
		try {
			const res = await fetch(
				`http://localhost:63971/api/orders/${decoded.thisUserId}`
			);
			orders = await res.json();
		} catch (error) {
			console.log(error);
			orders = null;
		}
		try {
			const resP = await fetch(
				`http://localhost:63875/api/products/${orders[0].orderProducts[0].productId}`
			);
			products = await resP.json();
			console.log({ products });
		} catch (error) {
			console.log(error);
			products = null;
		}
	} else {
		user = null;
		role = null;
		orders = null;
	}
	return {
		props: {
			user,
			role,
			orders,
			products,
		},
	};
}
