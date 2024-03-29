import {When} from '@cucumber/cucumber';
import {remark} from 'remark';
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
import remarkRemoveTravisCiBadge from 'remark-remove-travis-ci-badge';

When('a node is processed', async function () {
  const existingContent = `# some-project

${this.badgeGroup.join('\n')}

${this.normalLink}${this.badgeDefinitions.length ? `

${this.badgeDefinitions.join('\n\n')}` : ''}
`;

  this.resultingContent = await remark()
    .use(remarkRemoveTravisCiBadge)
    .process(existingContent);
});
