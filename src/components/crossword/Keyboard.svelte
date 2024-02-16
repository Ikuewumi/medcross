<script lang="ts">
    import { createEventDispatcher } from "svelte";

export let open= true;

const evt = createEventDispatcher();

const handleKey = (e: MouseEvent) => {
    const specialKeys= ["Close Keyboard", "Delete"]
    const button = e.target! as HTMLButtonElement;
    if (button.tagName.toUpperCase() !== "BUTTON") return
    if (specialKeys.includes(button.title)) {
        switch(button.title) {
            case "Close Keyboard":
                console.log('closing keyboard')
                evt("close-keyboard");
                break;
            case "Backspace": 
                evt("delete-letter");
                break;
        }


        return;
    }


    if (button.innerText.length > 1) return;

    evt('enter-key', button.innerText)
}

</script>


<div id="keyboard-widget" aria-hidden={!open} inert={!open} data-open={open} on:click={handleKey}>
    <div class="row">
        <button>Q</button>
        <button>W</button>
        <button>E</button>
        <button>R</button>
        <button>T</button>
        <button>Y</button>
        <button>U</button>
        <button>I</button>
        <button>O</button>
        <button>P</button>
    </div>
    <div class="row">
        <button>A</button>
        <button>S</button>
        <button>D</button>
        <button>F</button>
        <button>G</button>
        <button>H</button>
        <button>J</button>
        <button>K</button>
        <button>L</button>
    </div>
    <div class="row">
        <button class="strech" title="Close Keyboard">
            <svg viewBox="0 0 24 24"><use href="#down"></use></svg>
        </button>
        <button>Z</button>
        <button>X</button>
        <button>C</button>
        <button>V</button>
        <button>B</button>
        <button>N</button>
        <button>M</button>
        <button class="strech" title="Delete">
            <svg viewBox="0 0 24 24"><use href="#backspace"></use></svg>
        </button>
    </div>
</div>

<style lang="scss">
    #keyboard-widget {
        --scale: 0;
        --_keyboard-gap: var(--keyboard-gap, 0.75rem 0.5rem);
        --_keyboard-width: var(--keyboard-width, min(100%, 35rem));
        --_button-width: var(--button-width, clamp(0.1ch, 0.1ch + 7.7vw, 3ch));
        --_button-special-width: var(
            --button-special-width,
            clamp(0.2ch, 0.2ch + 12vw, 5ch)
        );
        --_keyboard-bg: var(--keyboard-bg, var(--clr-grey-800));
        --_key-bg: var(--key-bg, transparent);
        --_keyboard-clr: var(--keyboard-clr, var(--clr-grey-400));
        --_keyboard-shadow: var(
            --keyboard-shadow,
            0px 5px 10px -4px hsl(var(--shadow-color) / 0.7)
        );
        --_key-shadow: var(
            --key-shadow,
            0 0 5px -3px hsl(var(--shadow-color) / 0.5)
        );
        --_key-border: var(
            --key-border,
            0.5px solid hsl(var(--shadow-color) / 0.3)
        );
        --_padding: var(--padding, 1rem 0.5rem 1.25rem 0.5rem);
        --_font-size: var(--font-size, clamp(1.75ch, 2ch + 3vw, 2.25ch));
        --_font-weight: var(--font-weight, 700);
        --_outline: var(--outline, 2px solid var(--clr-white));

        //width: fit-content;
        grid-column: 1 / -1;
        width: var(--_keyboard-width);
        padding: var(--_padding);
        background: var(--_keyboard-bg);
        flex-direction: column;
        outline: var(--_outline);
        outline-offset: -4px;
        overflow-x: hidden;
        box-shadow: var(--_keyboard-shadow);
        transform: scaleY(var(--scale));
        transform-origin: bottom;
        transition: transform 200ms ease-out;

        // For The Positioning
        --keyboard-width: 100vw;
        z-index: 9;
        position: fixed;
        inset: auto 0 0 0;

        &[data-open=true] {
            --scale: 1;
        
        }

        &,
        & button {
            border-radius: var(--radius);
        }

        &,
        & > .row {
            display: flex;
            gap: var(--_keyboard-gap);
        }

        & > .row {
            flex-direction: row;
            flex: 0 0 auto;
            margin-inline: auto;
        }

        button {
            --padding: 0;
            display: flex;
            place-items: center;
            place-content: center;

            height: var(--_button-width);
            overflow: hidden;
            border: var(--_key-border);
            aspect-ratio: 1;
            font-size: var(--_font-size);
            font-weight: var(--_font-weight);
            box-shadow: var(--_key-shadow);
            background-color: var(--_key-bg);
            color: var(--_keyboard-clr);

            &.strech {
                aspect-ratio: revert;
                width: var(--_button-special-width);
            }

            &:hover,
            &:focus-visible {
                --_key-bg: var(--key-bg, var(--clr-grey-400));
                --_keyboard-clr: var(--keyboard-clr, var(--clr-grey-900));
            }

            svg {
                pointer-events: none;
            }
        }

        // I hate to do this, but I have to use media queries to change the button sizes and whatnot to make the keyboard responsive
        @media (max-width: 580px) {
            --_keyboard-gap: var(--keyboard-gap, 0.6rem 0.35rem);

            button {
                aspect-ratio: revert;
                height: 2.75ch;
                width: var(--_button-width);
            }
        }
    }
</style>
