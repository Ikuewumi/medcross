<script lang="ts">
import {message} from "../../composables/toast";
</script>

<!-- @TODO - Make the visible state of the toast more accessible -->

<div role="alert"
    aria-live="assertive" 
    class={$message.type} 
    class:visible={$message.msg}
>
    <p>{$message.msg}</p>
</div>


<style lang="scss">
    div[role=alert] {
        --_width: var(--width, min(calc(100vw - 2.5rem), 30rem));   
        --_bg: hsl(204, 31%, 49%);
        --_clr: var(--clr-grey-800);
        --_y: -400%;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        background: var(--_bg);
        color: var(--_clr);
        position: fixed;
        inset: 1vmax 1vmax auto auto;
        max-width: var(--_width);
        overflow: hidden;
        padding: 0.75rem 1.25rem;
        border-radius: var(--radius);    
        font-size: var(--step--0);
        z-index: 5;
        box-shadow: var(--shadow-elevation-medium);
        transform: translateY(var(--_y));
        transition: 200ms transform cubic-bezier(0.455, 0.03, 0.515, 0.955);

        &.visible { --_y: 0%; }

        &.success { --_bg: hsl(145, 31%, 49%); }

        &.warning { --_bg: hsl(49, 31%, 49%); }

        &.failure { --_bg: hsl(0, 31%, 49%); }

        &.info { --_bg: hsl(204, 31%, 49%); }
    }





</style>


