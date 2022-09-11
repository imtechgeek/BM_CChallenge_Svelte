<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleInput(event: Event) {
		const input = (event.target as HTMLInputElement).value;
		dispatch('input', {
			text: input.toLowerCase()
		});
	}
</script>

<div class="container">
	<div class="searchBar">
		<input
			on:input={handleInput}
			placeholder="Search Products"
			aria-label="search products"
			type="search"
			class="input"
		/>
	</div>
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 160px;
		background-color: rgb(32, 32, 32);
		align-items: center;
		width: 95%;
		margin: auto;
	}

	.searchBar {
		display: flex;
		max-width: 640px;
		width: 90%;
		height: 40px;
		border-radius: 24px;
		background-color: white;
		box-shadow: inset 0 2px 2px 0 rgba(0, 0, 0, 0.35);
		padding-left: 10px;
		justify-content: flex-start;
		align-items: center;
	}

	.input {
		width: 95%;
		color: black;
		font-size: 18px;
		border-radius: 12px;
		letter-spacing: 0.26px;
		line-height: 22px;
		background: transparent;
		border: none;
		justify-self: flex-start;
		padding-left: 20px;
		padding-right: 10px;
	}
</style>
