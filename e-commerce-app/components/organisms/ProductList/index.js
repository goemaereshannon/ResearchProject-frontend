export default function ProductList(){
    const [context, setContext] = useContext(Context);
	let products = [];
	const getDetail = (id) => {
		const path = `/products/${id}`;
		Router.push(path);
	};
	const getCartItems = (data) => {
		console.log(data);
		fetch(`http://localhost:63875/api/cartitems/${data}`)
			.then(async (response) => {
				const data = await response.json();
				if (!response.ok) {
					const error = (data && data.message) || response.status;
					return Promise.reject(error);
				} else {
					console.log(data);
					products = data;
				}
			})
			.catch((error) => {
				products = null;
				console.error("There was an error!", error);
			});
	};
	const checkAuthentication = (token, email) => {
		console.log(email);
		console.log(token);
		fetch(
			`http://localhost:63980/api/auth/validate?email=${email}&token=${token}`
		)
			.then(async (response) => {
				const data = await response.json();
				if (!response.ok) {
					const error = (data && data.message) || response.status;
					return Promise.reject(error);
				} else {
					getCartItems(data);
				}
			})
			.catch((error) => {
				console.error("There was an error!", error);
			});
	};
	if (context) {
		console.log(JSON.parse(context).token);
		const base64Url = JSON.parse(context).token.split(".")[1];
		const base64 = base64Url.replace("-", "+").replace("_", "/");
		console.log(JSON.parse(window.atob(base64)));
		const email = JSON.parse(window.atob(base64)).sub;
		checkAuthentication(JSON.parse(context).token, email);
	} else {
		products = null;
    }
    
	if (products != null && products.length != 0) {
		console.log(products);
		return (
			<>
				<Header />
				<main className="c-detail">
					<h1>Winkelmandje</h1>
					<div>
						{products.map((product) => (
							<div
								key={product.id}
								onClick={() => {
									getDetail(product.id);
								}}
							>
								<img src={product.imageUrl} alt={product.name} />
								<p>{product.name}</p>
								<p>{product.price.value}</p>
							</div>
						))}
					</div>
				</main>
			</>
		);
	} else {
		return (
			<>
				<Header />
				<main className="c-detail">
					<h1>Winkelmandje</h1>
					<p>
						U kunt enkel de inhoud van uw winkelmandje zien wanneer u bent
						ingelogd.
					</p>
				</main>
			</>
		);
	}
}