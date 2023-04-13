import {afterEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import * as remove from '../thirdparty-wrappers/unist-util-remove';
import * as visit from '../thirdparty-wrappers/unist-util-visit';
import mergeNewlines from './merge-newlines-in-paragraph';
import * as badgePredicateFactory from './badge-predicate';
import * as referencedBadgePredicateFactory from './referenced-badge-predicate';
import plugin from './plugin';

vi.mock('../thirdparty-wrappers/unist-util-remove');
vi.mock('./badge-predicate');
vi.mock('./referenced-badge-predicate');
vi.mock('../thirdparty-wrappers/unist-util-visit');

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

    expect(remove.default).toHaveBeenCalledWith(tree, {type: 'definition', identifier: 'ci-badge'});
    expect(remove.default).toHaveBeenCalledWith(tree, {type: 'definition', identifier: 'ci-link'});
    expect(remove.default).toHaveBeenCalledWith(tree, badgePredicate);
    expect(remove.default).toHaveBeenCalledWith(tree, referencedBadgePredicate);
    expect(visit.default).toHaveBeenCalledWith(tree, {type: 'text', value: '\n'}, mergeNewlines);
  });
});
