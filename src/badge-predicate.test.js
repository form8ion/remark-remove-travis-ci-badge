import {describe, expect, it} from 'vitest';
import any from '@travi/any';

import createBadgePredicate from './badge-predicate.js';

describe('badge predicate', () => {
  const tree = any.simpleObject();

  it('should return `false` if the `type` is not `link`', () => {
    expect(createBadgePredicate(tree)(any.simpleObject())).toBe(false);
  });

  it('should return `false` if the `link` is not the travis badge', () => {
    expect(createBadgePredicate(tree)({
      ...any.simpleObject(),
      type: 'link',
      url: any.string()
    })).toBe(false);
  });

  it('should return `true` when the `linkReference` is the travis badge', () => {
    expect(createBadgePredicate(tree)({
      ...any.simpleObject(),
      type: 'link',
      url: `https://travis-ci.com/${any.word}/${any.word}`
    })).toBe(true);
  });
});
