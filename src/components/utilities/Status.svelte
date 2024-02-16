<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let bookmarked = false;
	export let hasCompleted = false;

	const evt = createEventDispatcher();

	const toggleBookmark = () => {
		evt("toggle-bookmark");
	};
</script>

<div class="button-bar-info">
	<button title="bookmarked" on:click={toggleBookmark}>
		{#if bookmarked}
			<svg viewBox="0 0 24 24">
				<use href="#bookmark-filled"></use>
			</svg>
			<span>Remove Bookmark</span>
		{:else}
			<svg viewBox="0 0 24 24">
				<use href="#bookmark-outline"></use>
			</svg>
			<span>Bookmark</span>
		{/if}
	</button>

	{#if hasCompleted}
		<button title="Checked">
			<svg viewBox="0 0 24 24"><use href="#done-all"></use></svg>
			<span>Completed</span>
		</button>
	{/if}
</div>


<style lang="scss">
    .button-bar-info {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-bottom: 0.5rem;




        & > button {
            --icon-size: 30px;
            --padding: 0.25rem 0.5rem;
            --gap: 0.25rem;

            border-radius: var(--radius);
            box-shadow: var(--shadow-elevation-low);


            svg {
                width: var(--icon-size);
                aspect-ratio: 1;
                filter: drop-shadow(1px 1px 2px var(--clr-grey-700));
            }


            
        }
    }
</style>
