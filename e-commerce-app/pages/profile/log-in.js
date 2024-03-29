import React from "react";

import Link from "next/link";
import Head from "next/head";

import LoginForm from "../../components/organisms/LoginForm";

export default function LogIn() {
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
					<LoginForm />
				</main>
			</div>
		</>
	);
}
