import { useRouter } from "next/router";

import Header from "../../components/organisms/Header";
import ProductGrid from "../../components/organisms/ProductGrid";

export default function Search({ products, search }) {
	return (
		<>
			<Header />
			<p>'{search}'</p>
			<ProductGrid products={products} />
		</>
	);
}

export async function getServerSideProps(context) {
	console.log(context);
	let search = (Object.keys(context.query))[0];
	let products;
	try {
		const res = await fetch(
			`http://localhost:63875/api/productsearch?search=${
				Object.keys(context.query)[0]
			}`
		);
		products = await res.json();
		console.log(products);
	} catch (error) {
		products = null;
		search = null;
		console.log(error);
	}
	return {
		props: {
			products,
			search,
		},
	};
}
