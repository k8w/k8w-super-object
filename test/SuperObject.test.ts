import '../index';
const assert = require('assert');

describe('SuperObject', function () {
    it('Object.merge', function () {
        (Array as any).prototype.test = 'test';

        let a: any = {
            a: 1,
            b: 2,
            c: {
                c1: 111,
                c2: [111, 222, 333],
                c3: {
                    a: 1,
                    b: 2
                }
            }
        }

        let b: any = {
            b: 222,
            c: {
                c2: [1, 2],
                c3: {
                    a: 1111,
                    d: () => 'ddd'
                }
            }
        }

        let c = Object.merge({}, a, b);

        assert.equal(b.c.c3.d(), 'ddd');
        assert.equal(c.c.c3.d(), 'ddd');

        delete b.c.c3.d;
        delete c.c.c3.d;

        assert.deepEqual(a, {
            a: 1,
            b: 2,
            c: {
                c1: 111,
                c2: [111, 222, 333],
                c3: {
                    a: 1,
                    b: 2
                }
            }
        }, 'a不应该变');

        assert.deepEqual(b, {
            b: 222,
            c: {
                c2: [1, 2],
                c3: {
                    a: 1111
                }
            }
        }, 'b不应该变')

        assert.deepEqual(c, {
            a: 1,
            b: 222,
            c: {
                c1: 111,
                c2: [1, 2, 333],
                c3: {
                    a: 1111,
                    b: 2
                }
            }
        });

        assert.deepEqual(Object.merge([], [[0, 0], null, undefined]), [[0, 0], null, undefined]);
        assert.deepEqual(Object.merge([123, null, undefined, 234], [null, 123]), [null, 123, undefined, 234]);

        assert.deepEqual(Object.merge({ a: 1, b: 1 }, { a: null, b: null }), { a: null, b: null });
        assert.deepEqual(Object.merge({ a: 1, b: 1 }, { a: undefined, b: undefined }), { a: undefined, b: undefined });
        assert.deepEqual(Object.merge({ a: { a: 1 }, b: [1] }, { a: null, b: null }), { a: null, b: null });
        assert.deepEqual(Object.merge({ a: { a: 1 }, b: [1] }, { a: undefined, b: undefined }), { a: undefined, b: undefined });

        // 数组是完整覆盖 而不是合并
        assert.deepEqual(Object.merge({ a: [1, 2, 3, 4] }, { a: [10, 20] }), { a: [10, 20, 3, 4] });

    })

    it('Object.values', function () {
        let a = { gggg: 5, zzz: 6, ccc: 7, aaa: 8, bbb: 9 };
        assert.deepEqual(Object.values(a), [5, 6, 7, 8, 9])
    })

    it('Object.forEach', function () {
        let obj = {
            a: 1,
            b: 3,
            c: 5,
            d: 7
        };
        let arrK: any[] = [];
        let arrV: any[] = [];

        (Object.prototype as any)['aaa'] = 111;
        (Object.prototype as any)['bbb'] = 222;
        (Object.prototype as any)['ccc'] = 333;

        Object.forEach(obj, (v, k, o: any) => {
            assert.equal(typeof v, 'number')
            assert.equal(typeof k, 'string')
            arrK.push(k);
            arrV.push(v);
            o[k] += 2;
        })

        assert.deepEqual(arrK, ['a', 'b', 'c', 'd'])
        assert.deepEqual(arrV, [1, 3, 5, 7])
        assert.deepEqual(obj, { a: 3, b: 5, c: 7, d: 9 })
    })
})