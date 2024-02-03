<script lang="ts">
    import {
        CrossWord,
        type Coordinate,
        type Word,
        type Direction as Dir,
    } from "../../composables/engine";
    import CrossCell from "../utilities/CrossCell.svelte";
    import Modal from "../utilities/Modal.svelte";
    import DirectionButton from "../utilities/DirectionButton.svelte";
    import { enterMsg } from "../../composables/toast";

    let infoOpen = true;
    let cluesOpen = false;
    let direction: Dir = 0;
    let coords: Coordinate;

    let size = 3;
    let matrix = CrossWord.getArray(size);
    let words: Word[];

    $: {
        try {
            words = CrossWord.generateWordsFromMatrix(matrix)
        } catch(e) {
            words = words
        }
    }

    const openInfoModal = () => { infoOpen = true; };
    const handleInfo = () => { infoOpen = false; };
    const changeSize = () => { matrix = CrossWord.getArray(size); };
    const clickCell = (coord: Coordinate) => { coords = coord;  };
    const openCluesModal = () => { cluesOpen = true }
    const closeCluesModal = () => {cluesOpen = false}


    const handleClues = (e:SubmitEvent) => {
        if (!words?.length) return;
        const form = e.target! as HTMLFormElement
        const words_ = words.map((word, i)=> {
            const input = form.querySelector(`input#clue-${i}-${word.word}`) as HTMLInputElement
            return {
                ...word,
                meaning: input.value.trim()
            }
        })


        // console.log(words_)

        words = words_

        if ('clipboard' in navigator) {
            navigator.clipboard.writeText(JSON.stringify({size, words}))
                .then(_ => {
                    enterMsg('Copied to Clipboard', 'success')
                })
        }

    }


    const enterWord = (key: string) => {
        if (!coords) return;
        matrix[coords[0]][coords[1]] = key.toUpperCase().trim().slice(0, 1);
        // Trick to make Svelte rerender the matrix component
        matrix = matrix;

        // Move the pointer to the next word based off direction
        const newCoords = CrossWord.calculateEndFromStart(
            coords,
            "sa",
            direction,
        );
        const newCoordsValid = CrossWord.validateCoordinates(newCoords, size);

        if (newCoordsValid) {
            coords = newCoords;
        }
    };

    const toggleDirection = () => {
        direction = direction ? 0 : 1;
    };

    const handleInput = (e: KeyboardEvent) => {
        const isOneLetter = e.key.length === 1;
        const isArrowKey = [
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight",
            "Backspace",
        ].includes(e.key);
        const isCtrl = e.ctrlKey;
        const isRepeated = e.repeat;

        if (isRepeated) return;

        if (!isOneLetter && !isArrowKey) return;

        // When You Enter just a word
        if (isOneLetter && !isCtrl) {
            enterWord(e.key);
        }

        // Using the arrow keys ⬆ to navigate
        if (isArrowKey && !isCtrl) {
            switch (e.key) {
                case "ArrowDown":
                    const cdown = CrossWord.calculateEndFromStart(
                        coords,
                        "sa",
                        1,
                    );
                    if (CrossWord.validateCoordinates(cdown, size))
                        coords = cdown;
                    break;
                case "ArrowRight":
                    const cright = CrossWord.calculateEndFromStart(
                        coords,
                        "sa",
                        0,
                    );
                    if (CrossWord.validateCoordinates(cright, size))
                        coords = cright;
                    break;
                case "ArrowLeft":
                    const cleft = CrossWord.calculateStartFromEnd(
                        coords,
                        "sa",
                        0,
                    );
                    if (CrossWord.validateCoordinates(cleft, size))
                        coords = cleft;
                    break;
                case "ArrowUp":
                    const cup = CrossWord.calculateStartFromEnd(
                        coords,
                        "sa",
                        1,
                    );
                    if (CrossWord.validateCoordinates(cup, size)) coords = cup;
                    break;
                case "Backspace":
                    enterWord(" ");
                    break;
                default:
                    break;
            }
        }

        // Using the ctrl modifier with the arrow keys ⬆ to change the writing mode!
        if (isArrowKey && isCtrl) {
            switch (e.key) {
                case "ArrowDown":
                case "ArrowUp":
                    direction = 1;
                    break;
                case "ArrowLeft":
                case "ArrowRight":
                    direction = 0;
                    break;
                default:
                    break;
            }
        }
    };

    const handleClick = (e: MouseEvent) => {
        const el = e.target! as HTMLButtonElement;

        if (el.tagName !== "BUTTON") return;
        if (!("coordinates" in el.dataset)) return;

        const coords_ = el.dataset["coordinates"]
            .split(",")
            .map((x) => +x)! as Coordinate;

        clickCell(coords_);
    };

    const handleDblClick = (e: MouseEvent) => {
        const el = e.target! as HTMLButtonElement;

        if (el.tagName !== "BUTTON") return;
        if (!("coordinates" in el.dataset)) return;

        toggleDirection();
    };


</script>

<section>

    <figure class="figure">
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            on:keydown={handleInput}
            on:click={handleClick}
            on:dblclick={handleDblClick}
            id="cross-builder"
            style="--size:{size}"
        >
            {#each matrix.flat() as cell, i (i)}
                <CrossCell
                    isEmpty={cell <= ""}
                    isFocused={CrossWord.calcCoordinates(i, size)[0] === coords?.at(0) &&
                        CrossWord.calcCoordinates(i, size)[1] === coords?.at(1)}
                    coordinates={CrossWord.calcCoordinates(i, size)}
                >
                    {cell}
                </CrossCell>
            {/each}
        </div>
    </figure>

    <div class="button-bar">
        <button title="Edit Size" on:click={openInfoModal}>
            <svg viewBox="0 0 24 24">
                <use href="#edit"></use>
            </svg>
            <span class="sr-only">Edit Size</span>
        </button>
        <button title="Copy JSON for Crossword" on:click={openCluesModal}>
            <svg viewBox="0 0 24 24">
                <use href="#copy"></use>
            </svg>
            <span class="sr-only">Copy Crossword</span>
        </button>
    </div>
</section>

<Modal title="Edit Size" open={infoOpen}>
    <form id="info" on:submit|preventDefault={handleInfo}>
        <div class="field">
            <label for="size">Size</label>
            <input
                on:change={changeSize}
                bind:value={size}
                id="size"
                type="number"
                inputmode="numeric"
                min="3"
                max="20"
            />
        </div>

        <button type="submit">Enter</button>
    </form>
</Modal>


<Modal title="Enter Clues" open={cluesOpen}>
    <form id="clues" on:submit|preventDefault={handleClues}>
        {#each words as word, i (i)}
            <div class="field" data-word={word.word} data-word-index={i}>
                <label for="clue-{i}-{word.word}">Clue for "{word.word}"</label>
                <input type="text"
                    id="clue-{i}-{word.word}"
                    placeholder="A succint clue for '{word.word}'" 
                    value="{word?.meaning || ''}" required
                >
            </div>
        {/each}

        <div class="button-bar">
            <button title="Close" type="button" on:click={closeCluesModal}>Close</button>
            <button title="Copy Code" type="submit">Copy Code</button>
        </div>
    </form>
</Modal>


<DirectionButton dir={direction} on:click={toggleDirection} />

<style lang="scss">
    form#info button {
        --_bg: var(--clr-grey-400);
        --_clr: var(--clr-grey-900);
        --_padding: 0.5rem 1.75rem;
        border-radius: 0.25rem;
        font-size: var(--step-1);
        justify-self: end;
    }

    form#clues {
        --_gap: 1.25rem;
        
        .field {
            flex-direction: column;
            align-items: start;
        }

        input { width: 100%; }

        .button-bar {
            margin-block-start: 0.5rem; 
            margin-inline-start: auto; 
        }

        button {
            border-radius: var(--radius);
            outline-offset: -4px;
        }


        button[title^=Close] {
            --_border: 2px solid var(--clr-grey-500);
            --_bg: transparent;
            --_clr: var(--clr-grey-400);
        }

        button[title^=Copy] {
            --_border: 2px solid var(--clr-grey-400);
            --_bg: var(--clr-grey-400);
            --_clr: var(--clr-grey-900);
        }

    }

    section {
        grid-column: full;
        background: var(--clr-white);
        margin-top: 1rem;
        width: inherit;
        position: relative;
        border-radius: var(--radius);
        overflow-x: hidden;

        @media (min-width: 768px) {
            grid-column: content;
        }

        .button-bar {
        --_gap: 0.5rem;
        border: none;
        position: absolute;
            inset: 0 2px auto auto;
        }


        button[title^="Edit"],
    button[title^="Copy"] {
        --_gap: 0.3rem;
        --_bg: var(--clr-white);
        --_clr: var(--clr-grey-600);
        --_icon-size: 25px;
        --_padding: 0.4rem;
        --_border: 2px solid var(--_clr);
        border: none;
        border-left: var(--_border);
        border-right: var(--_border);
        border-bottom: var(--_border);
        border-bottom-left-radius: var(--radius);
        border-bottom-right-radius: var(--radius);

        transition: 100ms color ease-out;

        &:hover,
        &:focus {
            --_clr: var(--clr-grey-400);
            outline-color: transparent;
        }
        svg {
            width: var(--_icon-size);
            aspect-ratio: 1;
        }
    }
    }

    figure.figure {
        padding: 2rem 4rem;
        width: inherit;
        overflow-x: auto;
        overscroll-behavior-inline: contain;
    }





    #cross-builder {
        --size: 3;
        --width: 40px;

        display: grid;
        grid-template-columns: repeat(var(--size), var(--width));
        grid-template-rows: repeat(var(--size), var(--width));
        gap: 2px;

        width: fit-content;
        margin-inline: auto;
        background: var(--clr-grey-700);
    }
</style>
