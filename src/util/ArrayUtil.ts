function unique<T>(array: T[]): T[];
function unique<T, R>(array: T[], mapperFunction: (item: T) => R): R[];
function unique<T, R>(array: T[], mapperFunction?: (item: T) => R) {
    if (mapperFunction) {
        return Array.from(new Set([...array.map(mapperFunction)]));
    }
    return Array.from(new Set([...array]));
}

export const ArrayUtil = Object.freeze({
    unique,
});
