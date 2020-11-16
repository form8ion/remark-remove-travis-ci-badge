export default function () {
  return node => 'link' === node.type && node.url.startsWith('https://travis-ci.com');
}
