import {Before, Given, Then} from '@cucumber/cucumber';
import {assert} from 'chai';
import any from '@travi/any';

let otherBadges, otherDefinitions;

const normalLink = `[${any.word()}](${any.url()})`;
const imageReference = any.word();
const linkReference = any.word();
const inlineCiBadge = `[![BuildStatus](https://img.shields.io/travis/com/${any.word()}/${any.word()
}/master.svg)](https://travis-ci.com/${any.word()}/${any.word()})`;
const ciBadgeWithReferencedDefinitions = '[![Build Status][ci-badge]][ci-link]';
const otherInlineBadge = `[![${any.word()}](${any.url()})](${any.url()})`;
const anotherInlineBadge = `[![${any.word()}](${any.url()})](${any.url()})`;
const otherBadgeWithReferencedDefinitions = `[![${any.word()}][${imageReference}]][${linkReference}]`;
const anotherBadgeWithReferencedDefinitions = `[![${any.word()}][${imageReference}]][${linkReference}]`;
const otherBadgeDefinitions = `[${imageReference}]: ${any.url()}

[${linkReference}]: ${any.url()}`;
const anotherSetOfBadgeDefinitions = `[${imageReference}]: ${any.url()}

[${linkReference}]: ${any.url()}`;

Before(function () {
  this.badgeGroup = [];
  this.badgeDefinitions = [];
  this.normalLink = normalLink;

  otherBadges = [];
  otherDefinitions = [];
});

Given('an inline travis-ci badge exists', async function () {
  this.badgeGroup.push(inlineCiBadge);
});

Given('a travis-ci badge exists with referenced definitions', async function () {
  this.badgeGroup.push(ciBadgeWithReferencedDefinitions);

  this.badgeDefinitions.push(
    `[ci-link]: https://travis-ci.com/${any.word()}/${any.word()}`,
    `[ci-badge]: https://img.shields.io/travis/com/${any.word()}/${any.word()}/master.svg`
  );
});

Given('other inline badges exist', async function () {
  this.badgeGroup.unshift(anotherInlineBadge);
  this.badgeGroup.push(otherInlineBadge);
  otherBadges.push(anotherInlineBadge);
  otherBadges.push(otherInlineBadge);
});

Given('other badges exist with referenced definitions', async function () {
  this.badgeGroup.unshift(anotherBadgeWithReferencedDefinitions);
  this.badgeGroup.push(otherBadgeWithReferencedDefinitions);
  otherBadges.push(anotherBadgeWithReferencedDefinitions);
  otherBadges.push(otherBadgeWithReferencedDefinitions);

  this.badgeDefinitions.push(otherBadgeDefinitions);
  this.badgeDefinitions.push(anotherSetOfBadgeDefinitions);
  otherDefinitions.push(otherBadgeDefinitions);
  otherDefinitions.push(anotherSetOfBadgeDefinitions);
});

Then('the travis-ci badge is removed from the README', async function () {
  assert.equal(
    this.resultingContent,
    `# some-project${otherBadges.length ? `

${otherBadges.join('\n')}
` : `
`}
${normalLink}${otherDefinitions.length ? `

${otherDefinitions.join('\n\n')}` : ''}
`
  );
});
