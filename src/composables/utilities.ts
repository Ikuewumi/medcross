
export const sleep = (ms=200) => {
    return new Promise<void>((resolve, _) => {
        let t = setTimeout(() => {
            clearTimeout(t)
            resolve()
        }, ms)
    })
}

/**
 * Gets the returns a string with a "/" appended to it if needed
 * It is done so that the urls can be consistent and wont be duplicated into two variants e.g. `/crossword/raf` and `/crossword/raf/`
 */
export const slashify = (string: string) => {
    return (string.endsWith('/')) ? string : `${string}/`

}
