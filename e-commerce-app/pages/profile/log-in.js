import { React, useState, useContext } from "react";

import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

import Cookies from "js-cookie";

import { Context } from "../../libs/context.js";

export default function LogIn() {
	const [context, setContext] = useContext(Context);
	const router = useRouter();

	const loginUser = (user) => {
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
				}
			})
			.catch((error) => {
				console.error("There was an error!", error);
			});
	};
	const submitForm = () => {
		if (email) {
			if (password) {
				user.email = email;
				user.password = password;
				console.log("Verderzetten log in");
				//POST NAAR BACKEND
				loginUser(user);
			} else {
				console.log("Geen wachtwoord ingevuld");
			}
		} else {
			console.log("Geen user ingevuld");
		}
	};
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const user = {
		email: "",
		password: "",
	};
	return (
		<>
			<Head>
				<title>Log in - ByViChi</title>
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
				<main className="c-content">
					<p className="c-discover-title c-title">Inloggen</p>
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
						<p className="c-redirect">
							Heeft u nog geen account?
							<Link href="/profile/sign-up">
								<span className="c-redirect-link">Registreer</span>
							</Link>
						</p>
						<input
							value="Log in"
							type="button"
							onClick={submitForm}
							className="c-button"
						/>
						;
					</form>
				</main>
			</div>
		</>
	);
}
