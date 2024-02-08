<script lang="ts">
    import { CrossWord as C, type CrossFull, type Word } from "../composables/engine";
    import { decodeString } from "../composables/text";
    import Modal from "./utilities/Modal.svelte";
    import {coinCount, costs, currentWord, gameOngoing} from "../composables/store";
    import GameBar from "./utilities/GameBar.svelte";
    import GermanMode from "../components/german/GermanMode.svelte";
    import CrosswordClassic from "./crossword/CrosswordClassic.svelte";
    import { enterMsg } from "../composables/toast";
    import { sleep } from "../composables/utilities";

    /**
     * The User Data as an encoded string
     */
    export let enc = "";
    let data: CrossFull;
    let userAnswers:Word[] = [];
    let confirmModal = false;
    const modes = ["trivia", "classic"] as const;
    type GameMode = (typeof modes)[number];
    let selectedMode: GameMode = "trivia";

    const openConfirmModal = () => confirmModal = true;
    const closeConfirmModal = () => confirmModal = false;



    $: { data = JSON.parse(decodeString(enc)); }




    const startGame = () => {
        closeConfirmModal()
        $gameOngoing = true
    }


    const endGame = () => {
        $gameOngoing = false
    }


    const changeUserAnswers = (e: CustomEvent<Word[]>) => {
        userAnswers = e.detail
    }


    const revealWord = async () => {
        if ($coinCount < costs.revealWord) return enterMsg(`coins are not sufficient`, `failure`)
        const coin = $coinCount - costs.revealWord
        if (coin < 0) return enterMsg(`coins are not sufficient`, `failure`), 
    
        console.log(coin)

        $coinCount = coin
        await sleep(0);
        console.log($coinCount)
        enterMsg(`${$currentWord.word} has been revealed for ${costs.revealWord} coins`, `success`, 4000)
    }

</script>





{#if data.words.length > 1 && data.size > 1}
    <button class="play" on:click={openConfirmModal} id="play-btn">
        <svg viewBox="0 0 24 24"><use href="#play"></use></svg>
        <span>Play</span>
    </button>

    <Modal open={confirmModal} title="Play Mode">
        <form on:submit|preventDefault>
            <div class="field">
                <label for="gameMode">Choose The Game Mode</label>
                <select name="mode" id="gameMode" bind:value={selectedMode}>
                    {#each modes as mode, i (i)}
                        <option value={mode}>{mode}</option>
                    {/each}
                </select>
                <blockquote>
                    {#if selectedMode === "trivia"}
                        <strong>Trivia Trail: </strong>
                        Unleash your inner quizmaster! Solve word clues and uncover
                        trivia tidbits in this unique crossword twist.
                    {:else}
                        <strong>Classic Crossword: </strong>
                        Timeless wordplay awaits! Solve clues, fill the grid, and
                        embrace the traditional joy of crosswords.
                    {/if}
                </blockquote>
            </div>

            <div class="button-bar">
                <button title="Close" on:click={closeConfirmModal}>Close</button>
                <button title="Start" on:click={startGame}>Start</button>
            </div>
        </form>
    </Modal>




    {#if $gameOngoing}
        <GameBar on:close-game={endGame} on:reveal-word={revealWord}>

            {#if selectedMode === 'trivia'}

                <GermanMode data={{
                    size: data.size,
                    words: data.words
                }} userAnswers={userAnswers} on:add-answer={changeUserAnswers} />

            {:else if selectedMode === 'classic'}

                <CrosswordClassic data={{
                    size: data.size,
                    words: data.words
                }} userAnswers={userAnswers} on:add-answer={changeUserAnswers} />

            {/if}

        </GameBar>
    {/if}
{/if}

<style lang="scss">
    button.play {
        --_padding: 0;
        --_icon-size: 3.75rem;
        --_icon-clr: var(--clr-grey-800);
        --_icon-bg: var(--clr-grey-400);
        --_gap: 0.15rem;
        --_bg: var(--clr-grey-900);
        --_clr: var(--clr-grey-400);

        grid-column: content;
        border-radius: var(--radius);
        margin-inline-start: auto;
        overflow: hidden;
        font-size: var(--step-2);
        font-weight: 700;
        text-transform: uppercase;
        box-shadow: var(--shadow-elevation-low);
        outline-color: currentColor;
        outline-offset: 4px;
        transition: 300ms ease-out box-shadow;

        &:hover {
            --_bg: var(--clr-grey-400);
            --_clr: var(--clr-grey-900);
            --_icon-clr: var(--clr-grey-400);
            --_icon-bg: var(--clr-white);
            box-shadow: var(--shadow-elevation-medium);
        }

        svg {
            width: var(--_icon-size);
            background: var(--_icon-bg);
            color: var(--_icon-clr);
        }

        span {
            padding-inline: 1.5rem 2rem;
        }
    }

    form {
        display: grid;
        gap: 1.5rem;
    }

    blockquote {
        margin-top: 0.25rem;
        border-radius: calc(var(--radius) / 2);
        gap: 0.25rem;
    }

    .field {
        display: grid;
        gap: 0.5rem;
    }

    select {
        appearance: auto;
    }

    .button-bar {
        margin-top: 0.5rem;
        margin-inline-start: auto;

        button {
            --_padding: 0.5rem 1.5rem;
            // --_border: 2px solid currentColor;
            border-radius: var(--radius);
            outline-offset: -8px;
            text-transform: uppercase;
            font-size: var(--step-1);
            font-weight: 700;
            box-shadow: 0 0 4px -1px var(--clr-grey-400);

            &[title^="Close"] {
                --_bg: transparent;
                --_clr: var(--clr-grey-400);
            }

            &[title^="Start"] {
                --_bg: var(--clr-grey-400);
                --_clr: var(--clr-grey-800);
            }
        }
    }
</style>
