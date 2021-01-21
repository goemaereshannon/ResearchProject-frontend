import React from "react";

import Router from "next/router";

import jwt from "jsonwebtoken";

import Header from "../../components/organisms/Header";

export default function Cart({ products, cart }) {
	const getDetail = (id) => {
		const path = `/products/${id}`;
		Router.push(path);
	};
	const order = () => {
		console.log("Men wil bestellen");
	};
	if (products != null && products.length != 0) {
		console.log(products);
		return (
			<>
				<Header />
				<main className="c-detail c-prodlist">
					<h1>Winkelmandje</h1>
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
					<div className="c-prodlist-btn">
						<input
							value="Bestellen"
							type="button"
							onClick={order}
							className="c-button"
						/>
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
	let cart;
	const token = process.env.JWT_KEY;
	const decoded = jwt.decode(token);
	try {
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
			products,
			cart,
		},
	};
}
