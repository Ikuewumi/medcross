
export type Coordinate = [number, number]
export type Direction = 1 | 0
export type Matrix = string[][]





export interface Word {
  word: string
  start: Coordinate
  end: Coordinate
  meaning?: string
}


export interface Cross {
    size: number
    words: Word[]
}



export interface CrossFull extends Cross {
    title: string,
    description: string,
    image: string,
    author: string,
    category: string[],
    date?: any
} 



export class CrossWord {
  private _words: Word[];
  private _array: Matrix;
  private _answers: Matrix;
  size: number;



  constructor(
      size: number,
      words: Word[] = []
  ) {

      this.size = size
      this._words = words
      this._array = CrossWord.generateMatrixFromWords(this._words, this.size)
      this._answers = CrossWord.getArray(size);
  }



  get answers() {
      return this._answers
  }



  set answers(matrix: Matrix) {
      this._answers = matrix
  }




  static getArray(size: number): Matrix {
      if (!(typeof size === 'number' && size > 1)) throw Error("The size must be a positive integer (x > 1)")
      return Array.from({ length: size }, () => Array.from({ length: size }, _ => ""))
  }


  static getDirection(word:Word): Direction {
      const isX = word.start[0] === word.end[0]
      const isY = word.start[1] === word.end[1]

      if ((!isX) && (!isY)) {
          throw Error("Invalid word direction. The word must be either horizontal (y-axis) or vertical (x-axis).")
      }

      const direction = isY ? 1 : 0

      return direction
  }


  static validateWord(word:Word):void {
      const isString = typeof word.word === 'string'
      const dir = CrossWord.getDirection(word)
      const crossLength = dir ? word.end[0] - word.start[0] : word.end[1] - word.start[1]
      const lengthValid = word.word.length === (crossLength + 1) && word.word.length > 1


      if (!(lengthValid && isString)) throw Error("Invalid word length. The word length must be greater than 1 and match the specified direction.")

  }


  static generateMatrixFromWords(words:Word[], size:number):Matrix {
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


  static extractWord(matrix:Matrix, coordinates:Coordinate, direction:Direction) {
      let currentX = coordinates[0]
      let currentY = coordinates[1]



      const word:Word = {
          word: "",
          start: [currentX, currentY],
          end: [currentX, currentY]
      }

      function logic() {
          let a = false
          a = (matrix?.at(currentX)?.at(currentY) > '')

          return a
      }




      while(logic()) {

          word.end = [currentX, currentY]
          word.word += matrix[currentX][currentY]




          if (direction === 0) {
              currentY++;
          } else {
              currentX++;
          }
      }



      return word



  }


  static generateWordsFromMatrix(matrix:Matrix):Word[] {
      const words = [];


      matrix.forEach((row, x) => {
          row.forEach((cell, y) => {
              if (cell <= "") return;

              const isStartofXWord =
                  (y === 0 && matrix?.at(x)?.at(y+1) > "") ? true :
                  (matrix[x][y-1] && matrix[x][y-1] > "") ? false :
                  (x > matrix[x].length - 1) ? false :
                  (matrix?.at(x)?.at(y+1) > "");



              const isStartofYWord =
                  (x=== 0 && matrix?.at(x+1)?.at(y) > "") ? true :
                  (matrix[x-1] && matrix[x-1][y] > "") ? false :
                  (y > matrix.length - 1) ? false :
                  (matrix?.at(x+1)?.at(y) > "");




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



  static calculateEndFromStart(start:Coordinate, word: string, direction: Direction):Coordinate {
    let currentX = start[0]
    let currentY = start[1]

    if (direction) {  currentX = (currentX + word.length-1) } 
    else {  currentY = (currentY + word.length-1) }

    return [currentX, currentY]
  }

  static calculateStartFromEnd(end:Coordinate, word: string, direction: Direction):Coordinate {
    let currentX = end[0]
    let currentY = end[1]

    if (direction) { currentX = (currentX - (word.length-1)) }
    else { currentY = (currentY - (word.length-1)) }

    return [currentX,currentY]
  }


  


  static validateCoordinates(coordinates: Coordinate, size: number) {
    return coordinates.at(0) >= 0 &&
        coordinates.at(0) <= size - 1 &&
        coordinates.at(1) >= 0 &&
        coordinates.at(1) <= size - 1
  }  



  static getWordsInCoordinates(matrix: Matrix, coordinate: Coordinate): Word[] {
    const words = CrossWord.generateWordsFromMatrix(matrix)
    const includedWords = words.filter(word => {
        const isInx = coordinate[0] >= word.start[0] && coordinate[0] <= word.end[0]
        const isIny = coordinate[1] >= word.start[1] && coordinate[1] <= word.end[1]

        return isInx && isIny
    }) 

    return includedWords
  }

  /**
   * Calculates the coordinates of a particular index in a 1d array for a bidimensional array (Matrix) of the specified size 
   * @param i
   * @param size 
   * @returns {Coordinate} The coordinates
   */
  static calcCoordinates(i:number, size:number):Coordinate  {
    const x_ = Math.floor(i / size);
    const x = x_;
    const y = i - x * size;

    return [x, y];
    };

    static calcIndexFromCoordinates(coords: Coordinate, size: number): number {
        return (coords[0] * size) + coords[1]
    }


    /**
     * it is assumed that the crossword is valid, and the entered word is valid and included in the crossword 
     * @param cross Crossword
     * @param word Word 
     */  
  static generateWordPattern(cross:Cross, word:Word) {
    const matrix = CrossWord.generateMatrixFromWords(cross.words, cross.size)
    const isYWord:Direction = CrossWord.getDirection(word)

    let currentX = word.start[0];
    let currentY = word.start[1];
    let pattern = '';



    let loopCondition = () => (isYWord === 1) ? currentX <= word.end[0] : currentY <= word.end[1];


    while (loopCondition()) {
        pattern += matrix[currentX][currentY] || '_'

        if (isYWord) currentX++;
        else currentY++;
    }


    return pattern
    
  }

  static getAllCoordinatesForWord(word:Word): Coordinate[] {
    const coordinates = []
    const direction:Direction = CrossWord.getDirection(word)

    let currentX = word.start[0]
    let currentY = word.start[1]

    let loopCondition = () => (direction === 1) ? currentX <= word.end[0] : currentY <= word.end[1];


    while(loopCondition()) {
            coordinates.push([currentX, currentY])
    
            if (direction) currentX++;
            else currentY++;
    }
    
    return coordinates
  }

  static getEnabledCoordinates(cross:Cross, userAnswers:Word[]):Coordinate[] {
    const enabled: number[] = []
    
    cross.words.forEach(word => {
        enabled.push(...CrossWord.getAllCoordinatesForWord(word).map(c_ => (c_[0] * cross.size) + c_[1]))
    })


    const enabledSet = new Set(enabled)
    const enabledCells = Array.from(enabledSet).map(i => {
        return CrossWord.calcCoordinates(i, cross.size)
    }).filter(coord => {
        const isInUserAnswers = userAnswers?.length > 0 ? CrossWord.getWordsInCoordinates(CrossWord.generateMatrixFromWords(userAnswers, cross.size), coord).length : 0
        return (!isInUserAnswers)
    })  
    
    return enabledCells
  }


  static getNextValidCoordinates(cross:Cross, userAnswers:Word[], currentWord:Word, coordinate: Coordinate):Coordinate {
    const enabledCells = CrossWord.getEnabledCoordinates(cross, userAnswers);
    
    const direction = CrossWord.getDirection(currentWord);


    return [0, 0]
  }

}







const words:Word[] = [
  { word: "aster", start: [0, 0], end: [0, 4] },
  { word: "art", start: [0, 0], end: [2, 0] },
  { word: "too", start: [2, 0], end: [2, 2] },
  { word: "oil", start: [2, 2], end: [4, 2] },
  { word: "ice", start: [3, 2], end: [3, 4] },
  { word: "riley", start: [0, 4], end: [4, 4] },
]

const matrix = [
  ['A', 'Y', ''],
  ['R', 'O', 'Y'],
  ['M', '', 'E']
]

const m2 = [
  [ 'a', 's', 't', 'e', 'r' ],
  [ 'r', '', '', '', 'i' ],
  [ 't', 'o', 'o', '', 'l' ],
  [ '', '', 'i', 'c', 'e' ],
  [ '', '', 'l', '', 'y' ]
]


const a = CrossWord.generateMatrixFromWords(words, 5)
const b = CrossWord.generateWordsFromMatrix(matrix)
const c = CrossWord.generateWordsFromMatrix(m2)



