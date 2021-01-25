import { useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import React, { useState, useContext } from "react";
import { Context } from "../../../libs/context.js";

import Link from "next/link";
import { useRouter } from "next/router";

import Cookies from "js-cookie";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginUnsuccesfull, setLoginUnsuccesfull] = useState("");

	const [context, setContext] = useContext(Context);
	const router = useRouter();
	const user = {
		email: "",
		password: "",
	};
	const { register, handleSubmit, errors } = useForm();

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
					setLoginUnsuccesfull("Gegevens ongeldig");
					return Promise.reject(error);
				} else {
					setContext(data);
					setLoginUnsuccesfull("");
					localStorage.setItem("token", JSON.stringify(data));
					Cookies.set("token", data.token);
					router.push("/profile/account");
				}
			})
			.catch((error) => {
				setLoginUnsuccesfull("Gegevens ongeldig");
				console.log("There was an error!", error);
			});
	};

	const onSubmit = () => {
		user.email = email;
		user.password = password;
		console.log("Verderzetten log in");
		//POST NAAR BACKEND
		loginUser(user);
	};
	return (
		<form className="c-main" onSubmit={handleSubmit(onSubmit)}>
			<div className="c-inputs">
				<label htmlFor="email">E-mailadres</label>
				<img
					className="c-inputs-icon"
					src="/svgs/man-avatar.svg"
					alt="Avatar"
				/>
				<input
					ref={register({
						required: "Verplicht",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "Ongeldig e-mailadres",
						},
					})}
					className="c-inputs-line"
					id="email"
					name="email"
					placeholder="john.doe@domain.be"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
			</div>
			{errors.email && (
				<Alert variant="danger">
					{errors.email?.type === "required" && (
						<p className="error">Emailadres is verplicht</p>
					)}
					{errors.email?.type === "pattern" && (
						<p className="error">Ongeldig emailadres</p>
					)}
				</Alert>
			)}
			<div className="c-inputs">
				<label htmlFor="password">Wachtwoord</label>
				<img
					className="c-inputs-icon"
					src="/svgs/closed.svg"
					alt="Closed lock"
				/>
				<input
					ref={register({
						required: "Verplicht",
					})}
					type="password"
					name="password"
					className="c-inputs-line"
					id="password"
					placeholder="********"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
			</div>
			{errors.password && (
				<Alert variant="danger">
					{errors.password?.type === "password" && (
						<p className="error">Wachtwoord is verplicht</p>
					)}
				</Alert>
			)}
			<p className="c-redirect">
				Heeft u nog geen account?
				<Link href="/profile/sign-up">
					<span className="c-redirect-link"> Registreer</span>
				</Link>
			</p>
			<button type="submit" className="c-button">
				Log in
			</button>{" "}
			<p className="error">{loginUnsuccesfull}</p>
		</form>
	);
}
