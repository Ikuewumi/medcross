<script lang="ts">

</script>



<div id="keyboard-widget" aria-hidden="true">
    <div class="row">
        <button>Q</button>
        <button>W</button>
        <button>E</button>
        <button>R</button>
        <button>T</button>
        <button>Y</button>
        <button>U</button>
        <button>I</button>
        <button>O</button>
        <button>P</button>
    </div>
    <div class="row">
        <button>A</button>
        <button>S</button>
        <button>D</button>
        <button>F</button>
        <button>G</button>
        <button>H</button>
        <button>J</button>
        <button>K</button>
        <button>L</button>
    </div>
    <div class="row">
        <button>
            <svg viewBox="0 0 24 24"><use href="#settings"></use></svg> 
        </button>
        <button>Z</button>
        <button>X</button>
        <button>C</button>
        <button>V</button>
        <button>B</button>
        <button>N</button>
        <button>M</button>
        <button>                            
         <svg viewBox="0 0 24 24"><use href="#backspace"></use></svg>
        </button>
    </div>
</div>

<style lang="scss">
    #keyboard-widget {
        --_keyboard-gap: var(--keyboard-gap, 0.5rem);
        --_keyboard-width: var(--keyboard-width, min(100%, 35rem));
        --_button-width: 2.5rem;
        width: var(--_keyboard-width);
        padding: 0.75rem 0.5rem;
        background: var(--clr-grey-400);
        flex-direction: column;


        &, & > .row {
            display: flex;
            gap: var(--_keyboard-gap);
        }


        & > .row {
            flex-direction: row;
            //margin-inline: auto;
        }


        button {
            --padding: 0;
            display: flex;
            place-items: center;
            place-content: center;
            width: 100%;
            //width: var(--_button-width);
            overflow: hidden;
            aspect-ratio: 1;
            font-size: 1.5rem;
            font-weight: 600;


            &:hover {
                

            }

        }

    }
    

</style>
