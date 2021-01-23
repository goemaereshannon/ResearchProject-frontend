import Head from "next/head";
import React, { useContext } from "react";
import { Context } from "../libs/context.js";
import { testData } from "../public/test/testProducts";
// import Instagram from 'instagram-web-api';
import Header from "../components/organisms/Header";
import ProductGrid from "../components/organisms/ProductGrid";

export default function Discover({ posts, products }) {
	return (
		<>
			<Header />
			<Head>
				<title>ByViChi shop</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ProductGrid products={products} />
		</>
	);
}

export async function getStaticProps() {
	// const client = new Instagram({ username: 'shannongoemaere', password: process.env.INSTA_PASSWORD });
	// await client.login();

	// const response = await client.getPhotosByUsername({
	//   username: 'shannongoemaere',
	// });
	const baseURL = process.env.BASE_URL_PROD;
	let products;

	try {
		const res = await fetch("http://localhost:63875/api/products");
		products = await res.json();
	} catch (error) {
		products = null;
		console.log(error);
	}

	// const res = await fetch(`https://.../data`)
	// const data = await res.json()

	const eightImgs = testData;
	return {
		props: {
			eightImgs,
			// posts: response.user.edge_owner_to_timeline_media.edges,
			products,
			// context,
		},
	};
}
