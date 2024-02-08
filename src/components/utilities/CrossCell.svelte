
<script lang="ts">

    export let isEmpty: boolean = true;
    export let isFocused: boolean = false;
    export let coordinates = [0, 0]
    export let disabled = false;
    export let selected = false;
    export let isBuilder = false;

    let el: HTMLButtonElement;

    $: {
        if(isFocused) {
            el?.focus();
        }
    }






</script>

<button
    bind:this={el}
    class:empty={isEmpty}
    class:selected={selected}
    class:builder={isBuilder}
    data-coordinates={coordinates}
    disabled={disabled}
    tabindex="-1"
    title="Letter at {coordinates}"
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
        }

        &:disabled {
            --_bg: rgb(48, 168, 48);
            --_clr: var(--clr-white);
        }

        &.empty:disabled, &.builder.empty {
            --_bg: var(--clr-grey-400);
            --_clr: transparent;
        }

        &.builder{
            &:focus {
                --_bg: hsla(56, 94%, 49%, 0.863);
            }

            &.empty:focus {
                --_bg: var(--clr-grey-400);
                outline-color: var(--clr-white);
            }
        }


        &:enabled {
            --_bg: var(--clr-grey-800);
            --_clr: var(--clr-grey-400);
            
            
            &.selected {
                --_bg: hsla(173, 80%, 23%, 0.863);
                --_clr: var(--clr-white);
            }
        }





    }
</style>
