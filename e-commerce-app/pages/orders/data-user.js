import React from "react";

import Header from "../../components/organisms/Header";

export default function DataUser() {
	const changed = () => {
		//update user info
	};
	const goToPayment = () => {};
	return (
		<>
			<Header />
			<main className="c-detail c-prodlist">
				<h1>Bestellen</h1>
				<div className="c-crumb">
					Winkelmandje {">"} <b>Gegevens</b> {">"} Betaling {">"} Bevestiging
				</div>
				<div className="c-inputs">
					<label htmlFor="name">Familienaam</label>
					<input
						className="c-inputs-box"
						id="name"
						placeholder="Doe"
						value=""
						onChange={changed}
					/>
				</div>
				<div className="c-inputs">
					<label htmlFor="firstname">Voornaam</label>
					<input
						className="c-inputs-box"
						id="firstname"
						placeholder="John"
						value=""
						onChange={changed}
					/>
				</div>
				<div className="c-inputs">
					<label htmlFor="email">E-mailadres</label>
					<input
						className="c-inputs-box"
						id="email"
						placeholder="johndoe@domain.com"
						value=""
						onChange={changed}
					/>
				</div>
				<div className="c-inputs">
					<label htmlFor="street">Straat</label>
					<input
						className="c-inputs-box"
						id="street"
						placeholder="Ergensstraat"
						value=""
						onChange={changed}
					/>
				</div>
				<div className="c-inputs">
					<label htmlFor="number">Huisnummer</label>
					<input
						className="c-inputs-box"
						id="number"
						placeholder="101"
						value=""
						onChange={changed}
					/>
				</div>
				<div className="c-inputs">
					<label htmlFor="postCode">Postcode</label>
					<input
						className="c-inputs-box"
						id="postCode"
						placeholder="8500"
						value=""
						onChange={changed}
					/>
				</div>
				<div className="c-inputs">
					<label htmlFor="city">Stad</label>
					<input
						className="c-inputs-box"
						id="city"
						placeholder="Kortrijk"
						value=""
						onChange={changed}
					/>
				</div>
				<input
					value="Volgende"
					onClick={goToPayment}
					type="button"
					className="c-button c-detail-button c-order-btn"
				/>
			</main>
		</>
	);
}
