<script lang="ts">
    import { type Direction as Dir } from "../../composables/engine";

    export let dir:Dir = 1;

</script>


<button on:click>
    <span class="img" role="presentation">
        <svg viewBox="0 0 24 24" class:vertical="{dir === 1}">
            <use href="#compass"></use>
        </svg>
    </span>


    <span class="text">Direction: {dir ? 'down' : 'across'}</span>
</button>

<style lang="scss">
    


    button {
        --_bg: var(--clr-white);
        --icon-size: 30px;
        --_padding: 0.5rem 0.75rem;
        --_gap: 0.5rem;
        display: flex;
        position: fixed;
        inset: auto auto 10vh 0;
        border-bottom-right-radius: var(--radius);
        border-top-right-radius: var(--radius);
        box-shadow: 0 0 4px 0px var(--clr-grey-700);
        

    }

    span.img {
        display: contents;
    }

    svg {
        --angle: 45deg;
        width: var(--icon-size);
        aspect-ratio: 1;
        transform: rotate(var(--angle));
        transition: 200ms transform ease-out;
        
        &.vertical {
            --angle: -45deg;
        }
    }
    
    


    
</style>