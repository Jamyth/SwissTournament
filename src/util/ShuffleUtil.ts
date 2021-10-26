import { RandomUtil } from './RandomUtil';

function shuffle<T>(array: T[]): T[] {
    const result = [...array];
    let currentIndex = array.length;
    let randomIndex: number;

    while (currentIndex !== 0) {
        randomIndex = RandomUtil.getRange(currentIndex--);
        [result[currentIndex], result[randomIndex]] = [result[randomIndex], result[currentIndex]];
    }

    return result;
}

export const ShuffleUtil = Object.freeze({
    shuffle,
});
