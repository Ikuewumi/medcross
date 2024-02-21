<script lang="ts">
    import { CrossWord as C, type Cross, type Coordinate, type Direction as Dir, type Word } from "../../composables/engine";
    import CrossCell from "../utilities/CrossCell.svelte";
    import DirectionButton from "../utilities/DirectionButton.svelte";
    import { createEventDispatcher } from "svelte";
    import {currentWord} from "../../composables/store"
    import { sleep } from "../../composables/utilities";
    import Keyboard from "./Keyboard.svelte";

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
    export let userAnswers: Word[] = [];

    const evt = createEventDispatcher()

    let userMatrix = C.generateMatrixFromWords(userAnswers, data.size);
    let direction: Dir = 0;
  
    const getCurrentWord = (coordinates:Coordinate, data:Cross):Word => {
        
        let currentWord: Word;
        
        const words = C.getWordsInCoordinates(
            C.generateMatrixFromWords(data.words, data.size),
            coordinates
            ).map(word => {
            const meaning = data.words.find(word_ => 
                word_.word === word.word &&
                C.calcIndexFromCoordinates(word_.start, data.size) === C.calcIndexFromCoordinates(word.start, data.size)
            )!.meaning ?? ''
            return { ...word, meaning }
        })


        if (words.length === 0) {
            currentWord = data.words[0]
        }
        else if (words.length === 1) { 
            direction = C.getDirection(words[0])
            currentWord = words[0]; 
        } 
        else if (words.length === 2) {
            currentWord = words.find(word => C.getDirection(word) === direction)!
        }


        const meaning = data.words.find(word_ => word_.word === currentWord.word)!.meaning ?? ''


        return {
            ...currentWord!, 
            meaning
        }

    }

    let keyboardOpen = false;
    let enabledPaths: Coordinate[] = [];
    let coords: Coordinate = enabledPaths[0] ?? [data.words[0].start];
    $currentWord = getCurrentWord(coords, data);
    let progress = 0;
    $: selectedCoordinates = C.getAllCoordinatesForWord($currentWord).map(e => C.calcIndexFromCoordinates(e, data.size));

    $: { progress = Math.floor((userAnswers.length / data.words.length) * 100) }
    $: { if (coords || direction) { $currentWord = getCurrentWord(coords, data)} }
    $: { enabledPaths = C.getEnabledCoordinates(data, userAnswers) }

    $: {
        if (userMatrix) {
            const userAnswers_ = C.generateWordsFromMatrix(userMatrix)?.filter(word => {
                const wordinCross = data.words.find(w_ =>w_.word === word.word)
                if (!wordinCross) return false;
                const sameCoordinates = 
                    C.calcIndexFromCoordinates(word.start, data.size) === C.calcIndexFromCoordinates(wordinCross.start, data.size);

                return sameCoordinates
            })




            evt('add-answer', userAnswers_)


            if (userAnswers_.length === data.words.length) {
                sleep(0).then(() => {
                    keyboardOpen = false;
                    evt('game-finished');

                })
            }
        }
    }




    const coordinateIsDisabled = (i: number, enabledPaths: Coordinate[]):boolean => {
        const paths = enabledPaths.map(e => C.calcIndexFromCoordinates(e, data.size));
        return !paths.includes(i)
    }




    
    const clickCell = (coord_: Coordinate) => {
        coords = coord_
    }

    const toggleDirection = () => {
        direction = direction ? 0 : 1;
    };


    const enterKey =(key:string) => {
        if (!coords) return;
        const coordsAllowed = 
            enabledPaths.map(e => C.calcIndexFromCoordinates(e, data.size))
                .includes(C.calcIndexFromCoordinates(coords, data.size))

        if (!coordsAllowed) return;


        userMatrix[coords[0]][coords[1]] = key.toUpperCase().trim().slice(0, 1);
        // Trick to make Svelte rerender the matrix component
        userMatrix = userMatrix;


        // Move the pointer to the next cell based off direction
        const newCoords = C.calculateEndFromStart(
            coords,
            "sa",
            direction,
        );
        const newCoordsValid = C.validateCoordinates(newCoords, data.size);

        const newCoordsAllowed = 
            enabledPaths.map(e => C.calcIndexFromCoordinates(e, data.size))
                .includes(C.calcIndexFromCoordinates(newCoords, data.size))

        if (newCoords && newCoordsAllowed && newCoordsValid) {
            coords = newCoords
        }

    }

    const handleDblClick = (e: MouseEvent) => {
        const el = e.target! as HTMLButtonElement;

        if (el.tagName !== "BUTTON") return;
        if (!("coordinates" in el.dataset)) return;

        const words = C.getWordsInCoordinates(C.generateMatrixFromWords(data.words, data.size), coords)
        if (words.length > 1) toggleDirection();
    };

    const handleClick = (e: MouseEvent) => {
        const el = e.target! as HTMLButtonElement;

        if (el.tagName !== "BUTTON") return;
        if (!("coordinates" in el.dataset)) return;

        const coords_ = el.dataset["coordinates"]!
            .split(",")
            .map((x) => +x)! as Coordinate;

        clickCell(coords_);
    };

    const handleInput = (e:KeyboardEvent) => {
        const isOneLetter = e.key.length === 1;
        const isCtrl = e.ctrlKey
        const isRepeated = e.repeat;
        const isArrowKey = ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Backspace"].includes(e.key);

        if (isRepeated) return

        if (isOneLetter && !isCtrl) {
            enterKey(e.key)
        }
    }


    


</script>




<section id="C-page">
    {#if data.words.length && $currentWord}
        <figure class="figure" class:keyboard-open={keyboardOpen}>
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                on:dblclick={handleDblClick} on:click={handleClick} on:keydown={handleInput}
                id="cross-classic"
                style="--size:{data.size}"
            >
                {#each userMatrix.flat() as cell, i (i)}
                    <CrossCell
                        isEmpty={cell === ""}
                        disabled={coordinateIsDisabled(i, enabledPaths)}
                        isFocused={C.calcIndexFromCoordinates(coords, data.size) === i}
                        coordinates={C.calcCoordinates(i, data.size)}
                        selected={selectedCoordinates.includes(i)}
                    >
                    {cell}
                    </CrossCell>
                {/each}
            </div>
        </figure>



        <div class="keyboard-wrapper" class:keyboard-open={keyboardOpen}>

        

        <article class="clue" style="--percent: {progress}%" >
            <p>{$currentWord.meaning}</p>
        </article>

         <Keyboard open={keyboardOpen} on:enter-key={(e)=> enterKey(e.detail)} on:delete-letter={_ => evt('request-help')} on:close-keyboard={_ => (keyboardOpen=false)} />

        </div>
    {/if}


    <button id="keyboard-open" title="Open Keyboard" class:keyboard-open={keyboardOpen} on:click={_ => (keyboardOpen=true)}>
        <svg viewBox="0 0 24 24">
            <use href="#keyboard-outline"></use>
        </svg>
    </button>


  
</section>


<style lang="scss">
    #C-page {
        display: grid;
        gap: 1rem;
        grid-column: full;

        @media (min-width: 768px) {
            grid-column: content;
        }
        
        & > * {
            background: var(--clr-white);
            border-radius: var(--radius);
            box-shadow: var(--shadow-elevation-low);
        }
    }


    #keyboard-open {
        --icon-size: 40px;
        --padding: 0.2rem 0.75rem;
        position: fixed;
        inset: auto 0 10vh auto;
        border: 0.5px solid hsl(var(--shadow-color) / 0.2);
        border-radius: 0;
        border-top-left-radius: var(--radius);
        border-bottom-left-radius: var(--radius);

        transition: 100ms ease-in;
        z-index: 6;

        &:hover {
            background: var(--clr-grey-400);
            color: var(--clr-grey-900);
            box-shadow: var(--shadow-elevation-medium);
        }

        svg {
            width: var(--icon-size);
            aspect-ratio: 1;
        }


        &.keyboard-open {
            z-index: 4;
            display: none;
        }
    }


    #C-page >.keyboard-wrapper {
        display: grid;
        width: min(100% - 3rem, 50rem);
        margin-inline: auto;
        gap: 0;
        --keyboard-width: 100%;
        position: fixed;
        inset: auto 0 0 0;
        background: transparent;

        &.keyboard-open {
            width: 100%;


            @media (min-width: 768px) {
                width: min(100% - 3rem, 50rem)
            }
            z-index: 7;
            & > article.clue {
                margin-bottom: -0.25rem;
            }
        }
    }


    
    
    figure.figure {
        padding: 2rem 4rem;
        width: inherit;
        overflow-x: auto;
        overscroll-behavior-inline: contain;
        margin-bottom: 70px;

        &.keyboard-open {
            margin-bottom: 250px;
        }

    }





    article.clue {
        --percent: 20%;
        position: relative;
        overflow-x: hidden;
        margin-inline: auto;
        padding: 0.75rem 0.25rem;
        border-radius: var(--radius);
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border: 2px solid rgba(16, 194, 16, 0.788);
        background: var(--clr-white);
        width: min(100%, 100vw - 3rem);
        font-size: var(--step-1);
        text-align: center;
        isolation: isolate;


        @media (min-width: 768px) {
            padding: 1.5rem 1rem;
        }



        &:before {
            content: '';
            background: rgba(0, 128, 0, 0.233);
            position: absolute;
            inset: 0;
            z-index: -1;
            transform: scaleX(var(--percent));
            transform-origin: top left;
            transition: 400ms ease-out transform;

        }



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
