<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let title = "Edit Info"; 
    export let open = true;
    const evt = createEventDispatcher()

    const emitClickOut = () => {
        evt('click-out')
    }
</script>



<div role="presentation" class:open on:click|self={emitClickOut}>
    <div class="modal" role="dialog" aria-modal="true">
        {#if title}
            <h2>{title}</h2>
        {/if}
        <slot />
    </div>
</div>


<style lang="scss">
div[role=presentation] {
    --_bg: var(--bg, #1b1b1b80);
    --_z-index: var(--z-index, 5);
    display: none;
    justify-items: center;
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    background: var(--_bg);
    z-index: var(--_z-index);

    h2 {
        font-size: var(--font-size, var(--step-3));
    }

    &.open {
        display: grid;
        backdrop-filter: var(--filter, none);
    }
}

[role=dialog] {
    --_padding: 1.25rem 1.25rem 2rem 1.25rem;
    --_gap: 1.25rem;
    background: var(--clr-grey-900);
    position: relative;
    margin-top: 5vh;
    max-height: 90vh;
    border-radius: var(--radius);
    overflow-y: auto;
    overscroll-behavior: contain;
    // box-shadow: var(--shadow-elevation-high);
}



</style>
