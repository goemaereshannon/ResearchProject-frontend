import Router from "next/router";
export default function ProductGrid({ products }) {
	const getDetail = (id) => {
		const path = `/products/${id}`;
		Router.push(path);
	};
	let col1;
	let col2;
	let col3;
	let col4;

	let dividedBy4;

	if (products) {
		dividedBy4 = parseInt(products.length / 4);
	}

	if (products == null || products.length == 0) {
		//geen producten of producten niet te vinden
		return (
			<>
				<p>Geen producten gevonden in deze category</p>
			</>
		);
	} else if (dividedBy4 < 1) {
		//er zijn minder dan 4 producten
		if (products.length == 1) {
			col1 = products.slice(0, 1);

			return (
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
					</div>
				</main>
			);
		}
		if (products.length == 2) {
			col1 = products.slice(0, 1);
			col2 = products.slice(1, 2);
			return (
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
					</div>
				</main>
			);
		}
		if (products.length == 3) {
			col1 = products.slice(0, 1);
			col2 = products.slice(1, 2);
			col3 = products.slice(2, 3);
			return (
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
					</div>
				</main>
			);
		}
		if (products.length == 4) {
			col1 = products.slice(0, 1);
			col2 = products.slice(1, 2);
			col3 = products.slice(2, 3);
			col4 = products.slice(3, 4);
			return (
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
				</main>
			);
		}
	} else {
		const dividedBy4 = parseInt(products.length / 4);
		col1 = products.slice(0, dividedBy4);
		col2 = products.slice(dividedBy4, dividedBy4 * 2);
		col3 = products.slice(dividedBy4 * 2, dividedBy4 * 3);
		col4 = products.slice(dividedBy4 * 3, dividedBy4 * 4);

		let rest = products.length - dividedBy4 * 4;
		let restProd = products.slice(dividedBy4 * 4, dividedBy4 * 4 + rest);
		if (restProd.length == 1) {
			const extraProd = restProd.slice(0, 1)[0];
			col1.push(extraProd);
		}
		if (restProd.length == 2) {
			const extraProd = restProd.slice(0, 1)[0];
			col1.push(extraProd);
			const extraProd2 = restProd.slice(1, 2)[0];
			col2.push(extraProd2);
		}
		if (restProd.length == 3) {
			const extraProd = restProd.slice(0, 1)[0];
			col1.push(extraProd);
			const extraProd2 = restProd.slice(1, 2)[0];
			col2.push(extraProd2);
			const extraProd3 = restProd.slice(2, 3)[0];
			col3.push(extraProd3);
		}
		if (restProd.length == 4) {
			const extraProd = restProd.slice(0, 1)[0];
			col1.push(extraProd);
			const extraProd2 = restProd.slice(1, 2)[0];
			col2.push(extraProd2);
			const extraProd3 = restProd.slice(2, 3)[0];
			col3.push(extraProd3);
			const extraProd4 = restProd.slice(3, 4)[0];
			col4.push(extraProd4);
		}
		return (
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
			</main>
		);
	}
}
