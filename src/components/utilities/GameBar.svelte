<script lang="ts">
    import { createEventDispatcher } from "svelte";


    const evt = createEventDispatcher()

    const closeGame = () => {
        evt('close-game')
    }


</script>

<div id="game-bar" class="grid-setup">
    <div class="header grid-setup">
        <div role="presentation">
            <button title="Close" on:click={closeGame}>
                <svg viewBox="0 0 24 24"><use href="#close"></use></svg>
                <span class="sr-only">Close</span>
            </button>
            
            
            <button title="Coins">
                <svg viewBox="0 0 24 24"><use href="#coins"></use></svg>
                <span>240</span>
            </button>
        </div>
    </div>



    <div class="main grid-setup">
        <slot></slot>
    </div>
</div>

<style lang="scss">

    #game-bar {
        grid-column: full;
    }

    .header, .main {
        grid-column: full;
    }


    .header  {
        background: var(--clr-white);
        border-bottom-left-radius: calc(var(--radius) * 2);

        & > div[role=presentation] {
            grid-column: content;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            padding-block: 1rem;
        }

        button {
            --_icon-size: var(--icon-size, 40px);

            svg {
                width: var(--_icon-size);
                aspect-ratio: 1;
            }
        }

        button[title=Close] {
            --icon-size: 50px;
            --_padding: 0;
            --_bg: transparent;
            --_clr: var(--clr-grey-400);
        }

        button[title=Coins] {
            --icon-size: 35px;
            --_padding: 0.25rem 1rem;
            --_gap: 0.25rem;
            --_bg: var(--clr-grey-800);
            --_clr: var(--clr-grey-400);
            border-radius: var(--radius);
            font-size: var(--step-2);
            font-weight: 700;
            transition: 300ms ease;

            &:hover {
                --_bg: var(--clr-grey-400);
                --_clr: var(--clr-grey-900);
            }
        }
    }
</style>