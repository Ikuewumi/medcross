// Encoding and Decoding Text
function base64ToBytes(base64: string) {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0));
}

function bytesToBase64(bytes: Uint8Array) {
    const binString = String.fromCodePoint(...bytes);
    return btoa(binString);
}



export function encodeString(str: string) { return bytesToBase64(new TextEncoder().encode(str)) }
export function decodeString(str: string) { return (new TextDecoder().decode(base64ToBytes(str))) }
