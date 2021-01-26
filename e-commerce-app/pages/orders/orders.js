import Header from "../../components/organisms/Header";
import { Context } from "../../libs/context.js";

import cookies from "next-cookies";

import jwt from "jsonwebtoken";
import moment from "moment";

import React, { useContext } from "react";

export default function Orders({ orders, role, allOrders }) {
	const [context, setContext] = useContext(Context);
	if (context) {
		if (role == "Customer" && orders) {
			return (
				<>
					<Header />

					<div className="c-prodlist-sum c-order-sum c-discover">
						{orders.map((order) => (
							<div className="c-order-sum-body c-order-full" key={order.id}>
								Geplaatst: {order.placementDate.split("T")[0].split("-")[2]}-
								{order.placementDate.split("T")[0].split("-")[1]}-
								{order.placementDate.split("T")[0].split("-")[0]}
								<br />
								Verzonden: {order.shippingDate.split("T")[0].split("-")[2]}-
								{order.shippingDate.split("T")[0].split("-")[1]}-
								{order.shippingDate.split("T")[0].split("-")[0]}
								<br />
								Items: {order.orderProducts.length}
								<br />
								Totaal: €{order.totalPrice}
								<br />
							</div>
						))}
					</div>
				</>
			);
		} else if (role == "Admin" && allOrders) {
			return (
				<>
					<Header />

					<div className="c-prodlist-sum c-order-sum c-discover">
						{allOrders.map((order) => (
							<div className="c-order-sum-body c-order-full" key={order.id}>
								Geplaatst: {order.placementDate.split("T")[0].split("-")[2]}-
								{order.placementDate.split("T")[0].split("-")[1]}-
								{order.placementDate.split("T")[0].split("-")[0]}
								<br />
								{order.status}
								<br />
								Items: {order.orderProducts.length}
								<br />
								Totaal: €{order.totalPrice}
								<br />
							</div>
						))}
					</div>
				</>
			);
		}
	}
	return (
		<>
			<Header />
			<main className="c-container">
				<p className="c-caption">U heeft nog geen bestellingen geplaatst.</p>
			</main>
		</>
	);
}

export async function getServerSideProps(context) {
	let role;
	let orders;
	let allOrders;
	const decoded = jwt.decode(cookies(context).token);
	if (decoded) {
		role = decoded.role;
		try {
			const res = await fetch(
				`http://localhost:63971/api/orders/${decoded.thisUserId}`
			);
			orders = await res.json();
			const allRes = await fetch(`http://localhost:63971/api/orders`);
			allOrders = await allRes.json();
		} catch (error) {
			console.log(error);
			orders = null;
			allOrders = null;
		}
	} else {
		role = null;
		orders = null;
		allOrders = null;
	}
	return {
		props: {
			role,
			orders,
			allOrders,
		},
	};
}
