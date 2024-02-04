<script lang="ts">
    import { CrossWord as C, type Cross, type Coordinate, type Direction as Dir, type Word } from "../../composables/engine";
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

    let userMatrix = C.getArray(data.size);
    let direction: Dir = 0;
    let userAnswers: Word[];
    
    const getCurrentWord = (coordinates:Coordinate, data:Cross):Word => {

        let currentWord: Word;

        const words = C.getWordsInCoordinates(
            C.generateMatrixFromWords(data.words, data.size),
            coordinates
        ).map(word => {
            const meaning = data.words.find(word_ => 
                word_.word === word.word &&
                C.calcIndexFromCoordinates(word_.start, data.size) === C.calcIndexFromCoordinates(word.start, data.size)
            ).meaning ?? ''
            return { ...word, meaning }
        })


        if (!words.length) {throw Error('cannot click on an invalid cordinate')}

        
        else if (words.length === 1) { 
            direction = C.getDirection(words[0])
            currentWord = words[0]; 
        } 
        else if (words.length === 2) {
            currentWord = words.find(word => C.getDirection(word) === direction)
        }


        const meaning = data.words.find(word_ => word_.word === currentWord.word).meaning ?? ''


        return {
            ...currentWord, 
            meaning
        }

    }
    
    $: userAnswers = C.generateWordsFromMatrix(userMatrix)?.filter(word => {
        const wordinCross = data.words.find(w_ =>w_.word === word.word)
        if (!wordinCross) return false;
        const sameCoordinates = 
            C.calcIndexFromCoordinates(word.start, data.size) === C.calcIndexFromCoordinates(wordinCross.start, data.size);

        return sameCoordinates
    })

    
    let enabledPaths = C.getEnabledCoordinates(data, userAnswers);
    let coords: Coordinate = enabledPaths[0];
    let currentWord = getCurrentWord(coords, data);
    $: selectedCoordinates = C.getAllCoordinatesForWord(currentWord).map(e => C.calcIndexFromCoordinates(e, data.size));
    let progress = 0
    $: {
        progress = Math.floor((userAnswers.length / data.words.length) * 100)
    }

    $: {
        if (coords || direction) { currentWord = getCurrentWord(coords, data)}
    }

    $: {
        enabledPaths = C.getEnabledCoordinates(data, userAnswers)
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

        if (newCoords && newCoordsAllowed) {
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

        const coords_ = el.dataset["coordinates"]
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
    {#if data.words.length && currentWord}
        <figure class="figure">
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



        <article class="clue" style="--percent: {progress}%">
            <p>{currentWord.meaning}</p>
        </article>
    {/if}



    <DirectionButton dir={direction} />
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


    
    
    figure.figure {
        padding: 2rem 4rem;
        width: inherit;
        overflow-x: auto;
        overscroll-behavior-inline: contain;
    }


    figure.figure+article.clue {
        --percent: 20%;
        position: relative;
        padding: 1.5rem 1rem;
        border: 2px solid rgba(16, 194, 16, 0.788);
        // border: 2px solid var(--clr-grey-400);
        overflow-x: hidden;
        font-size: var(--step-1);
        text-align: center;
        isolation: isolate;


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