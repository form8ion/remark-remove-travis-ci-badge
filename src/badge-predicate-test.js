import {assert} from 'chai';
import any from '@travi/any';
import createBadgePredicate from './badge-predicate';

suite('badge predicate', () => {
  const tree = any.simpleObject();

  test('that `false` is returned if the `type` is not `link`', () => {
    assert.isFalse(createBadgePredicate(tree)(any.simpleObject()));
  });

  test('that `false` is returned if the `link` is not the travis badge', () => {
    assert.isFalse(
      createBadgePredicate(tree)({
        ...any.simpleObject(),
        type: 'link',
        url: any.string()
      })
    );
  });

  test('that `true` is returned when the `linkReference` is the travis badge', () => {
    assert.isTrue(
      createBadgePredicate(tree)({
        ...any.simpleObject(),
        type: 'link',
        url: `https://travis-ci.com/${any.word}/${any.word}`
      })
    );
  });
});
