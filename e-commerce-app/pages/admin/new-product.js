import React, { useState } from "react";

import Header from "../../components/organisms/Header";

import jwt from "jsonwebtoken";

import cookies from "next-cookies";
import { useRouter } from "next/router";

export default function NewProduct({ role }) {
	const router = useRouter();
	const addProduct = (product) => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(product),
		};
		fetch("http://localhost:63875/api/product", requestOptions).then(
			async (response) => {
				const data = await response.json();
				if (!response.ok) {
					const error = (data && data.message) || response.status;
					return Promise.reject(error);
				} else {
					router.push("/");
				}
			}
		);
	};
	const saveProduct = () => {
		if (name) {
			if (brand) {
				if (descr) {
					if (imgSource) {
						if (subCategory) {
							if (category) {
								if (price) {
									product.name = name;
									product.brand = brand;
									product.description = descr;
									product.imageUrl = imgSource;
									product.subcategoryname = subCategory;
									product.categoryname = category;
									product.price.value = parseInt(price);
									console.log(product);
									addProduct(product);
								} else {
									console.log("Prijs is verplicht");
								}
							} else {
								console.log("Categorie verplicht");
							}
						} else {
							console.log("Subcategorie verplicht");
						}
					} else {
						console.log("Afbeelding is verplicht");
					}
				} else {
					console.log("Productbeschrijving is verplicht");
				}
			} else {
				console.log("Merk is verplicht");
			}
		} else {
			console.log("Productnaam is verplicht");
		}
	};
	const uploadFile = async (e) => {
		console.log(e);
		const files = e.target.files;
		console.log(files[0]);
		const data = new FormData();
		data.append("file", files[0]);
		data.append("upload_preset", "ByViChi");
		const res = await fetch(
			"http://api.cloudinary.com/v1_1/products-rp/image/upload",
			{
				method: "POST",
				body: data,
			}
		);
		const file = await res.json();
		setImgSource(file.secure_url);
		setImagePreview("c-preview-img");
	};
	const [name, setName] = useState("");
	const [brand, setBrand] = useState("");
	const [descr, setDescr] = useState("");
	const [category, setCategory] = useState("");
	const [subCategory, setSubCategory] = useState("");
	const [price, setPrice] = useState("");
	const [imagePreview, setImagePreview] = useState("c-preview-img-hidden");
	const [imgSource, setImgSource] = useState("");
	const product = {
		name: "",
		brand: "",
		description: "",
		imageUrl: "",
		subcategoryname: "",
		categoryname: "",
		price: {
			value: 0,
		},
	};
	console.log(role);
	if (role == "Admin") {
		return (
			<>
				<Header />
				<main className="c-detail c-prodlist">
					<h1>Nieuw product</h1>
					<div className="c-inputs">
						<label htmlFor="img">Afbeelding(en)</label>
						<img
							src={imgSource}
							alt="Upload preview"
							className={imagePreview}
						/>
						<input
							className="c-inputs-file"
							id="img"
							type="file"
							placeholder="Upload"
							required
							onChange={(e) => {
								uploadFile(e);
							}}
						/>
					</div>
					<div className="c-inputs">
						<label htmlFor="name">Productnaam</label>
						<input
							className="c-inputs-box"
							id="name"
							placeholder="Loavies gestreepte jurk"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
					</div>
					<div className="c-inputs">
						<label htmlFor="brand">Merk</label>
						<input
							className="c-inputs-box"
							id="brand"
							placeholder="Loavies"
							value={brand}
							onChange={(e) => {
								setBrand(e.target.value);
							}}
						/>
					</div>
					<div className="c-inputs">
						<label htmlFor="categorie">Categorie</label>
						<input
							className="c-inputs-box"
							id="categorie"
							placeholder="Loavies"
							value={category}
							onChange={(e) => {
								setCategory(e.target.value);
							}}
						/>
					</div>
					<div className="c-inputs">
						<label htmlFor="subcat">Subcategorie</label>
						<input
							className="c-inputs-box"
							id="subcat"
							placeholder="Loavies"
							value={subCategory}
							onChange={(e) => {
								setSubCategory(e.target.value);
							}}
						/>
					</div>
					<div className="c-inputs">
						<label htmlFor="descr">Beschrijving</label>
						<textarea
							className="c-inputs-area"
							id="descr"
							placeholder="Katoenen jurk met streepjespatroon. 100% biologisch katoen "
							value={descr}
							onChange={(e) => {
								setDescr(e.target.value);
							}}
						/>
					</div>
					<div className="c-inputs">
						<label htmlFor="price">Prijs</label>
						<input
							className="c-inputs-box"
							id="price"
							placeholder="50 "
							value={price}
							onChange={(e) => {
								setPrice(e.target.value);
							}}
						/>
					</div>
					<input
						value="Opslaan"
						onClick={saveProduct}
						type="button"
						className="c-button c-detail-button c-order-btn"
					/>
				</main>
			</>
		);
	} else {
		return (
			<>
				<Header></Header>
				<main className="c-main">
					U heeft toegang tot de functies van deze pagina.{" "}
				</main>
			</>
		);
	}
}

export async function getServerSideProps(context) {
	let role;
	const decoded = jwt.decode(cookies(context).token);
	role = decoded.role;
	return {
		props: {
			role,
		},
	};
}
