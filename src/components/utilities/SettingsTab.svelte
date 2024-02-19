<script lang="ts">
	import { onMount } from "svelte";
	
	let tabList:HTMLUListElement;
	let tabPanel:HTMLElement;
	let tabContainer: HTMLElement;



	console.log('tabs')







</script>

<div class="tab-wrapper">
	<div class="tabs-container" bind:this={tabContainer}>
		<ul aria-labelledby="settings-header" bind:this={tabList}>
			<li>
				<a id="tab-1" href="#settings-tab-bookmarked">
					<svg viewBox="0 0 24 24">
						<use href="#bookmark-filled"
						></use>
					</svg>
					<span>Bookmarked</span>
				</a>
			</li>
			<li>
				<a id="tab-2" href="#settings-tab-preferences">
					<svg viewBox="0 0 24 24">
						<use href="#settings"></use>
					</svg>
					<span>Preferences</span>
				</a>
			</li>
		</ul>

		<div class="tabpanels" bind:this={tabPanel}>
			<div
				id="settings-tab-bookmarked"
				aria-labelledby="tab-1"
			>
				<p>
					Lorem ipsum dolor sit amet, officia
					excepteur ex fugiat reprehenderit enim
					labore culpa sint ad nisi Lorem pariatur
					mollit ex esse exercitation amet. Nisi
					anim cupidatat excepteur officia.
					Reprehenderit nostrud nostrud ipsum
				</p>
			</div>
			<div
				id="settings-tab-preferences"
				aria-labelledby="tab-2"
			>
				<strong>Pref</strong>
				<p>
					Lorem ipsum dolor sit amet, officia
					excepteur ex fugiat reprehenderit enim
					labore culpa sint ad nisi Lorem pariatur
					mollit ex esse exercitation amet. Nisi
					anim cupidatat excepteur officia.
					Reprehenderit nostrud nostrud ipsum
					Lorem est aliquip amet voluptate
					voluptate dolor minim nulla est
				</p>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	ul {
		display: flex;
		gap: 0;
		width: 100%;
		overflow-x: auto;
		list-style: none;
		margin-inline-start: 1rem;

		li {
			display: contents;
		}

		a {
			--icon-size: 30px;
			display: flex;
			gap: 0.2rem;
			align-items: center;
			background: var(--clr-white);
			padding: 0.25rem 0.5rem;
			font-size: var(--step-1);
			font-weight: 700;
			text-decoration: none;
			letter-spacing: -0.5px;
			color: var(--clr-grey-400);

			&:focus {
				outline: 2px solid currentColor;
				outline-offset: -4px;
			}

			svg {
				width: var(--icon-size);
				aspect-ratio: 1;
			}
		}
	}

	.tabpanels {
		width: 100%;
		background-color: var(--clr-white);
		border-bottom-left-radius: var(--radius);
		border-bottom-right-radius: var(--radius);
		border: 1px solid hsl(var(--shadow-color) / 0.3);
	}
</style>
