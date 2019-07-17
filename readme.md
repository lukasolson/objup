# objup

The array prototype is filled with useful methods like `filter`, `map`, and `reduce`. These methods are also useful for objects. This module aims to provide these methods for objects with an API analogous to their array counterparts.

## API

```javascript
entries(obj)
```

Returns an iterator object that contains the key/value pairs for each entry in `obj`.

---

```javascript
every(obj, fn)
```

Returns `true` if invoking `fn` for every entry in `obj` returns something truthy. Otherwise, returns `false`. `fn` is invoked with three arguments: `value`, `key`, `obj`.

---

```javascript
filter(obj, fn)
```

Returns a new object containing each entry in `obj` for which invoking `fn` returns something truthy. `fn` is invoked with three arguments: `value`, `key`, `obj`.

---

```javascript
find(obj, fn)
```

Returns the value of the first entry in `obj` for which invoking `fn` returns something truthy. If none do, returns `undefined`. `fn` is invoked with three arguments: `value`, `key`, `obj`.

---

```javascript
findKey(obj, fn)
```

Returns the key of the first entry in `obj` for which invoking `fn` returns something truthy. If none do, returns `undefined`. `fn` is invoked with three arguments: `value`, `key`, `obj`.

---

```javascript
forEach(obj, fn)
```

Invokes `fn` for each entry in `obj` with three arguments: `value`, `key`, `obj`.

---

```javascript
includes(obj, value)
```

Returns `true` if `value` is one of the values in `obj`. Otherwise, returns `false`.

---

```javascript
keyOf(obj, value)
```

Returns the key of the first entry in `obj` that has a value of `value`. If none do, returns `undefined`.

---

```javascript
keys(obj)
```

Returns an iterator object that contains the keys for each entry in `obj`.

---

```javascript
map(obj, fn)
```

Returns a new object with values returned by invoking `fn` for each entry in `obj`. `fn` is invoked with three arguments: `value`, `key`, `obj`.

---

```javascript
mapKeys(obj, fn)
```

Returns a new object with keys returned by invoking `fn` for each entry in `obj`. `fn` is invoked with three arguments: `value`, `key`, `obj`.

---

```javascript
reduce(obj, fn, initialValue)
```

Returns the result of invoking `fn` for each entry in `obj`. `fn` is invoked with four arguments: `accumulator`, `value`, `key`, `obj`. If `initialValue` is not supplied, the first value will be used as `accumulator`.

---

```javascript
some(obj, fn)
```

Returns `true` if invoking `fn` for at least one entry in `obj` returns something truthy. Otherwise, returns `false`. `fn` is invoked with three arguments: `value`, `key`, `obj`.

---

```javascript
values(obj)
```

Returns an iterator object that contains the values for each entry in `obj`.
