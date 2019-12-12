const {entries, every, filter, find, findKey, flat, flatMap, forEach, includes, keyOf, keys, map, mapKeys, reduce, some, values} = require('./index');

describe('entries', () => {
  test('returns an iterator object that contains the key/value pairs for each entry in `obj`', () => {
    const value = {};
    const obj = {a: 1, b: 2, c: value};
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    const result = entries(obj);
    expect(typeof result[Symbol.iterator]).toBe('function');
    for (const [key, value] of result) {
      expect(keys).toContain(key);
      expect(values).toContain(value);
    }
  });
});

describe('every', () => {
  test('returns whether invoking `fn` for every entry in `obj` returns something truthy', () => {
    const obj = {a: false, b: 0, c: '', d: undefined, e: null};
    expect(every(obj, () => true)).toBe(true);
    expect(every(obj, () => false)).toBe(false);
    expect(every(obj, val => val)).toBe(false);
    expect(every(obj, val => !val)).toBe(true);
    expect(every(obj, val => val === 0)).toBe(false);
  });

  test('only runs `fn` until it returns something falsy', () => {
    const obj = {a: 1, b: 2, c: 3};
    const fn = jest.fn(() => false);
    every(obj, fn);
    expect(fn.mock.calls.length).toBe(1);
  });

  test('invokes `fn` with `value`, `key`, `obj`', () => {
    const value = {};
    const obj = {a: value};
    const fn = jest.fn();
    every(obj, fn);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(value);
    expect(fn.mock.calls[0][1]).toBe('a');
    expect(fn.mock.calls[0][2]).toBe(obj);
  });
});

describe('filter', () => {
  test('returns a new object containing each entry in `obj` for which invoking `fn` returns something truthy', () => {
    const obj = {a: false, b: 0, c: '', d: undefined, e: null};
    expect(filter(obj, () => true)).not.toBe(obj);
    expect(filter(obj, () => true)).toEqual(obj);
    expect(filter(obj, () => false)).toEqual({});
    expect(filter(obj, val => val)).toEqual({});
    expect(filter(obj, val => !val)).toEqual(obj);
    expect(filter(obj, val => val == null)).toEqual({d: undefined, e: null});
  });

  test('invokes `fn` with `value`, `key`, `obj`', () => {
    const value = {};
    const obj = {a: value};
    const fn = jest.fn();
    filter(obj, fn);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(value);
    expect(fn.mock.calls[0][1]).toBe('a');
    expect(fn.mock.calls[0][2]).toBe(obj);
  });
});

describe('find', () => {
  test('returns the value of the first entry in `obj` for which invoking `fn` returns something truthy', () => {
    const value = {};
    const obj = {a: 1, b: {}, c: value};
    expect(find(obj, val => typeof val === 'number')).toBe(1);
    expect(find(obj, val => val === value)).toBe(value);
    expect(find(obj, (val, key) => key === 'c')).toBe(value);
  });

  test('returns `undefined` if invoking `fn` for each entry in `obj` returns something falsy', () => {
    const obj = {a: 1, b: 2, c: 3};
    const result = find(obj, () => false);
    expect(result).toBe(undefined);
  });

  test('returns `undefined` if invoking `fn` for each entry in `obj` returns something falsy even when there is a key of "undefined"', () => {
    const obj = {undefined: 1};
    const result = find(obj, () => false);
    expect(result).toBe(undefined);
  });

  test('only runs `fn` until it returns something truthy', () => {
    const obj = {a: 1, b: 2, c: 3};
    const fn = jest.fn(() => true);
    find(obj, fn);
    expect(fn.mock.calls.length).toBe(1);
  });

  test('invokes `fn` with `value`, `key`, `obj`', () => {
    const value = {};
    const obj = {a: value};
    const fn = jest.fn();
    find(obj, fn);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(value);
    expect(fn.mock.calls[0][1]).toBe('a');
    expect(fn.mock.calls[0][2]).toBe(obj);
  });
});

describe('findKey', () => {
  test('returns the key of the first entry in `obj` for which invoking `fn` returns something truthy', () => {
    const result = {};
    const obj = {a: 1, b: {}, c: result};
    expect(findKey(obj, value => typeof value === 'number')).toBe('a');
    expect(findKey(obj, value => value === result)).toBe('c');
    expect(findKey(obj, (value, key) => key === 'c')).toBe('c');
  });

  test('returns `undefined` if invoking `fn` for each entry in `obj` returns something falsy', () => {
    const obj = {a: 1, b: 2, c: 3};
    const result = findKey(obj, () => false);
    expect(result).toBe(undefined);
  });

  test('only runs `fn` until it returns truthy', () => {
    const obj = {a: 1, b: 2, c: 3};
    const fn = jest.fn(() => true);
    findKey(obj, fn);
    expect(fn.mock.calls.length).toBe(1);
  });

  test('invokes `fn` with `value`, `key`, `obj`', () => {
    const value = {};
    const obj = {a: value};
    const fn = jest.fn();
    findKey(obj, fn);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(value);
    expect(fn.mock.calls[0][1]).toBe('a');
    expect(fn.mock.calls[0][2]).toBe(obj);
  });
});

describe('flat', () => {
  test('creates a new object with all sub-elements merged into it', () => {
    const obj = {a: 1, b: {c: 1}};
    expect(flat(obj)).toEqual({a: 1, c: 1});
  });

  test('returns a new object even when the depth is 0', () => {
    const obj = {a: 1};
    expect(flat(obj, 0)).not.toBe(obj);
    expect(flat(obj, 0)).toEqual(obj);
  });

  test('recursively flattens to the specified depth', () => {
    const obj = {a: {b: {c: {d: {e: 1}}}}};
    expect(flat(obj, 0)).toEqual(obj);
    expect(flat(obj, 1)).toEqual({b: {c: {d: {e: 1}}}});
    expect(flat(obj, 2)).toEqual({c: {d: {e: 1}}});
    expect(flat(obj, 3)).toEqual({d: {e: 1}});
    expect(flat(obj, 4)).toEqual({e: 1});
  });

  test('discontinues when the object is completely flat', () => {
    const obj = {a: {b: {c: {d: {e: 1}}}}};
    expect(flat(obj, Infinity)).toEqual({e: 1});
  });

  test('does not treat `null` as an object', () => {
    const obj = {a: null};
    expect(flat(obj, Infinity)).toEqual(obj);
  });
});

describe('flatMap', () => {
  test('returns a new flattened object with values returned by invoking `fn` for each entry in `obj`', () => {
    const obj = {a: 1, b: 2};
    const fn = jest.fn()
        .mockReturnValueOnce({c: 3, d: 4})
        .mockReturnValueOnce({e: 5, f: 6});
    const result = flatMap(obj, fn);
    expect(result).not.toBe(obj);
    expect(result).toEqual({c: 3, d: 4, e: 5, f: 6});
  });

  test('only flattens to a depth of 1', () => {
    const obj = {a: 1, b: 2};
    const fn = jest.fn()
        .mockReturnValueOnce({c: {d: 4}})
        .mockReturnValueOnce({e: 5});
    const result = flatMap(obj, fn);
    expect(result).toEqual({c: {d: 4}, e: 5});
  });

  test('invokes `fn` with `value`, `key`, `obj`', () => {
    const value = {};
    const obj = {a: value};
    const fn = jest.fn();
    flatMap(obj, fn);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(value);
    expect(fn.mock.calls[0][1]).toBe('a');
    expect(fn.mock.calls[0][2]).toBe(obj);
  });

  test('only flattens objects returned by `fn`', () => {
    const obj = {a: 0, b: 1};
    const fn = jest.fn()
        .mockReturnValueOnce('a')
        .mockReturnValueOnce({c: 3});
    expect(flatMap(obj, fn)).toEqual({a: 'a', c: 3});
  });

  test('does not treat `null` as an object', () => {
    const obj = {a: 1};
    const fn = jest.fn().mockReturnValueOnce(null);
    expect(flatMap(obj, fn)).toEqual({a: null});
  });
});

describe('forEach', () => {
  test('invokes `fn` for each entry in `obj`', () => {
    const obj = {a: false, b: 0, c: '', d: undefined, e: null};
    const fn = jest.fn();
    forEach(obj, fn);
    expect(fn.mock.calls.length).toBe(Object.entries(obj).length);
  });

  test('returns `undefined`', () => {
    const obj = {a: 1, b: 2, c: 3};
    expect(forEach(obj, () => true)).toBe(undefined);
  });

  test('invokes `fn` with `value`, `key`, `obj`', () => {
    const value = {};
    const obj = {a: value};
    const fn = jest.fn();
    forEach(obj, fn);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(value);
    expect(fn.mock.calls[0][1]).toBe('a');
    expect(fn.mock.calls[0][2]).toBe(obj);
  });
});

describe('includes', () => {
  test('returns `true` if `value` is one of the values in `obj`', () => {
    const value = {};
    const obj = {a: 1, b: {}, c: value};
    expect(includes(obj, value)).toBe(true);
  });

  test('returns `false` if `value` is not one of the values in `obj`', () => {
    const obj = {a: 1, b: 2};
    expect(includes(obj, {})).toBe(false);
  });
});

describe('keyOf', () => {
  test('returns the key of the first entry in `obj` that has a value of `value`', () => {
    const value = {};
    const obj = {a: 1, b: {}, c: value};
    expect(keyOf(obj, 1)).toBe('a');
    expect(keyOf(obj, value)).toBe('c');
  });

  test('returns `undefined` if no entry in `obj` has a value of `value`', () => {
    const obj = {a: 1, b: 2, c: 3};
    expect(keyOf(obj, false)).toBe(undefined);
  });
});

describe('keys', () => {
  test('returns an iterator object that contains the keys for each entry in `obj`', () => {
    const value = {};
    const obj = {a: 1, b: 2, c: value};
    const objKeys = Object.keys(obj);
    const result = keys(obj);
    expect(typeof result[Symbol.iterator]).toBe('function');
    for (const key of result) {
      expect(objKeys).toContain(key);
    }
  });
});

describe('map', () => {
  test('returns a new object with values returned by invoking `fn` for each entry in `obj`', () => {
    const obj = {a: false, b: 0, c: '', d: undefined, e: null};
    expect(map(obj, value => value)).not.toBe(obj);
    expect(map(obj, value => value)).toEqual(obj);
    expect(map(obj, value => typeof value)).toEqual({a: 'boolean', b: 'number', c: 'string', d: 'undefined', e: 'object'});
  });

  test('invokes `fn` with `value`, `key`, `obj`', () => {
    const value = {};
    const obj = {a: value};
    const fn = jest.fn();
    map(obj, fn);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(value);
    expect(fn.mock.calls[0][1]).toBe('a');
    expect(fn.mock.calls[0][2]).toBe(obj);
  });
});

describe('mapKeys', () => {
  test('returns a new object with keys returned by invoking `fn` for each entry in `obj`', () => {
    const obj = {a: false, b: 0, c: '', d: undefined, e: null};
    expect(mapKeys(obj, (value, key) => key)).not.toBe(obj);
    expect(mapKeys(obj, (value, key) => key)).toEqual(obj);
    expect(mapKeys(obj, value => typeof value)).toEqual({boolean: false, number: 0, string: '', undefined: undefined, object: null});
  });

  test('invokes `fn` with `value`, `key`, `obj`', () => {
    const value = {};
    const obj = {a: value};
    const fn = jest.fn();
    mapKeys(obj, fn);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(value);
    expect(fn.mock.calls[0][1]).toBe('a');
    expect(fn.mock.calls[0][2]).toBe(obj);
  });
});

describe('reduce', () => {
  test('returns the result of invoking `fn` for each entry in `obj`', () => {
    const obj = {a: 1, b: 2, c: 3, d: 4};
    expect(reduce(obj, (acc, total) => acc + total)).toBe(10);
    expect(reduce(obj, (acc, total) => acc + total, 0)).toBe(10);
    expect(reduce(obj, (acc, total) => acc * total)).toBe(24);
    expect(reduce(obj, (acc, total) => acc * total, 1)).toBe(24);
  });

  test('throws a `TypeError` if `initialValue` is not provided and `obj` is empty', () => {
    const obj = {};
    expect(() => reduce(obj, () => {})).toThrowError(TypeError);
  });

  test('does not invoke `fn` if `initialValue` is provided and `obj` is empty', () => {
    const obj = {};
    const fn = jest.fn();
    const initialValue = {};
    reduce(obj, fn, initialValue);
    expect(fn.mock.calls.length).toBe(0);
  });

  test('does not invoke `fn` if `initialValue` is not provided and `obj` has one value', () => {
    const obj = {a: 1};
    const fn = jest.fn();
    reduce(obj, fn);
    expect(fn.mock.calls.length).toBe(0);
  });

  test('invokes `fn` first with `initialValue` if provided and `obj` is not empty', () => {
    const obj = {a: 1};
    const fn = jest.fn();
    const initialValue = {};
    reduce(obj, fn, initialValue);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(initialValue);
  });

  test('invokes `fn` with a value from `obj` first if `initialValue` is not provided and `obj` has more than one value', () => {
    const obj = {a: {}, b: {}};
    const fn = jest.fn();
    reduce(obj, fn);
    expect(fn.mock.calls.length).toBe(1);
    expect(Object.values(obj)).toContain(fn.mock.calls[0][0]);
  });

  test('invokes `fn` with a value from `obj` first if `initialValue` is not provided and `obj` has more than one value', () => {
    const obj = {a: {}, b: {}};
    const fn = jest.fn();
    reduce(obj, fn);
    expect(fn.mock.calls.length).toBe(1);
    expect(Object.values(obj)).toContain(fn.mock.calls[0][0]);
  });

  test('invokes `fn` with `accumulator`, `value`, `key`, `obj`', () => {
    const value = {};
    const obj = {a: value};
    const fn = jest.fn();
    const initialValue = {};
    reduce(obj, fn, initialValue);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(initialValue);
    expect(fn.mock.calls[0][1]).toBe(value);
    expect(fn.mock.calls[0][2]).toBe('a');
    expect(fn.mock.calls[0][3]).toBe(obj);
  });
});

describe('some', () => {
  test('returns whether invoking `fn` for at least one entry in `obj` returns something truthy', () => {
    const obj = {a: false, b: 0, c: '', d: undefined, e: null};
    expect(some(obj, () => true)).toBe(true);
    expect(some(obj, () => false)).toBe(false);
    expect(some(obj, val => val)).toBe(false);
    expect(some(obj, val => !val)).toBe(true);
    expect(some(obj, val => val === 0)).toBe(true);
  });

  test('only runs `fn` until it returns something truthy', () => {
    const obj = {a: 1, b: 2, c: 3};
    const fn = jest.fn(() => true);
    some(obj, fn);
    expect(fn.mock.calls.length).toBe(1);
  });

  test('invokes `fn` with `value`, `key`, `obj`', () => {
    const value = {};
    const obj = {a: value};
    const fn = jest.fn();
    some(obj, fn);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(value);
    expect(fn.mock.calls[0][1]).toBe('a');
    expect(fn.mock.calls[0][2]).toBe(obj);
  });
});

describe('values', () => {
  test('returns an iterator object that contains the values for each entry in `obj`', () => {
    const value = {};
    const obj = {a: 1, b: 2, c: value};
    const objValues = Object.values(obj);
    const result = values(obj);
    expect(typeof result[Symbol.iterator]).toBe('function');
    for (const value of result) {
      expect(objValues).toContain(value);
    }
  });
});
