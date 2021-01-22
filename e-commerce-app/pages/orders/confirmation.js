import React from "react";

import Header from "../../components/organisms/Header";

import jwt from "jsonwebtoken";
import { useRouter } from "next/router";

export default function Confirmation({ products, cart, user }) {
	const goToPayment = () => {};
	return (
		<>
			<Header />
			<main className="c-detail c-prodlist">
				<h1>Bevestig uw bestelling</h1>
				<div className="c-crumb">
					Winkelmandje {">"} Gegevens {">"} <b>Bevestiging</b> {">"} Betaling
				</div>
				<div className="c-prodlist-sum">
					<b>Verzendadres</b>
					<p>
						<span className="c-prodlist-sum-cap">
							{user.firstName} {user.lastName}
						</span>
						<br />
						{user.streetName} {user.houseNumber}
						<br />
						{user.postCode} {user.city}
					</p>
				</div>
				<div className="c-prodlist-body">
					{products.map((product) => (
						<div
							className="c-prodlist-item"
							key={product.creationDate}
							onClick={() => {
								getDetail(product.id);
							}}
						>
							<img
								className="c-prodlist-img"
								src={product.imageUrl}
								alt={product.name}
							/>
							<div className="c-prodlist-info">
								<p>{product.name}</p>
								<p>€ {product.price.value}</p>
							</div>
						</div>
					))}
					<div className="c-prodlist-sum">
						<div className="c-prodlist-sum-row">
							<p>Totaal artikelen</p>
							<p>{cart.totalPrice}</p>
						</div>

						<div className="c-prodlist-sum-row">
							<p>Verzendkosten</p>
							<p>GRATIS</p>
						</div>

						<div className="c-prodlist-sum-row">
							<b>Totaal</b>
							<b>{cart.totalPrice}</b>
						</div>
					</div>
				</div>
				<input
					value="Bestellen"
					onClick={goToPayment}
					type="button"
					className="c-button c-detail-button c-order-btn"
				/>
			</main>
		</>
	);
}

export async function getStaticProps() {
	let products;
	let cart;
	let user;

	const token = process.env.JWT_KEY;
	const decoded = jwt.decode(token);
	console.log({ decoded });
	try {
		const resU = await fetch(
			`http://localhost:63980/api/auth/${decoded.thisUserId}`
		);
		user = await resU.json();
		console.log({ user });
		const res = await fetch(
			`http://localhost:63875/api/cartitems/${decoded.thisUserId}`
		);
		products = await res.json();
		const resC = await fetch(
			`http://localhost:63875/api/cart/${decoded.thisUserId}`
		);
		cart = await resC.json();
	} catch (error) {
		console.log(error);
		products = null;
	}

	return {
		props: {
			user,
			products,
			cart,
		},
	};
}
