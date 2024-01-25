/**
 * Emulates the jquery-like querying
 * @param {string} str - The selector  
 * @returns {null | HTMLElement} an HTMLElement
 */
globalThis.$ = (str) => {
    return document.querySelector(str)
}

/**
 * Emulates the jquery-like querying
 * @param {string} str - The selector  
 * @returns {null | NodeListOf<HTMLElement>} a list of elements
*/
globalThis.$s = (str) => {
    return document.querySelectorAll(str)
}

console.log('Script Startup Running')