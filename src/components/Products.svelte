<script lang="ts">
	import type { LOGNAME } from '$env/static/private';

	import type { MoreProducts } from 'src/utils/products';
	import Search from '../components/Search.svelte';
	import { getFromApi } from '../utils/api';

	export let products: MoreProducts;
	let filteredProducts = products;

	function handleChange(event: CustomEvent<{ text: string }>) {
		const input = event.detail.text;
		filteredProducts = products.filter(
			({ node: product }) => product.name.toLowerCase().indexOf(input) >= 0
		);
	}

	async function getQuantityInCart(sku: string) {
		const cart = await getFromApi().cart();
		for (const product of cart.products) {
			if (product.sku === sku) return product.quantity;
		}
	}
</script>

<main>
	<Search on:input={handleChange} />
	
	<div class="grid">
		{#each filteredProducts as { node: product }}
			<div class="item1">
				<img
					src={`${product.image}?imwidth=175`}
					alt={product.name}
					class="image"
					loading="lazy"
				/>
				<span class="text">{product.name}</span>
				<span class="text">
					{product.prices.baseUnit}
				</span>
				<span class="price text">
					{product.prices.basePrice.toLocaleString('de-DE')} €
				</span>
				{#await getQuantityInCart(product.sku) then quantity}
					{#if quantity}
						<span class="text">
							Total in cart: {quantity}
						</span>
					{/if}
				{/await}
			</div>
		{/each}
	</div>
</main>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 10px;
		align-items: center;
		width: 95%;
		font-family: Helvetica, Arial, sans-serif;
		margin: auto;
		margin-top: 50px;
	}

	.item1 {
		min-width: 300px;
		height: 400px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: white;
		box-shadow: 0 7px 14px 0 rgba(34, 34, 34, 0.15);
		border-radius: 5px;
		position: relative;
	}

	.text {
		word-break: normal;
		font-weight: 600;
		margin-top: 15px;
		margin-left: 15px;
		margin-right: 15px;
		text-align: center;
	}

	.image {
		max-width: 175px;
		margin-bottom: 20px;
	}

	.price.text {
		font-size: 20px;
		position: absolute;
		bottom: 10px;
		left: 10px;
	}
</style>
