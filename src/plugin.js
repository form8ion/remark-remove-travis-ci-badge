import remove from '../thirdparty-wrappers/unist-util-remove';
import visit from '../thirdparty-wrappers/unist-util-visit';
import createBadgePredicate from './badge-predicate';
import createReferencedBadgePredicate from './referenced-badge-predicate';
import mergeNewlines from './merge-newlines-in-paragraph';

export default function () {
  return function transformer(tree) {
    remove(tree, createBadgePredicate(tree));
    remove(tree, createReferencedBadgePredicate(tree));
    remove(tree, {type: 'definition', identifier: 'ci-badge'});
    remove(tree, {type: 'definition', identifier: 'ci-link'});
    visit(tree, {type: 'text', value: '\n'}, mergeNewlines);
  };
}
