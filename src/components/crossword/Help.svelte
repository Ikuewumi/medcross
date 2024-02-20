<script lang="ts">
    import Modal from "../utilities/Modal.svelte";
    import crossword from "../../images/help/classic-closed-map.jpg"; 
    import trivia from "../../images/help/trivia-map.jpg"
    import { createEventDispatcher } from "svelte";
    export let open = false;
    export let mode= "classic" as "classic" | "trivia";


    const evt = createEventDispatcher();


    const done = () => {
        evt('close-help')
    }
</script>

<div role="presentation">
    <Modal open={open} title="" on:click-out={done}>
        <button title="Close" on:click={done}>
            <span>Close</span>
        </button>



        <section>            
            <figure>
                {#if mode === "classic"}
                    <img src={crossword.src} alt="Classic Crossword" />
                {:else}
                    <img src={trivia.src} alt="Trivia" />
                {/if}
            </figure>

        </section>  


        <section class="mt">
            <h3>Objective</h3>
            <p>Complete the crossword by filling the blanks with the words most appropriate from the <em>clue</em> given</p>
        </section>



        <section>
            <h3>Navigation</h3>
            {#if (mode === "classic")} 
            <ul>
            

                <li>Click on a cell to select it</li>
                <li>The selected cell will be outlined</li>
                <li>The selected word will also be highlighted</li>
                <li>If a cell is contained in two words, you can <em>double click</em> to toggle between them</li>
                <li>If you are on a computer, you can start typing with your keyboard, or use the custom keyboard</li>
                <li>If your device does not have a physical keyboard, you have to use the <em>custom keyboard<em></li>
                <li>Open the custom keyboard by clicking on the <em>Open Keyboard</em> button</li>
                </ul>

            {:else}

                <ul>
                <li>Clicking the buttons goes to the <em>previous</em> and <em>next</em> questions respectively</li>
                <li>The <em>pattern of word</em> gives the user some clue to the answer, depending on the current shape of the crossword</li>
                <li>The <em>letter count</em> tells the number of letters left in the answer based on the user's current input</li>
                    </ul>
            
            {/if} 
        </section>

        <section>
            <h3>General</h3>
            <ul>

                <li>Click on the <em>End Game</em> button to leave the game</li>
                <li>Your progress is <em>stored</em> on your device, so you can <em>resume</em> in the future</li>
                <li>Have Fun!</li>
            </ul> 


        </section>


        {#if mode === "classic"}
        <section>
            <h3>Input</h3>
            <ul>    
                <li>After selecting a cell, you can use a keyboard to start filling the grid!</li>
                <li>There is no delete button, you can click on an editable cell and just override it's contents</li>
                <li>If a word is completed, the cells containing letters of that word get disabled</li>
            </ul>
        </section>


        <section>
            <h3>Custom Keyboard</h3>
            <ul>
                <li>While the custom keyboard is opened, close it with the <em>arrow-down ⬇</em> button</li>
            </ul>
        </section>
        {/if}


    </Modal>
</div>

<style lang="scss">
    div[role="presentation"] {
        --width: min(50rem, 100%);
        --font-size: var(--step-4);
        --filter: blur(3px);
        --z-index: 8;
        display: contents;

        h1,
        h2,
        h3 {
            & + * {
                margin-top: 0.25rem;
            }
        }

        ul {
            list-style: none;
            display: grid;
            gap: 0.5rem;
            padding-inline: 0.15rem;


            li {
                --marker-width: 15px; 
                line-height: 1.3;

                
                
                &:before {
                    content: '🏐';
                    flex: 0 0 var(--marker-width);
                    align-self: start;
                    margin-top: 0.15rem;
                    margin-right: 0.15rem;
                    font-size: var(--marker-width);
                }
            }
        }

        h3 {
            letter-spacing: -0.5px;
        }



        ul, p, strong {
            font-size: var(--step-1);
        }

        strong, em {
            font-weight: 700;
        }

        section {
            display: grid;
            gap: 0.5rem;

            h3 {
                font-size: var(--step-3);
                
            }
        }

        img {
            box-shadow: var(--shadow, var(--shadow-elevation-low));
        }

        section.mt {
            margin-top: 0.75rem;
        }

      
        button[title=Close] {
           --icon-size: 30px;
            --padding: 0.15rem 0.75rem;
            display: flex;
            gap:0.15rem;

            position: fixed;
            inset: 0 0 auto auto; 
            margin-inline-start: auto;
            border: 1px solid hsl(var(--shadow-color) / 0.2);
            
            span {
                font-size: var(--step-3);
                font-weight: 600;
                letter-spacing: -0.75px;
            }


            svg {
                width: var(--icon-size);
                aspect-ratio: 1;
            }
        }
    }
</style>
