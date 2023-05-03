// -*- coding: utf-8, tab-width: 2 -*-

import func2tag from 'func2tag';


function numberize(f, x) {
  const known = f.dict.get(x);
  if (known) { return known.s; }
  const v = f.values;
  const i = v.length;
  v[i] = x;
  const s = f.pattern.join(i + f.offset);
  f.dict.set(x, { i, s });
  return s;
}


const EX = function makeNumberizer(opt) {
  if (!opt) { return EX(true); }
  const f = function numb(x) { return numberize(numb, x); };
  f.tag = func2tag(f);
  f.pattern = (opt.pattern || ['$', '']);
  f.offset = (+opt.offset || 1);
  f.values = (opt.values || []);
  f.dict = (opt.dict || new Map());
  return f;
};


export default EX;
