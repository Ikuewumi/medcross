<script lang="ts">
	import { onDestroy, onMount } from "svelte";
    	import { Coins } from "../../composables/coins";
    

	let unsub: Function;	

	onMount(() => {

		Coins.sync();
		unsub = Coins.value.subscribe(val => {
			const el = document.querySelector("#coin-number > span");
			if (!el) return;

			el.textContent = `${val} coins`
		})

	});


	onDestroy(() => {

		unsub?.call(null)
	})
</script>
