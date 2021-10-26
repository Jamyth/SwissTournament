import { PairingUtil } from '../../src/util/PairingUtil';
import { strict as assert } from 'assert';

describe('PairingUtil', () => {
    describe('Random Pairs', () => {
        it('should have equal pairs', () => {
            const items = [1, 2, 3, 4, 5, 6];
            const pairs = PairingUtil.getRandomPairs(items);

            assert.deepEqual(pairs.length, 3);
        });

        it('should never duplicate', () => {
            const items = [1, 2, 3, 4, 5, 6];
            const pairs = PairingUtil.getRandomPairs(items);
            const expends = Array.from(new Set([...pairs.flat()])).sort();

            assert.deepEqual(expends.length, items.length);
            assert.deepEqual(expends, items);
        });

        it('should number of pairs should round up for uneven items', () => {
            const items = [1, 2, 3, 4, 5];
            const pairs = PairingUtil.getRandomPairs(items);

            assert.deepEqual(pairs.length, 3);
        });

        describe('Type of Pairs', () => {
            it('should be all array (even)', () => {
                const items = [1, 2, 3, 4, 5, 6];
                const pairs = PairingUtil.getRandomPairs(items);
                const types = pairs.map((_) => Array.isArray(_));
                assert.deepEqual(types, [true, true, true]);
            });

            it('should be all array (odd)', () => {
                const items = [1, 2, 3, 4, 5];
                const pairs = PairingUtil.getRandomPairs(items);
                const types = pairs.map((_) => Array.isArray(_));
                assert.deepEqual(types, [true, true, true]);
            });
        });
    });
});
