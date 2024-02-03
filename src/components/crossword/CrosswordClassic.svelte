<script lang="ts">
    import { CrossWord, type Cross, type Coordinate, type Direction as Dir, type Word } from "../../composables/engine";
    import CrossCell from "../utilities/CrossCell.svelte";
    import DirectionButton from "../utilities/DirectionButton.svelte";

    export let data:Cross = {
        size: 9,
        words: [
            { "word": "URETER", "start": [3, 0], "end": [3, 5], "meaning": "a tube that carries urine from the kidneys to the bladder" },
            { "word": "PATELLA", "start": [0, 2], "end": [6, 2], "meaning": "knee bone" },
            { "word": "FEMUR", "start": [0, 7], "end": [4, 7], "meaning": "longest bone of the body" },
            { "word": "DELTOID", "start": [5, 0], "end": [5, 6], "meaning": "the muscle of the shoulder region" },
            { "word": "CLAVICLE", "start": [1, 0], "end": [1, 7], "meaning": "collar bone" },
            { "word": "URETHRA", "start": [8, 0], "end": [8, 6], "meaning": "a tube that carries urine from the bladder outside the body" },
            { "word": "DURA", "start": [5, 6], "end": [8, 6], "meaning": "outermost layer of the spinal meninges" }
        ]
    }

    let matrix = CrossWord.generateMatrixFromWords(data.words, data.size);
    let direction: Dir = 0;
    let currentWord:Word;
    let coords: Coordinate;
    let userAnswers: Word[];

    const toggleDirection = () => { direction = direction ? 0 : 1; } 
    const handleDblClick = (e: MouseEvent) => {
        const el = e.target! as HTMLButtonElement;

        if (el.tagName !== "BUTTON") return;
        if (!("coordinates" in el.dataset)) return;

        toggleDirection();
    };
    const handleClick = (e: MouseEvent) => {
        const el = e.target! as HTMLButtonElement;

        if (el.tagName !== "BUTTON") return;
        if (!("coordinates" in el.dataset)) return;

        const coords_ = el.dataset["coordinates"]
            .split(",")
            .map((x) => +x)! as Coordinate;

        // clickCell(coords_);
    };


</script>




<section id="crossword-page">
    {#if data.words.length}
        <figure class="figure">
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                on:dblclick={handleDblClick}
                id="cross-classic"
                style="--size:{data.size}"
            >
                {#each matrix.flat() as cell, i (i)}
                    <CrossCell
                        isEmpty={cell === ""}
                        disabled={cell === ""}
                        isFocused={
                            CrossWord.calcCoordinates(i, data.size)[0] === coords?.at(0) &&
                            CrossWord.calcCoordinates(i, data.size)[1] === coords?.at(1)
                        }
                        coordinates={CrossWord.calcCoordinates(i, data.size)}
                    >
                    </CrossCell>
                {/each}
            </div>
        </figure>


        <article class="clue">
            <p>a tube that carries urine from the kidneys to the bladder</p>
        </article>
    {/if}



    <DirectionButton dir={direction} on:click={toggleDirection} />
</section>


<style lang="scss">
    #crossword-page {
        display: grid;
        gap: 1rem;
        grid-column: full;
        margin-top: 1rem;

        @media (min-width: 768px) {
            grid-column: content;
        }
        
        & > * {
            background: var(--clr-white);
            border-radius: var(--radius);
            box-shadow: var(--shadow-elevation-low);
        }
    }


    
    
    figure.figure {
        padding: 2rem 4rem;
        width: inherit;
        overflow-x: auto;
        overscroll-behavior-inline: contain;
    }


    figure.figure+article.clue {
        font-size: var(--step-1);
        padding: 1.5rem 1rem;
        text-align: center;

    }





    #cross-classic {
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