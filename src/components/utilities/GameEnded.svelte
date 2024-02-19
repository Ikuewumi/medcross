<script>
    import { createEventDispatcher } from "svelte";

    export let wordCount = 0;
    export let coinGain = 10;
    export let open = false;


    const evt = createEventDispatcher()

    const emitClose = () => {
        evt('close-modal')
    }
</script>

<div role="presentation" class:open>
    <article class="done">
        <svg style="--icon-size:50px;" viewBox="0 0 24 24"><use href="#check-filled"></use></svg>
        <h2>COMPLETED!</h2>
        <p>
            Solved <strong>{wordCount}</strong>
            {wordCount > 1 ? `words` : `word`}
        </p>
        <p class="coins-gain">+{coinGain} coins</p>
    </article>

    <button on:click={emitClose}>Continue</button>
</div>

<style lang="scss">
    div[role=presentation] {
        --bg: #080808d6;
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        background: var(--bg);
        display: none;
        gap: 1rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(7px);
        
        & > * {
            width: min(100% - 3rem, 30rem);
        }


        &.open {
            display: flex;
        }
    }

    article.done {
        --icon-size: 50px;
        display: flex;
        gap: 0.75rem;
        flex-direction: column;
        place-items: center;
        background: var(--clr-white);
        padding-block: 2rem 2.5rem;
        padding-inline: 0.5rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow-elevation-low);

        svg {
            width: var(--icon-size);
            aspect-ratio: 1;
        }
    }

    p {
        display: flex;
        align-items: center;
        gap: 0.25rem;

        &.coins-gain {
            margin-top: -0.5rem;
            font-size: var(--step-2);
            font-weight: 700;
            color: var(--clr-grey-500);
        }
    }

    article.done + button {
        display: flex;
        justify-content: center;
        background: var(--clr-grey-400);
        color: var(--clr-grey-900);
        padding: 1rem 0.75rem;
        outline-offset: -6px;
        border-radius: var(--radius);
        font-size: var(--step-2);
        text-align: center;
        box-shadow: var(--shadow-elevation-medium);
    }
</style>
