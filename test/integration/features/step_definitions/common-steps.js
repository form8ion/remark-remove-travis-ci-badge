import {When} from '@cucumber/cucumber';
import remark from 'remark';
import remarkRemoveTravisCiBadge from '../../../../lib/index.cjs';

When('a node is processed', async function () {
  remark()
    .use(remarkRemoveTravisCiBadge)
    .process(this.existingContent, (err, file) => {
      if (err) throw err;

      this.resultingContent = file.contents;
    });
});
