
<!--#echo json="package.json" key="name" underline="=" -->
simple-placeholder-slot-numberizer-pmb
======================================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Assign number-counting string placeholders for values, remembering the ones
already seen.
<!--/#echo -->



API
---

This module exports one function:

### makeNumberizer(opt)

Return a function `numb(x)` that will assign distinct numbers for each
distinct `x` and return a string based on that number.

`opt` is an optional options object that supports these optional keys:

* `pattern`:
  An array of string parts that will be glued together with the counter number.
  Default: `['$', '']`
* `values`:
  An `Array` used for determining the internal next number,
  and collecting the encountered `x` values in order of discovery.
  Default: a new empty `Array`.
* `offset`:
  Number added to the `values` array index in order to obtain the
  pattern-printed slot number.
  Default: `1`
* `dict`:
  A `Map` that maps discovered `x` values to an object with these keys
  `i` (index in the `values` array)
  and `s` (the string resulting from applying `pattern`).
  Default: new empty `Map`.


The `numb` function will carry all the keys that are supported in `opt`,
and modifying them will modify behavior for future encounters.



Bonus knowledge
---------------

* For arbitrarily fancy render functions, make `pattern` an object that has
  a `join` method. It will be invoked with one single argument,
  a number primitive.
* The default `pattern` with default `offset` is useful for…
  * up to 9 JS RegExp capture groups.
  * up to 9 bash function arguments.
    (`bash -c 'f() { echo "a$42z"; }; f b{1..100}y'` &rarr; `ab4y2z`)
    * If you want more, use `pattern: ['${', '}']`
      (`bash -c 'f() { echo "a${42}z"; }; f b{1..100}y'` &rarr; `ab42yz`)
  * [PostgreSQL positional parameters][pgposparam] up to more than 32k
    (haven't tested though).
    * However, function arguments are limited to 100.
      [You can use arrays though.][pgfunc100]


  [pgposparam]: https://www.postgresql.org/docs/current/sql-expressions.html#SQL-EXPRESSIONS-PARAMETERS-POSITIONAL
  [pgfunc100]: https://stackoverflow.com/questions/17421265/



Usage
-----

See [test/usage.mjs](test/usage.mjs).



<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
