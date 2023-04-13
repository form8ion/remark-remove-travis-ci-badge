import {remove} from 'unist-util-remove';
import {visit} from 'unist-util-visit';

import {afterEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import mergeNewlines from './merge-newlines-in-paragraph.js';
import * as badgePredicateFactory from './badge-predicate.js';
import * as referencedBadgePredicateFactory from './referenced-badge-predicate.js';
import plugin from './plugin.js';

vi.mock('unist-util-remove');
vi.mock('unist-util-visit');
vi.mock('./badge-predicate');
vi.mock('./referenced-badge-predicate');

describe('plugin', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should remove a ci badge, whether inline or referenced', () => {
    const tree = any.simpleObject();
    const badgePredicate = vi.fn();
    const referencedBadgePredicate = vi.fn();
    when(badgePredicateFactory.default).calledWith(tree).mockReturnValue(badgePredicate);
    when(referencedBadgePredicateFactory.default).calledWith(tree).mockReturnValue(referencedBadgePredicate);

    plugin()(tree);

    expect(remove).toHaveBeenCalledWith(tree, {type: 'definition', identifier: 'ci-badge'});
    expect(remove).toHaveBeenCalledWith(tree, {type: 'definition', identifier: 'ci-link'});
    expect(remove).toHaveBeenCalledWith(tree, badgePredicate);
    expect(remove).toHaveBeenCalledWith(tree, referencedBadgePredicate);
    expect(visit).toHaveBeenCalledWith(tree, {type: 'text', value: '\n'}, mergeNewlines);
  });
});
