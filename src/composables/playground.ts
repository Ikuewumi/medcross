/**
 * Playground File for testing computations via bun or quokka.js
*/
import { CrossWord, type Cross, type Word } from "./engine";


const data_: Cross = {
    size: 9,
    words: [
        { "word": "PATELLA", "start": [0, 2], "end": [6, 2], "meaning": "knee bone" },
        { "word": "FEMUR", "start": [0, 7], "end": [4, 7], "meaning": "longest bone of the body" },
        { "word": "DELTOID", "start": [5, 0], "end": [5, 6], "meaning": "the muscle of the shoulder region" },
        { "word": "CLAVICLE", "start": [1, 0], "end": [1, 7], "meaning": "collar bone" },
        { "word": "URETHRA", "start": [8, 0], "end": [8, 6], "meaning": "a tube that carries urine from the bladder outside the body" },
        { "word": "DURA", "start": [5, 6], "end": [8, 6], "meaning": "outermost layer of the spinal meninges" },
        { "word": "URETER", "start": [3, 0], "end": [3, 5], "meaning": "a tube that carries urine from the kidneys to the bladder" },
    ]
}

const answers: Word[] = [
    { "word": "URETER", "start": [3, 0], "end": [3, 5], "meaning": "a tube that carries urine from the kidneys to the bladder" },
]



// console.log(CrossWord.generateWordPattern(data_, answers[0]))

// console.log(CrossWord.getAllCoordinatesForWord(data_.words[0]))

console.log(CrossWord.getEnabledCoordinates(data_, answers))

//__A____
//CLAVICLE
