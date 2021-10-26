import { ShuffleUtil } from '../../src/util/ShuffleUtil';
import { strict as assert } from 'assert';

describe('ShuffleUtil', () => {
    it('should shuffle', () => {
        const array = [1, 2, 3, 4, 5];
        assert.notDeepEqual(ShuffleUtil.shuffle(array), array);
    });

    it('should never return the same result', () => {
        const array = [1, 2, 3, 4, 5];
        assert.notDeepEqual(ShuffleUtil.shuffle(array), ShuffleUtil.shuffle(array));
    });
});
