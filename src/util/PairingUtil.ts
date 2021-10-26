import { RandomUtil } from './RandomUtil';

export type Pair<T> = [T] | [T, T];

function getRandomPairs<T>(items: T[], conditions: (itemA: T, itemB: T) => boolean = (_) => true): Pair<T>[] {
    const array = [...items];
    const result: Pair<T>[] = [];
    let currentPair: T[] = [];

    if (array.length % 2 !== 0) {
        console.info('extra element');
        const extraItem = array.splice(RandomUtil.getRange(array.length), 1)[0];
        result.push([extraItem]);
    }

    while (array.length) {
        const randomIndex = RandomUtil.getRange(array.length);
        const item = array.splice(randomIndex, 1)[0];
        currentPair.push(item);

        if (currentPair.length === 2) {
            if (conditions(currentPair[0], currentPair[1])) {
                result.push(currentPair as Pair<T>);
            } else {
                array.push(...currentPair);
            }
            currentPair = [];
        }
    }
    return result;
}

function isOrphan<T>(pair: Pair<T>) {
    return pair.length === 1;
}

function hasOrphanPair<T>(pairings: Pair<T>[]): boolean {
    return pairings.some((_) => _.length === 1);
}

function getOrphan<T>(pairings: Pair<T>[]): T | null {
    if (!hasOrphanPair(pairings)) {
        return null;
    }

    return pairings.find((_) => _.length === 1)![0];
}

function merge<T>(pairingGroups: Pair<T>[][]): Pair<T>[] {
    const orphans = pairingGroups.map(getOrphan).filter((_): _ is T => _ !== null);
    const orphanGroups: Pair<T>[] = [];
    let temps: T[] = [];
    orphans.forEach((_) => {
        temps.push(_);
        if (temps.length === 2) {
            orphanGroups.push(temps as Pair<T>);
            temps = [];
        }
    });

    if (temps.length) {
        orphanGroups.push(temps as Pair<T>);
        temps = [];
    }

    const pairingGroupsWithoutOrphans = pairingGroups.map((_) => _.filter((_) => _.length === 2));

    return pairingGroupsWithoutOrphans.flatMap((_, index) => {
        const orphanPair = orphanGroups[index] ?? null;
        return orphanPair !== null ? [..._, orphanPair] : _;
    });
}

export const PairingUtil = Object.freeze({
    getRandomPairs,
    hasOrphanPair,
    isOrphan,
    getOrphan,
    merge,
});
