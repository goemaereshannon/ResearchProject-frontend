import Header from "../../../components/organisms/Header";
import ProductGrid from "../../../components/organisms/ProductGrid";
import Head from "next/head";
import Router from "next/router";
export default function Category({ products }) {
	return (
		<>
			<Header />
			<Head>
				<title>ByViChi shop</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="c-discover">
				<ProductGrid products={products} />
			</main>
		</>
	);
}

export async function getStaticProps({ params }) {
	console.log(params.category);
	let products;
	try {
		const res = await fetch(
			`http://localhost:63875/api/products/category?category=${params.category}`
		);
		products = await res.json();
		console.log(products);
	} catch (error) {
		console.log(error);
	}

	return {
		props: {
			products,
		},
	};
}

export async function getStaticPaths() {
	const categories = ["kleding", "accessoires", "cosmetica"];
	let paths;
	try {
		paths = categories.map((category) => ({
			params: { category: category },
		}));
	} catch (error) {
		console.log(error);
	}

	return {
		paths,
		fallback: false,
	};
}
