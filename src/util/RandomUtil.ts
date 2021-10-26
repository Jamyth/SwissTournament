function getRange(max: number = 1, min: number = 0) {
    if (max <= 0) {
        return -1;
    }

    return Math.floor(Math.random() * max + min);
}

export const RandomUtil = Object.freeze({
    getRange,
});
