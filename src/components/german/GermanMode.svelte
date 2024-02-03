<script lang="ts">
    import { type Cross, CrossWord, type Word } from "../../composables/engine";
    import {sleep} from "../../composables/utilities";
    export let data:Cross;

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
        }).sort(_ => Math.random() - 0.5);
        return arr
    }

    let currentIndex = 0;
    let currentWord:Word;
    let userAnswers:Word[] = [];
    let computedQuestions:Word[] = computeQuestions(data, userAnswers);
    let progress = 0;
    let input = '';
    let pattern = '';
    let el:HTMLInputElement;

   

    $: { currentWord = computedQuestions?.at(currentIndex) }
    $: { progress = userAnswers ? (userAnswers.length / data.words.length) * 100 : 0 }
    $: {
        if (currentWord) {
            pattern = CrossWord.generateWordPattern( {size: data.size, words: userAnswers}, currentWord)?.toLowerCase()
        } 
    }


    $: {
        computedQuestions = computeQuestions(data, userAnswers)
        if (currentIndex > computedQuestions.length - 1) {
            currentIndex = 0
        }
    }




    let checkWord = () => {
        if (!input.trim()) return
        if (input.toUpperCase() !== currentWord.word.toUpperCase()) return


        userAnswers = [...userAnswers, currentWord]

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
    {#if currentWord?.word}
        <form on:submit|preventDefault>
            <span title="Letter count of the word">{currentWord.word.length}</span>
            <div class="field">
                <label for="word">{currentWord.meaning}</label>
                <input 
                    bind:this={el}
                    bind:value={input}
                    on:input={checkWord}
                    type="text"
                    placeholder={pattern}
                    maxlength={currentWord.word.length}
                    data-success={input.toLowerCase() === currentWord.word.toLowerCase()}
                    disabled={input.toLowerCase() === currentWord.word.toLowerCase()}
                    data-error={input.length > 0 && input.length !== currentWord.word.length}
                />
            </div>
        </form>

        <div class="button-bar">
            <button on:click={navigate.bind(this, 0)} title="Previous">Prev</button>
            <button on:click={navigate.bind(this, 1)} title="Next">Next</button>
        </div>
    {:else if computedQuestions.length === 0 && userAnswers.length > 0}
        <article class="done">
            <svg viewBox="0 0 24 24"><use href="#check-filled"></use></svg>
            <h2>COMPLETED!</h2>
            <p>Done in <time>03:49</time></p>
        </article>

        <button>Continue</button>
    {/if}
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
            letter-spacing: 1px;

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



    article.done {
        --icon-size: 50px;
        display: flex;
        gap: 1rem;
        flex-direction: column;
        place-items: center;
        padding-block: 2rem 2.5rem;
        padding-inline: 0.5rem;

        svg {
            width: var(--icon-size);
            aspect-ratio: 1;
        }
    }

    article.done + button {
        display: flex;
        justify-content: center;
        background: var(--clr-grey-400);
        color: var(--clr-grey-900);
        width: 100%;
        padding: 1rem 0.75rem;
        outline-offset: -6px;
        font-size: var(--step-2);
        text-align: center;
        box-shadow: var(--shadow-elevation-medium);
    }
</style>