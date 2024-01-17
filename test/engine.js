/**
 * @typedef Word - Object Representation of a word in the crossword
 * @type {object}
 * @property {string} word - The word
 * @property {number[]} start - The x, y starting coordinates of the word
 * @property {number[]} end - The x, y ending coordinates of the word
 * @property {string} [meaning] - The definition of the word
 */

/**
 * @typedef Direction - Binary representation of the direction of a particular word 0 for "x", or horizontally, and 1 for "y" or vertically
 * @type {1|0}
 */

/**
 * @typedef Matrix - A multidimensional array for storing the crossword like an actual matrix
 * @type {string[][]}
 */

/**
 * @typedef Coordinates - The coordinates of a particular cell in the format [x, y]
 * @type {[number, number]}
 */


/**
 * Creates a CrossWord
 */
class CrossWord {
    /**
     * 
     * @param {number} size The size of the multidimestional array
     * @param {Word[]} words 
     */
    constructor(
        size,
        words = []
    ) {
        /**@type {number} */
        this.size = size

        /**@type {Word[]} */
        this.words = words


        // this.array = 

    }



    /**
     * @static
     * Creates a multidimensional array for the crosswords
     * @param {number} size - The size of the multidimensional array
     * @returns {Matrix}
     */
    static getArray(size) {
        if (!(typeof size === 'number' && size > 1)) throw Error("The size must be a positive integer (x > 1)")
        return Array.from({ length: size }, () => Array.from({ length: size }, _ => ""))
    }


    /**
     * @static
     * Get the direction of a word
     * @param {Word} word
     * @throws Will throw an error if word doesn't have a clear direction
     * @returns {Direction}
     */
    static getDirection(word) {
        const isX = word.start[0] === word.end[0]
        const isY = word.start[1] === word.end[1]

        if ((!isX) && (!isY)) {
            throw Error("Invalid word direction. The word must be either horizontal (y-axis) or vertical (x-axis).")
        }

        return +(isY)
    }


    /**
     * @static
     * Check if a word is valid
     * @param {Word} word
     * @throws Will throw an error if the word is invalid 
     * @returns {void}
     */
    static validateWord(word) {
        const isString = typeof word.word === 'string'
        const dir = CrossWord.getDirection(word)
        const crossLength = dir ? word.end[0] - word.start[0] : word.end[1] - word.start[1]
        const lengthValid = word.word.length === (crossLength + 1) && word.word.length > 1

        if (!(lengthValid && isString)) throw Error("Invalid word length. The word length must be greater than 1 and match the specified direction.")

    }


    /**
     * @static
     * Convert the crossword to an matrix format
     * @param {Word[]} words 
     * @param {number} size
     * @returns {Matrix} The crossword in matrix form 
     */
    static generateMatrixFromWords(words, size) {
        const array = CrossWord.getArray(size)

        words.forEach(word => {
            CrossWord.validateWord(word)
            const dir = CrossWord.getDirection(word)
            const characters = word.word.split("")

            // Iterate through characters and fill in the crossword grid
            let currentX = word.start[0];
            let currentY = word.start[1];

            characters.forEach(char => {
                // check for conflicting characters
                const charConflict = array[currentX][currentY] > '' && array[currentX][currentY] !== char
                if (charConflict) throw Error('Character conflict detected!, some cells, have more than one letter')

                array[currentX][currentY] = char;

                // Move to the next position based on the word's direction
                if (dir === 0) {
                    currentY++;
                } else {
                    currentX++;
                }
            
            });


        })

        return array

    }



    /**
     * @static
     * Extract the word from a matrix given the coordinates, and direction
     * @param {Matrix} matrix - Matrix of characters
     * @param {number[]} coordinates - The starting point of the word
     * @param {Direction} direction
     * @returns {Word}
     */
    static extractWord(matrix, coordinates, direction) {

        let currentX = coordinates[0]
        let currentY = coordinates[1]


        
        /**
         * @type {Word} - The empty object for the word
         */
        const word = {
            word: "",
            start: [currentX, currentY],
            end: [currentX, currentY]
        }

        // let accessX = direction >  
        function logic() {
            let a = false 
            if (direction === 0) { a = (currentY === matrix.length) || (matrix[currentX][currentY+1] > '') } 
            else { a = (currentX === matrix.length) || (matrix[currentX+1][currentY] > '') }

            return a
        }




        while(logic()) {
            console.log(word)
            word.end = [currentX, currentY]
            word.word += matrix[currentX][currentY]

            if (direction === 0) {
                currentX++;
            } else {
                currentY++;
            }
        }

        console.log(word)


        return word



    }




    /**
     * @static
     * Generate the words of a crossword from a matrix 
     * @param {Matrix} matrix - The multidimensional array
     * @returns {Word[]} The words in the array
     */
    static generateWordsFromMatrix(matrix) {
        /**
         * @type {Word[]}
         */
        const words = [];

        console.log(matrix)

        matrix.forEach((row, x) => {
            row.forEach((cell, y) => {
                const isStartofXWord = (y === 0 ? true : matrix[x][y-1] <= '') && (matrix[x][y+1] > '') 
                const isStartofYWord = (x === 0 ? true : matrix[x-1][y] <= '') && (matrix[x+1][y] > '') 
                console.log({x, y, isStartofXWord, isStartofYWord})


                if (isStartofXWord) {
                    words.push( CrossWord.extractWord(matrix, [x, y], 0) )
                } 
            
                if(isStartofYWord) {
                    words.push( CrossWord.extractWord(matrix, [x, y], 1) )    
                }

            }) 
        })

        return words
    }










}






/**
 * @type {Word[]}
 */
const words = [
    { word: "aster", start: [0, 0], end: [0, 4] },
    { word: "art", start: [0, 0], end: [2, 0] },
    { word: "too", start: [2, 0], end: [2, 2] },
    { word: "oil", start: [2, 2], end: [4, 2] },
    { word: "ice", start: [3, 2], end: [3, 4] },
    { word: "riley", start: [0, 4], end: [4, 4] },

]

const matrix = [
    ['A', 'Y', 'E'],
    ['R', 'O', 'Y'],
    ['M', '', 'E']
]
const a = CrossWord.generateMatrixFromWords(words, 5)
const b = CrossWord.generateWordsFromMatrix(matrix)

console.table(a)
