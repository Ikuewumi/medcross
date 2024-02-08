import { atom } from "nanostores";

export const gameOngoing = atom(false);
const ids= ['#crossword-page', 'header'] 

gameOngoing.subscribe(state => {
    ids.map(id=>{
        const el = document.querySelector(id);
        if (state) {
            el?.classList.add('ongoing')
        } else {
            el?.classList.remove('ongoing')
        }
    })
})