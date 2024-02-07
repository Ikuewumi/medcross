/**
 * Playground File for testing computations via bun or quokka.js
*/
import { CrossWord, type Cross, type CrossFull, type Word } from "./engine";



export const possibleDataFormat:CrossFull = {
    size: 8,
    words: [
        { "word": "AORTA", "start": [0, 0], "end": [4, 0], "meaning": "The largest artery in the body" },
        { "word": "OS", "start": [0, 4], "end": [0, 5], "meaning": "an opening of the cervix" },
        { "word": "SPLEEN", "start": [0, 5], "end": [5, 5], "meaning": "the biological blood blank" },
        { "word": "CRANIUM", "start": [1, 2], "end": [7, 2], "meaning": "protective skeleton for the brain" },
        { "word": "TRACHEA", "start": [3, 0], "end": [3, 6], "meaning": "larynx, _______, bronchi" },
        { "word": "RIB", "start": [5, 1], "end": [5, 3], "meaning": "a bone that surrounds the lungs" },
        { "word": "LYMPH", "start": [7, 0], "end": [7, 4], "meaning": "carries fats into the blood stream" }
    ],
    author: "Ayobami",
    title: "Anatomy Galore",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere neque, excepturi consequuntur omnis magnam labore non. Nulla quod odit consequuntur?",
    image: "/images/cross.png",
    category: ["anatomy"],
    date: Date.now()


}


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
