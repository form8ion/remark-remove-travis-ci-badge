import {remove} from 'unist-util-remove';
import {visit} from 'unist-util-visit';

import createBadgePredicate from './badge-predicate.js';
import createReferencedBadgePredicate from './referenced-badge-predicate.js';
import mergeNewlines from './merge-newlines-in-paragraph.js';

export default function () {
  return function transformer(tree) {
    remove(tree, createBadgePredicate(tree));
    remove(tree, createReferencedBadgePredicate(tree));
    remove(tree, {type: 'definition', identifier: 'ci-badge'});
    remove(tree, {type: 'definition', identifier: 'ci-link'});
    visit(tree, {type: 'text', value: '\n'}, mergeNewlines);
  };
}
