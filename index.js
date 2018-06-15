function every(obj, fn) {
  return Object.keys(obj).every(key => fn(obj[key], key, obj));
}

function filter(obj, fn) {
  return Object.keys(obj).reduce((accumulator, key) => {
    if (!fn(obj[key], key, obj)) return accumulator;
    return {...accumulator, [key]: obj[key]};
  }, {});
}

function find(obj, fn) {
  const key = findKey(obj, fn);
  if (typeof key !== 'undefined') return obj[key];
}

function findKey(obj, fn) {
  return Object.keys(obj).find(key => fn(obj[key], key, obj));
}

function forEach(obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));
}

function includes(obj, value) {
  return Object.values(obj).includes(value);
}

function join(obj, separator = ',') {
  return Object.values(obj).join(separator);
}

function keyOf(obj, value) {
  return Object.keys(obj).find(key => obj[key] === value);
}

function map(obj, fn) {
  return Object.keys(obj).reduce((accumulator, key) => {
    const value = fn(obj[key], key, obj);
    return {...accumulator, [key]: value};
  }, {});
}

function reduce(obj, fn, ...args) {
  const entries = Object.entries(obj);
  const keys = entries.map(([key, value]) => key);
  const values = entries.map(([key, value]) => value);
  return values.reduce((accumulator, value, i) => {
    return fn(accumulator, value, keys[i], obj)
  }, ...args);
}

function some(obj, fn) {
  return Object.keys(obj).some(key => fn(obj[key], key, obj));
}

module.exports = {every, filter, find, findKey, forEach, includes, join, keyOf, map, reduce, some};
