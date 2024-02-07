<script lang="ts">
    import type { CrossFull } from "../composables/engine";
    import { decodeString } from "../composables/text";
    import CustomSelect from "./utilities/CustomSelect.svelte";
    import Modal from "./utilities/Modal.svelte";

    /**
     * The User Data as an encoded string
     */
    export let enc = "";
    let data: CrossFull;
    let confirmModal = false;
    const modes = ['trivia', 'classic'] as const;
    type GameMode = typeof modes[number];
    let selectedMode: GameMode = 'trivia';

    $: {
        data = JSON.parse(decodeString(enc));
        console.log(data);
    }


</script>

{#if data.words.length > 1 && data.size > 1}
    <button class="play" on:click={() => confirmModal = true}>
        <svg viewBox="0 0 24 24"><use href="#play"></use></svg>
        <span>Play</span>
    </button>




        <Modal open={confirmModal} title="Play Mode">
        <form on:submit|preventDefault >
            <div class="field">
                <label for="gameMode">Choose The Game Mode</label>
                <select name="mode" id="gameMode" bind:value={selectedMode}>
                    {#each modes as mode, i (i)}
                        <option value={mode}>{mode}</option>
                    {/each}
                </select>
                <blockquote>
                    {#if selectedMode === 'trivia'}
                    <strong>Trivia Trail: </strong> 
                    Unleash your inner quizmaster! Solve word clues and uncover trivia tidbits in this unique crossword twist.
                    {:else}
                    <strong>Classic Crossword: </strong> 
                    Timeless wordplay awaits! Solve clues, fill the grid, and embrace the traditional joy of crosswords.
                    {/if}
                </blockquote>
            </div>


            <div class="button-bar">
                <button title="Close" on:click={()=>confirmModal=false}>Close</button>
                <button title="Start">Start</button>
            </div>
        </form>
    </Modal>
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
        border-radius:calc(var(--radius) / 2);
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



            &[title^=Close] {
                --_bg: transparent;
                --_clr: var(--clr-grey-400);
                // --_border: 2px solid currentColor;
            }
            
            
            &[title^=Start] {
                --_bg: var(--clr-grey-400);
                --_clr: var(--clr-grey-800);
                // --_border: 2px solid currentColor;
            }
        }
    }
</style>
