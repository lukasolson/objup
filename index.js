function* entries(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) yield [key, obj[key]];
  }
}

function every(obj, fn) {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    if (!fn(obj[key], key, obj)) return false;
  }
  return true;
}

function filter(obj, fn) {
  const result = {};
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    if (fn(obj[key], key, obj)) result[key] = obj[key];
  }
  return result;
}

function find(obj, fn) {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    if (fn(obj[key], key, obj)) return obj[key];
  }
}

function findKey(obj, fn) {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    if (fn(obj[key], key, obj)) return key;
  }
}

function flat(obj, depth = 1) {
  const result = {};
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    if (depth <= 0 || typeof obj[key] !== 'object' || obj[key] === null) {
      result[key] = obj[key];
    } else {
      Object.assign(result, flat(obj[key], depth - 1));
    }
  }
  return result;
}

function flatMap(obj, fn) {
  const result = {};
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    const value = fn(obj[key], key, obj);
    if (typeof value !== 'object' || value === null) {
      result[key] = value;
    } else {
      Object.assign(result, value);
    }
  }
  return result;
}

function forEach(obj, fn) {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    fn(obj[key], key, obj);
  }
}

function includes(obj, value) {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    if (obj[key] === value) return true;
  }
  return false;
}

function keyOf(obj, value) {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    if (obj[key] === value) return key;
  }
}

function* keys(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) yield key;
  }
}

function map(obj, fn) {
  const result = {};
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    result[key] = fn(obj[key], key, obj);
  }
  return result;
}

function mapKeys(obj, fn) {
  const result = {};
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    result[fn(obj[key], key, obj)] = obj[key];
  }
  return result;
}

function reduce(obj, fn, ...args) {
  const noInitialValue = {};
  let accumulator = args.length > 0 ? args[0] : noInitialValue;
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    accumulator = accumulator === noInitialValue ? obj[key] : fn(accumulator, obj[key], key, obj);
  }
  if (accumulator === noInitialValue) throw TypeError('Reduce of empty object with no initial value');
  return accumulator;
}

function some(obj, fn) {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    if (fn(obj[key], key, obj)) return true;
  }
  return false;
}

function* values(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) yield obj[key];
  }
}

module.exports = {entries, every, filter, find, findKey, flat, flatMap, forEach, includes, keyOf, keys, map, mapKeys, reduce, some, values};
