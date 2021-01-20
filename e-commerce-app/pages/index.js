import Head from "next/head";
import React, { useContext } from "react";
import { Context } from "../libs/context.js";
import { testData } from "../public/test/testProducts";
// import Instagram from 'instagram-web-api';
import Header from "../components/organisms/Header";
import Router from "next/router";

export default function Discover({ eightImgs, posts, products }) {
	const [context, setContext] = useContext(Context);
	console.log(context);
	console.log(products);
	let col1;
	const getDetail = (id) => {
		const path = `/products/${id}`;
		Router.push(path);
	};
	if (products != null) {
		col1 = products.slice(0, 2);
		const col2 = eightImgs.slice(2, 4);
		const col3 = eightImgs.slice(4, 6);
		const col4 = eightImgs.slice(6, 8);
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
									<img
										src={product.imageUrl}
										className="c-discover-photos-img"
									/>
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
									<img
										src={product.imageUrl}
										className="c-discover-photos-img"
									/>
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
									<img
										src={product.imageUrl}
										className="c-discover-photos-img"
									/>
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
									<img
										src={product.imageUrl}
										className="c-discover-photos-img"
									/>
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
	} else {
		return (
			<>
				<Header />
				<Head>
					<title>ByViChi shop</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<main className="c-discover">
					<p>No products</p>
				</main>
			</>
		);
	}
}

// posts = posts.slice(0, 4);

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
		console.log(products);
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
		},
	};
}
