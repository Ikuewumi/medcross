<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let choices = ['choiceA', 'choiceB']
    export let chosen = 'choiceA';
    const evt = createEventDispatcher()

    const handleSelect = (choice_: string) => {
        evt('select', choice_)
    } 
</script>


<div class="custom-select">
    {#each choices as choice, i (i) }
        <button on:click={handleSelect.bind(this, choice)} class:selected={choice === chosen}>{choice}</button>
    {/each}
</div>

<style lang="scss">
    .custom-select {
        --_choice-width: var(--choice-width, min(200px, 50vh));
        display: flex;
        // width: inherit;
        overflow-x: auto;
        overflow-y: visible;
        // flex-wrap: wrap;
        gap: 0.5rem 0.5rem;


        button {
            --_padding: 0.45rem 1rem;
            --_border: 2px solid currentColor;
            display: flex;
            place-content: center;
            border-radius: var(--radius);
            outline-offset: -4px;
            outline-width: 1px;
            width: 300px;
            aspect-ratio: 5 / 3;
            font-size: var(--step-3);
            text-align: center;
            box-shadow: var(--shadow-elevation-medium);
            
            &.selected {
                --_bg: var(--clr-grey-400);
                --_clr: var(--clr-grey-800);
            }
        }

    }

</style>