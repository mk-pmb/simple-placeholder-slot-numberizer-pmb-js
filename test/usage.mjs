// -*- coding: utf-8, tab-width: 2 -*-

import test from 'p-tape';

import makeNumberizer from '../psn.mjs';


function map2obj(m) { return Object.fromEntries(m.entries()); }


test('Flags database, traditional', (t) => {
  t.plan(3);
  const numb = makeNumberizer();
  const query = ('SELECT * FROM "flags"'
    + ' WHERE "flags"."pattern" = ' + numb('striped')
    + '   AND "flags"."color_top" = ' + numb('white')
    + '   AND "flags"."color_middle" = ' + numb('red')
    + '   AND "flags"."color_bottom" = ' + numb('white')
    + ' LIMIT 1;');
  t.equal(query, 'SELECT * FROM "flags"'
    + ' WHERE "flags"."pattern" = $1'
    + '   AND "flags"."color_top" = $2'
    + '   AND "flags"."color_middle" = $3'
    + '   AND "flags"."color_bottom" = $2'
    + ' LIMIT 1;');
  t.same(numb.values, ['striped', 'white', 'red']);
  t.same(map2obj(numb.dict), {
    striped: { i: 0, s: '$1' },
    white: { i: 1, s: '$2' },
    red: { i: 2, s: '$3' },
  });
});


test('Flags database, tagged string', (t) => {
  t.plan(3);
  const numb = makeNumberizer();
  const query = numb.tag`SELECT * FROM "flags"
    WHERE "flags"."pattern" = ${'striped'}
      AND "flags"."color_top" = ${'white'}
      AND "flags"."color_middle" = ${'red'}
      AND "flags"."color_bottom" = ${'white'}
    LIMIT 1;`;
  t.equal(query, 'SELECT * FROM "flags"'
    + '\n    WHERE "flags"."pattern" = $1'
    + '\n      AND "flags"."color_top" = $2'
    + '\n      AND "flags"."color_middle" = $3'
    + '\n      AND "flags"."color_bottom" = $2'
    + '\n    LIMIT 1;');
  t.same(numb.values, ['striped', 'white', 'red']);
  t.same(map2obj(numb.dict), {
    striped: { i: 0, s: '$1' },
    white: { i: 1, s: '$2' },
    red: { i: 2, s: '$3' },
  });
});













console.info('+OK usage test passed.');
