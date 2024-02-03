export const sleep = (ms=200) => {
    return new Promise<void>((resolve, _) => {
        let t = setTimeout(() => {
            clearTimeout(t)
            resolve()
        }, ms)
    })
}