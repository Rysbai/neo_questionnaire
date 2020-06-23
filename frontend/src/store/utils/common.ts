
export function genCharArray(charA: string, charZ: string): Array<string> {
    let a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i).toUpperCase());
    }
    return a;
}

export const CHARS = genCharArray('a', 'z');