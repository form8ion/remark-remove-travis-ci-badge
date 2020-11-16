import {assert} from 'chai';
import any from '@travi/any';
import sinon from 'sinon';
import * as definitions from '../thirdparty-wrappers/mdast-util-definitions';
import createReferencedBadgePredicate from './referenced-badge-predicate';
// import {GREENKEEPER_URL} from './constants';

suite('badge with referenced definitions', () => {
  let sandbox;
  const tree = any.simpleObject();
  const nodeIdentifier = any.word();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(definitions, 'default');
  });

  teardown(() => sandbox.restore());

  test('that `false` is returned if the `type` is not `linkReference`', () => {
    assert.isFalse(createReferencedBadgePredicate(tree)(any.simpleObject()));
  });

  test('that `false` is returned if the `linkReference` is not the travis badge', () => {
    const getDefinitionByIdentifier = sinon.stub();
    definitions.default.withArgs(tree).returns(getDefinitionByIdentifier);
    getDefinitionByIdentifier.withArgs(nodeIdentifier).returns(any.simpleObject());

    assert.isFalse(
      createReferencedBadgePredicate(tree)({
        ...any.simpleObject(),
        type: 'linkReference',
        identifier: nodeIdentifier
      })
    );
  });

  test('that `true` is returned when the `linkReference` is the travis badge', () => {
    const getDefinitionByIdentifier = sinon.stub();
    definitions.default.withArgs(tree).returns(getDefinitionByIdentifier);
    getDefinitionByIdentifier
      .withArgs(nodeIdentifier)
      .returns({...any.simpleObject(), url: `https://travis-ci.com/${any.word}/${any.word}`});

    assert.isTrue(
      createReferencedBadgePredicate(tree)({
        ...any.simpleObject(),
        type: 'linkReference',
        identifier: nodeIdentifier
      })
    );
  });
});
