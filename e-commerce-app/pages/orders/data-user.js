import React from "react";

import Router from "next/router";
import cookies from "next-cookies";

import Header from "../../components/organisms/Header";

import jwt from "jsonwebtoken";

export default function DataUser({ user }) {
	const changed = () => {
		//update user info
	};
	const goToConfirmation = () => {
		Router.push("/orders/confirmation");
	};
	return (
		<>
			<Header />
			<main className="c-detail c-prodlist">
				<h1>Bestellen</h1>
				<div className="c-crumb">
					Winkelmandje {">"} <b>Gegevens</b> {">"} Bevestiging {">"} Betaling
				</div>
				<div className="c-inputs">
					<label htmlFor="name">Familienaam</label>
					<input
						className="c-inputs-box"
						id="name"
						placeholder="Doe"
						value={user.lastName}
						onChange={changed}
					/>
				</div>
				<div className="c-inputs">
					<label htmlFor="firstname">Voornaam</label>
					<input
						className="c-inputs-box"
						id="firstname"
						placeholder="John"
						value={user.firstName}
						onChange={changed}
					/>
				</div>
				<div className="c-inputs">
					<label htmlFor="email">E-mailadres</label>
					<input
						className="c-inputs-box"
						id="email"
						placeholder="johndoe@domain.com"
						value={user.email}
						onChange={changed}
					/>
				</div>
				<div className="c-inputs">
					<label htmlFor="street">Straat</label>
					<input
						className="c-inputs-box"
						id="street"
						placeholder="Ergensstraat"
						value={user.streetName}
						onChange={changed}
					/>
				</div>
				<div className="c-inputs">
					<label htmlFor="number">Huisnummer</label>
					<input
						className="c-inputs-box"
						id="number"
						placeholder="101"
						value={user.houseNumber}
						onChange={changed}
					/>
				</div>
				<div className="c-inputs">
					<label htmlFor="postCode">Postcode</label>
					<input
						className="c-inputs-box"
						id="postCode"
						placeholder="8500"
						value={user.postCode}
						onChange={changed}
					/>
				</div>
				<div className="c-inputs">
					<label htmlFor="city">Stad</label>
					<input
						className="c-inputs-box"
						id="city"
						placeholder="Kortrijk"
						value={user.city}
						onChange={changed}
					/>
				</div>
				<input
					value="Volgende"
					onClick={goToConfirmation}
					type="button"
					className="c-button c-detail-button c-order-btn"
				/>
			</main>
		</>
	);
}

export async function getServerSideProps(context) {
	let user;

	const decoded = jwt.decode(cookies(context).token);
	try {
		const res = await fetch(
			`http://localhost:63980/api/auth/${decoded.thisUserId}`
		);
		user = await res.json();
	} catch (error) {
		console.log(error);
	}

	return {
		props: {
			user,
		},
	};
}
