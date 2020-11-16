import {assert} from 'chai';
import any from '@travi/any';
import sinon from 'sinon';
import * as remove from '../thirdparty-wrappers/unist-util-remove';
import * as visit from '../thirdparty-wrappers/unist-util-visit';
import * as badgePredicateFactory from './badge-predicate';
import * as referencedBadgePredicateFactory from './referenced-badge-predicate';
import mergeNewlines from './merge-newlines-in-paragraph';
import plugin from './plugin';

suite('plugin', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(remove, 'default');
    sandbox.stub(badgePredicateFactory, 'default');
    sandbox.stub(referencedBadgePredicateFactory, 'default');
    sandbox.stub(visit, 'default');
  });

  teardown(() => sandbox.restore());

  test('that a ci badge is removed, whether inline or referenced', () => {
    const tree = any.simpleObject();
    const badgePredicate = sinon.spy();
    const referencedBadgePredicate = sinon.spy();
    badgePredicateFactory.default.withArgs(tree).returns(badgePredicate);
    referencedBadgePredicateFactory.default.withArgs(tree).returns(referencedBadgePredicate);

    plugin()(tree);

    assert.calledWith(remove.default, tree, {type: 'definition', identifier: 'ci-badge'});
    assert.calledWith(remove.default, tree, {type: 'definition', identifier: 'ci-link'});
    assert.calledWith(remove.default, tree, badgePredicate);
    assert.calledWith(remove.default, tree, referencedBadgePredicate);
    assert.calledWith(visit.default, tree, {type: 'text', value: '\n'}, mergeNewlines);
  });
});
