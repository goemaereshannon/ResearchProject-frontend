import React, { useState, useContext } from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

import Cookies from "js-cookie";

import { Context } from "../../libs/context.js";

export default function SignUp() {
	const [context, setContext] = useContext(Context);
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [lastName, setlastName] = useState("");
	const [firstName, setFirstName] = useState("");
	const [streetName, setstreetName] = useState("");
	const [houseNumber, sethouseNumber] = useState("");
	const [postCode, setPostCode] = useState("");
	const [city, setCity] = useState("");
	const [page, setPage] = useState("c-content");
	const [pageTwo, setPageTwo] = useState("c-content c-two");
	const user = {
		firstName: "",
		lastName: "",
		email: "",
		streetName: "",
		houseNumber: 0,
		postCode: 0,
		city: "",
		password: "",
	};

	const userLogin = (user) => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user),
		};
		fetch("http://localhost:63980/api/auth/login", requestOptions)
			.then(async (response) => {
				const data = await response.json();
				if (!response.ok) {
					const error = (data && data.message) || response.status;
					return Promise.reject(error);
				} else {
					console.log(data);
					setContext(data);
					localStorage.setItem("token", JSON.stringify(data));
					Cookies.set("token", data.token);
					process.env.JWT_KEY = data.token;
					router.push("/profile/account");
					console.log(context);
				}
			})
			.catch((error) => {
				console.error("There was an error!", error);
			});
	};

	const registerUser = (user) => {
		console.log("Registreer user");
		console.log(JSON.stringify(user));
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user),
		};
		fetch("http://localhost:63980/api/auth/register", requestOptions)
			.then(async (response) => {
				const data = await response.json();
				console.log("DATA");
				console.log(data);
				if (!response.ok) {
					const error = (data && data.message) || response.status;
					return Promise.reject(error);
				} else {
					const loginUser = {
						email: user.email,
						password: user.password,
					};
					userLogin(loginUser);
				}
			})
			.catch((error) => {
				console.error("There was an error!", error);
			});
	};
	const submitData = () => {
		if (lastName) {
			if (streetName) {
				if (houseNumber) {
					if (postCode) {
						if (city) {
							console.log("Voornaam" + firstName);
							if (firstName != "") {
								user.email = email;
								user.firstName = firstName;
								user.password = password;
								user.lastName = lastName;
								user.streetName = streetName;
								user.houseNumber = parseInt(houseNumber);
								user.postCode = postCode;
								user.city = city;
								console.log("Gegevens correct ingevuld");
								console.log(user);
								registerUser(user);
							} else {
								user.firstName = "";
							}
						} else {
							console.log("Stad is verplicht");
						}
					} else {
						console.log("Postcode is verplicht");
					}
				} else {
					console.log("Huisnummer is verplicht");
				}
			} else {
				console.log("Straat is verplicht");
			}
		} else {
			console.log("Familienaam is verplicht");
		}
	};
	const submitForm = () => {
		console.log("Submit FORM");
		if (email) {
			console.log(password);
			console.log(confirmPassword);
			if (confirmPassword == password) {
				console.log(user);
				console.log("Registreren");
				setPage("c-content c-one");
				setPageTwo("c-content");
			} else {
				console.log("Wachtwoorden zijn niet gelijk");
			}
		} else {
			console.log("Geen e-mailadres ingevuld");
		}
	};
	return (
		<>
			<Head>
				<title>Registreer - By ViChi</title>
			</Head>
			<div className="mint-bg">
				<header className="c-head">
					<Link href="/profile/account">
						<img src="/svgs/arrow.svg" alt="Back arrow" />
					</Link>
					<Link href="/" className="c-logo-V">
						<img
							className="c-logo-V"
							src="/logo/logo_small.png"
							alt="Minimal logo V with flowers"
						/>
					</Link>
				</header>
				<main className={page}>
					<p className="c-discover-title c-title">Registreren</p>
					<form className="c-main">
						<div className="c-inputs">
							<label htmlFor="email">E-mailadres</label>
							<img
								className="c-inputs-icon"
								src="/svgs/man-avatar.svg"
								alt="Avatar"
							/>
							<input
								className="c-inputs-line"
								id="email"
								placeholder="john.doe@domain.be"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
						</div>
						<div className="c-inputs">
							<label htmlFor="password">Wachtwoord</label>
							<img
								className="c-inputs-icon"
								src="/svgs/closed.svg"
								alt="Closed lock"
							/>
							<input
								type="password"
								className="c-inputs-line"
								id="password"
								placeholder="********"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</div>
						<div className="c-inputs">
							<label htmlFor="confirmpassword">Wachtwoord bevestigen</label>
							<img
								className="c-inputs-icon"
								src="/svgs/key-outline.svg"
								alt="Key"
							/>
							<input
								type="password"
								className="c-inputs-line"
								id="confirmpassword"
								placeholder="********"
								value={confirmPassword}
								onChange={(e) => {
									setConfirmPassword(e.target.value);
								}}
							/>
						</div>
						<p className="c-redirect">
							Heeft u al een account?{" "}
							<Link href="/profile/log-in">
								<span className="c-redirect-link">Log in</span>
							</Link>
						</p>
						<input
							value="Registreer"
							type="button"
							onClick={submitForm}
							className="c-button"
						/>
						;
					</form>
				</main>
				<main className={pageTwo}>
					<p className="c-discover-title c-title">Gegevens</p>
					<form className="c-main">
						<div className="c-inputs">
							<label htmlFor="lastName">Naam</label>
							<input
								required
								className="c-inputs-box"
								id="lastName"
								placeholder="Doe"
								value={lastName}
								onChange={(e) => {
									setlastName(e.target.value);
								}}
							/>
						</div>
						<div className="c-inputs">
							<label htmlFor="firstName">Voornaam</label>
							<input
								className="c-inputs-box"
								id="firstName"
								placeholder="John"
								value={firstName}
								onChange={(e) => {
									setFirstName(e.target.value);
								}}
							/>
						</div>
						<div className="c-inputs">
							<label htmlFor="streetName">Straat</label>
							<input
								required
								className="c-inputs-box"
								id="streetName"
								placeholder="Ergensstraat"
								value={streetName}
								onChange={(e) => {
									setstreetName(e.target.value);
								}}
							/>
						</div>
						<div className="c-inputs">
							<label htmlFor="houseNumber">Nummer</label>
							<input
								required
								className="c-inputs-box "
								id="houseNumber"
								placeholder="101"
								value={houseNumber}
								onChange={(e) => {
									sethouseNumber(e.target.value);
								}}
							/>
						</div>
						<div className="c-inputs">
							<label htmlFor="bus">Bus</label>
							<input className="c-inputs-box" id="bus" placeholder="B" />
						</div>
						<div className="c-inputs">
							<label htmlFor="postcode">Postcode</label>
							<input
								required
								className="c-inputs-box"
								id="postcode"
								placeholder="1111"
								value={postCode}
								onChange={(e) => {
									setPostCode(e.target.value);
								}}
							/>
						</div>
						<div className="c-inputs">
							<label htmlFor="city">Stad</label>
							<input
								required
								className="c-inputs-box"
								id="city"
								placeholder="Utopia"
								value={city}
								onChange={(e) => {
									setCity(e.target.value);
								}}
							/>
						</div>
						<input
							value="Opslaan"
							type="button"
							onClick={submitData}
							className="c-button"
						/>
					</form>
				</main>
			</div>
		</>
	);
}
