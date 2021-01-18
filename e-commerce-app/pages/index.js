import Head from "next/head";
import React from "react";
import { testData } from "../public/test/testProducts";
// import Instagram from 'instagram-web-api';
import Header from "../components/organisms/Header";
import Router from "next/router";

export default function Discover({ eightImgs, posts, products }) {
	console.log(products);
	const getDetail = (id) => {
		const path = `/products/${id}`;
		Router.push(path);
	};
	const col1 = products.slice(0, 2);
	const col2 = eightImgs.slice(2, 4);
	const col3 = eightImgs.slice(4, 6);
	const col4 = eightImgs.slice(6, 8);
	// posts = posts.slice(0, 4);
	console.log({ col1 });
	return (
		<>
			<Header />
			<Head>
				<title>ByViChi shop</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="c-discover">
				<div className="c-discover-photos">
					<div className="c-discover-photos-col">
						{col1.map((product) => (
							<div
								key={product.id}
								onClick={() => {
									getDetail(product.id);
								}}
							>
								<img src={product.imageUrl} className="c-discover-photos-img" />
								<p className="c-discover-title">{product.name}</p>
								<p className="c-discover-price">€{product.price.value}</p>
							</div>
						))}
					</div>
					<div className="c-discover-photos-col">
						{col2.map((product) => (
							<div
								key={product.id}
								onClick={() => {
									getDetail(product.id);
								}}
							>
								<img src={product.imageUrl} className="c-discover-photos-img" />
								<p className="c-discover-title">{product.name}</p>
								<p className="c-discover-price">€{product.price.value}</p>
							</div>
						))}
					</div>
					<div className="c-discover-photos-col">
						{col3.map((product) => (
							<div
								key={product.id}
								onClick={() => {
									getDetail(product.id);
								}}
							>
								<img src={product.imageUrl} className="c-discover-photos-img" />
								<p className="c-discover-title">{product.name}</p>
								<p className="c-discover-price">€{product.price.value}</p>
							</div>
						))}
					</div>
					<div className="c-discover-photos-col">
						{col4.map((product) => (
							<div
								key={product.id}
								onClick={() => {
									getDetail(product.id);
								}}
							>
								<img src={product.imageUrl} className="c-discover-photos-img" />
								<p className="c-discover-title">{product.name}</p>
								<p className="c-discover-price">€{product.price.value}</p>
							</div>
						))}
					</div>
				</div>
				<p className="c-discover-more">
					<a>Toon meer</a>
				</p>
			</main>
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
		const res = await fetch(`${baseURL}products`);
		products = await res.json();
	} catch (error) {
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
		},
	};
}
