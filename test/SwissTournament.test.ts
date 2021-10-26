import { SwissTournament } from '../src/SwissTournament';
import { strict as assert } from 'assert';

describe('SwissTournament', () => {
    it('each valid match should have same amount of pairings', () => {
        const players = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        const tournament = new SwissTournament(players);
        assert.deepEqual(tournament.getTotalRound(), 4);

        const pairing = tournament.createPairing();
        tournament.reportResult(2, (_) => _.information === 1);
        tournament.reportResult(0, (_) => _.information === 2);
        tournament.reportResult(2, (_) => _.information === 3);
        tournament.reportResult(2, (_) => _.information === 4);
        tournament.reportResult(2, (_) => _.information === 5);
        tournament.reportResult(2, (_) => _.information === 6);
        tournament.reportResult(2, (_) => _.information === 7);

        const pairing2 = tournament.createPairing();
        tournament.reportResult(2, (_) => _.information === 1);
        tournament.reportResult(2, (_) => _.information === 2);
        tournament.reportResult(2, (_) => _.information === 3);
        tournament.reportResult(2, (_) => _.information === 4);
        tournament.reportResult(2, (_) => _.information === 5);
        tournament.reportResult(2, (_) => _.information === 6);
        tournament.reportResult(2, (_) => _.information === 7);
        assert.deepEqual(pairing.length, pairing2.length);

        const pairing3 = tournament.createPairing();
        tournament.reportResult(2, (_) => _.information === 1);
        tournament.reportResult(2, (_) => _.information === 2);
        tournament.reportResult(1, (_) => _.information === 3);
        tournament.reportResult(1, (_) => _.information === 4);
        tournament.reportResult(0, (_) => _.information === 5);
        tournament.reportResult(0, (_) => _.information === 6);
        tournament.reportResult(0, (_) => _.information === 7);

        const pairing4 = tournament.createPairing();
        tournament.reportResult(2, (_) => _.information === 1);
        tournament.reportResult(2, (_) => _.information === 2);
        tournament.reportResult(0, (_) => _.information === 3);
        tournament.reportResult(0, (_) => _.information === 4);
        tournament.reportResult(0, (_) => _.information === 5);
        tournament.reportResult(0, (_) => _.information === 6);
        tournament.reportResult(0, (_) => _.information === 7);
        assert.deepEqual(pairing4.length, pairing3.length);

        const pairing5 = tournament.createPairing();
        assert.deepEqual(pairing5.length, 0);
    });

    it('each match should not have same opponent', () => {
        const players = [1, 2, 3, 4];
        const tournament = new SwissTournament(players);
        const pairing = tournament.createPairing();
        const pairing2 = tournament.createPairing();

        pairing.forEach((_, i) => {
            const pair = pairing2[i];

            assert.notDeepEqual(_.map((_) => _.information).sort(), pair.map((_) => _.information).sort());
        });
    });
});
