import { ShuffleUtil } from './util/ShuffleUtil';
import { Pair, PairingUtil } from './util/PairingUtil';
import { ArrayUtil } from './util/ArrayUtil';

interface Player<T> {
    information: T;
    matchResults: (2 | 1 | 0)[];
    matchedPlayer: Player<T>[];
}

export class SwissTournament<T> {
    private players: Player<T>[];
    private currentRound: number;
    // private tournamentId: number;
    private pairings: Pair<Player<T>>[][];
    private totalRounds: number;

    constructor(players: T[]) {
        this.players = ShuffleUtil.shuffle(players).map(this.initPlayer);
        this.currentRound = 0;
        // this.tournamentId = Date.now();
        this.pairings = [];
        this.totalRounds = this.getTotalRound();
    }

    /**
     * @description create a pairing with exist match result or random pairs
     */
    createPairing() {
        if (this.currentRound === this.totalRounds) {
            console.info(`Match Complete: ${this.totalRounds} rounds in total`);
            return [];
        }

        if (this.currentRound === 0) {
            const pairing = PairingUtil.getRandomPairs(this.players);
            this.pairings.push(pairing);
            this.whitelistPlayer(pairing);
            this.currentRound++;
            return pairing;
        }

        const playerGroups = this.getPlayerGroup();
        const pairingGroups = playerGroups.map((_) => PairingUtil.getRandomPairs(_, this.pairConditions));
        const pairing = PairingUtil.merge(pairingGroups);
        this.whitelistPlayer(pairing);
        this.pairings.push(pairing);
        this.currentRound++;

        return pairing;
    }

    reportResult(point: 2 | 1 | 0, matchingFn: (player: Player<T>) => boolean) {
        const player = this.players.find(matchingFn);

        if (!player) {
            return;
        }

        const pair = this.pairings[this.currentRound - 1].find((_) => _.includes(player))!;

        if (PairingUtil.isOrphan<Player<T>>(pair)) {
            return;
        }

        pair.forEach((player) => {
            if (this.currentRound !== player.matchResults.length - 1) {
                return;
            }
            if (matchingFn(player)) {
                player.matchResults.push(point);
            } else {
                player.matchResults.push(point === 2 ? 0 : point === 1 ? 1 : 0);
            }
        });
    }

    /**
     * @description Get the match result of the desired round
     * @param round zero-based, empty = latest
     */
    getResult(round?: number) {
        // TODO
    }

    resetPlayer() {
        this.players = ShuffleUtil.shuffle(this.players).map((_) => this.initPlayer(_.information));
    }

    getTotalRound() {
        const players = this.players.length;
        if (players <= 2) {
            return 1;
        } else if (players <= 4) {
            return 2;
        } else if (players <= 8) {
            return 3;
        } else if (players <= 16) {
            return 4;
        } else if (players <= 32) {
            return 5;
        } else if (players <= 64) {
            return 6;
        } else if (players <= 128) {
            return 7;
        } else if (players <= 212) {
            return 8;
        } else if (players <= 384) {
            return 9;
        } else if (players <= 672) {
            return 10;
        } else if (players <= 1248) {
            return 11;
        } else if (players <= 2272) {
            return 12;
        } else {
            return 13;
        }
    }

    private initPlayer(information: T): Player<T> {
        return {
            information,
            matchResults: [],
            matchedPlayer: [],
        };
    }

    private getAccumulatedResult(player: Player<T>): number {
        return player.matchResults.reduce<number>((acc, curr) => acc + curr, 0);
    }

    private getPlayerGroup(): Player<T>[][] {
        const players = [...this.players];
        const points = ArrayUtil.unique(players, this.getAccumulatedResult);

        return points.map((point) => {
            return players.filter((_) => this.getAccumulatedResult(_) === point);
        });
    }

    private whitelistPlayer(pairing: Pair<Player<T>>[]) {
        pairing.forEach(([playerA, playerB]) => {
            if (playerB) {
                playerA.matchedPlayer.push(playerB);
                playerB.matchedPlayer.push(playerA);
            }
        });
    }

    private pairConditions(playerA: Player<T>, playerB: Player<T>) {
        // return true;
        return !playerA.matchedPlayer.includes(playerB) && !playerB.matchedPlayer.includes(playerA);
    }
}
