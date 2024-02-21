import { atom } from "nanostores";
import type { Word } from "./engine";

export const gameOngoing = atom(false);


export const coinCount = atom(0);
export const costs = {
    revealWord: 5
}


export const currentWord = atom<Word>(null! as any as Word)
