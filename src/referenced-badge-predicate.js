import definitions from '../thirdparty-wrappers/mdast-util-definitions';

export default function (tree) {
  const getDefinitionByIdentifier = definitions(tree);

  return node => {
    if ('linkReference' === node.type) {
      const definition = getDefinitionByIdentifier(node.identifier);

      return !!definition.url && definition.url.startsWith('https://travis-ci.com');
    }

    return false;
  };
}
