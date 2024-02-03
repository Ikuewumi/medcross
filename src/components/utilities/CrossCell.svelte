
<script lang="ts">

    export let isEmpty: boolean = true;
    export let isFocused: boolean = false;
    export let coordinates = [0, 0]
    export let disabled = false;

    let el: HTMLButtonElement;

    $: {
        if(isFocused) {
            el.focus();
        }
    }






</script>

<button
    bind:this={el}
    class:empty="{isEmpty}"
    data-coordinates={coordinates}
    disabled={disabled}
>
    <slot></slot>
</button>

<style lang="scss">
    button {
        --_padding: 0;
        --_bg: var(--clr-grey-800);
        --_clr: var(--clr-grey-400);
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;
        font-size: 2ch;
        font-weight: 700;
        box-shadow: var(--shadow-elevation-low);


        &:focus {
            outline: 2px dotted var(--clr-grey-900);
            outline-offset: -6px;
            --_bg: hsl(54, 100%, 50%, 0.6);
        }


        &.empty {
            --_bg: var(--clr-grey-400);
        }
    }
</style>
