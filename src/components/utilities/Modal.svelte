<script lang="ts">
    export let title = "Edit Info"; 
    export let open = true;
</script>



<div role="presentation" class:open>
    <div class="modal" role="dialog" aria-modal="true">
        <h2>{title}</h2>
        <slot />
    </div>
</div>


<style lang="scss">
div[role=presentation] {
    --_bg: var(--bg, #1b1b1b80);
    display: none;
    justify-items: center;
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    background: var(--_bg);
    z-index: 5;

    &.open {
        display: grid;
    }
}

[role=dialog] {
    --_padding: 1.25rem 1.25rem 2rem 1.25rem;
    --_gap: 1.25rem;
    background: var(--clr-grey-900);
    margin-top: 5vh;
    max-height: 90vh;
    overflow-y: auto;
}



</style>