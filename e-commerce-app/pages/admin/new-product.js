import React, { useState } from "react";

import Header from "../../components/organisms/Header";

import jwt from "jsonwebtoken";

import cookies from "next-cookies";

export default function NewProduct({ role }) {
    const saveProduct = () => {

    }
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
							value={name}
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
