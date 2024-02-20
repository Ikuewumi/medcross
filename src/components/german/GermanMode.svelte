<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { type Cross, CrossWord, type Word } from "../../composables/engine";
    import {sleep} from "../../composables/utilities";
    import { currentWord } from "../../composables/store";
    export let data:Cross;
    export let userAnswers:Word[] = [];


    const evt = createEventDispatcher();



    const computeQuestions = (data: Cross, userAnswers: Word[]) => {
        const arr = data.words.filter(word_ => {
            const isAnswered = userAnswers.findIndex(w_ => {
                return (
                    w_.start[0] === word_.start[0] &&
                    w_.start[1] === word_.start[1] &&
                    w_.end[0] === word_.end[0] &&
                    w_.end[1] === word_.end[1]
                )
            })


            return (isAnswered === -1)
        });
        return arr
    }

    let currentIndex = 0;
    let computedQuestions:Word[] = computeQuestions(data, userAnswers);
    let progress = 0;
    let input = '';
    let pattern = '';
    let el:HTMLInputElement;

   

    $: { $currentWord = computedQuestions?.at(currentIndex)! }
    $: { progress = userAnswers ? (userAnswers.length / data.words.length) * 100 : 0 }
    $: {
        if ($currentWord) {
            pattern = CrossWord.generateWordPattern( {size: data.size, words: userAnswers}, $currentWord)?.toLowerCase();
            // emitCurrentWord()
        } 
    }


    $: {
        computedQuestions = computeQuestions(data, userAnswers)

        if (computedQuestions.length === 0) {
            evt('game-finished')
        }

        if (currentIndex > computedQuestions.length - 1) {
            currentIndex = 0
        }
    }



    const emitCurrentWord = () => {
        evt('change-current', computedQuestions?.at(currentIndex))
    }




    let checkWord = () => {
        if (!input.trim()) return
        if (input.toUpperCase() !== $currentWord.word.toUpperCase()) return


        evt('add-answer', [...userAnswers, $currentWord])

        input = ''
        sleep(0).then(() => el?.focus())


    }



    /**
     * Navigate through the crossword -  
     * @param dir {1|0} "1" is for forwards, or next, while "0" is previous
     */
    let navigate = (dir: 1|0 = 1) => {
        if (![0, 1].includes(dir)) throw Error('the direction is invalid');
        let curr = currentIndex
        switch (dir) {
            case 0:
                if (curr-1 < 0) curr = computedQuestions.length-1
                else curr -= 1
                break;
            case 1:
                if (curr+1 > computedQuestions.length-1) curr = 0
                else curr += 1
                break;
        }

        input = ''
        sleep(0).then(() => el?.focus())

        currentIndex = curr

    }


</script>

<section>
    <label for="german-progress" class="sr-only">The Progress of the Crossword</label>
    <progress aria-busy={progress > 0 && progress < 100} id="german-progress" value={progress} max="100"></progress>
    {#if $currentWord?.word}
        <form on:submit|preventDefault>
            <span title="Letter count of the word">{$currentWord.word.length - input.length}</span>
            <div class="field">
                <label for="trivia-word">{$currentWord.meaning}</label>
                <input 
                    id="trivia-word"
                    bind:this={el}
                    bind:value={input}
                    on:input={checkWord}
                    type="text"
                    placeholder={pattern}
                    maxlength={$currentWord.word.length}
                    data-success={input.toLowerCase() === $currentWord.word.toLowerCase()}
                    disabled={input.toLowerCase() === $currentWord.word.toLowerCase()}
                    data-error={input.length > 0 && input.length !== $currentWord.word.length}
                />
            </div>
        </form>

        <div class="button-bar">
            <button on:click={navigate.bind(null, 0)} title="Previous">Prev</button>
            <button on:click={navigate.bind(null, 1)} title="Next">Next</button>
        </div>
    {/if}


    <button title="Help" on:click={_=> evt('request-help')}>
        <svg viewBox="0 0 24 24"><use href="#help"></use></svg>
        <span class="sr-only">Help</span>
    </button>
</section>

<style lang="scss">
    section {
        --bg: var(--clr-grey-900);
        --progress-height: 15px;
        grid-column: content;
        display: grid;
        gap: 1rem;
        width: min(100%, 30rem);
        margin-inline: auto;
        margin-block-start: 1rem;


        & > * {
            background: var(--bg);
            border-radius: var(--radius);
            box-shadow: var(--shadow-elevation-low);
        }
    }




    progress[value] {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: transparent;
        width: 100%;
        height: var(--progress-height);
        border: none;
        box-shadow: none;


        &::-webkit-progress-bar, &::-webkit-progress-value {
            border-radius: var(--radius);
        }

        &::-webkit-progress-bar {
            background: var(--bg);
        }

        &::-webkit-progress-value {
            background: var(--clr-grey-400);
        }
    }


    form {
        display: grid;
        gap: 1.25rem;
        position: relative;
        padding-block: 1.5rem 2.5rem;
        padding-inline: 1.5rem;
        font-size: var(--step-1);
        
        & > span {
            --_clr: var(--clr-grey-700);
            --_border: 1px solid var(--_clr);

            background: var(--clr-grey-900);
            cursor: pointer;
            position: absolute;
            inset: 5px 5px auto auto;
            padding: 0.35rem 0.5rem;
            border: var(--_border);
            border-radius: var(--radius);
            font-weight: 600;  
            line-height: 0.9;
            box-shadow: var(--shadow-elevation-low);
        }
    
    
    
        .field {
            display: contents;
        }

        label {
            line-height: 1.3;
        }

        input {
            border-radius: var(--radius);
            letter-spacing: 2.5px;
            font-weight: 700;

            &[data-error=true],
            &[data-error=true]:focus, 
            &[data-error=true]:hover {
                outline-color: hsl(0, 87%, 50%); 
            }


            &[data-success=true], 
            &[data-success=true]:focus, 
            &[data-success=true]:hover {
                outline-color: hsl(137, 87%, 50%)!important; 
            }
            
            

        }
    }




    .button-bar {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        background: transparent;
        box-shadow: none;
        font-size: var(--step-2);
        font-weight: 600;
        
        button {
            padding: 0.5rem 2rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow-elevation-low);
        }

        button[title^=Next] {
            margin-inline-start: auto;
        }
    }


    button[title="Help"] {
        --icon-size: 50px;
        --padding: 0rem;
        --bg: transparent;
        position: fixed;
        inset: auto 2vh 4vh auto;
        box-shadow: none;


        svg {
            width: var(--icon-size);
            aspect-ratio: 1;
        
            
        }

    }




</style>
