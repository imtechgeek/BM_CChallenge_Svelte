<script lang="ts">
	import Products from '../components/Products.svelte';
	import { getFromApi } from '../utils/api';
</script>

{#await getFromApi().products()}
	<div class="loaderContainer">
		<div class="loadingSpinner" />
		Loading...
	</div>
{:then productsData}
	<div>
		<Products products={productsData.edges} />
	</div>
{/await}

<style>
	.loaderContainer {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		color: white;
		justify-content: center;
		align-items: center;
		background-color: black;
		opacity: 0.6;
		gap: 20px;
		font-size: 20px;
	}

	@keyframes spinner {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.loadingSpinner {
		width: 50px;
		height: 50px;
		border: 10px solid white;
		border-top: 10px solid black;
		border-radius: 50%;
		animation: spinner 1.5s linear infinite;
	}
</style>
