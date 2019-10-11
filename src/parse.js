const HTML = require('html-parse-stringify2');


export function parse(str) {
  const ast = HTML.parse(`<dummyI18nTag>${str}</dummyI18nTag>`, { ignoreCollapse: true });
  extendVueI18nSugar(ast);
  // console.warn(JSON.stringify(ast, null, 2));
  return ast[0].children || [];
}

const REGEXP = new RegExp('(\{[^\}]+\}|\\%\{[^\}]+\}|@:[^\ ]+)', 'g');

function extendVueI18nSugar(ast) {

  function updateChildren(children) {
    if (!children) return;

    children.forEach(child => {
      if (child.type === 'text') {
        if (child.content.indexOf('{') > -1 || child.content.indexOf('${') > -1  || child.content.indexOf('@:') > -1) {
          const splitted = child.content.split(REGEXP);
          const newChildren = splitted.length > 1 ? child.content.split(REGEXP).reduce((mem, match, index) => {
            // console.warn(mem, match, index);
            if (index % 2 === 0) {
              mem.push({ type: 'text', content: match });
            } else {
              if (match.indexOf('{') === 0) {
                const content = match.substring(1, match.length - 1);
                mem.push({ type: 'format', raw: match, prefix: '{', suffix: '}', content, variable: content.trim() })
              } else if (match.indexOf('%{') === 0) {
                const content = match.substring(2, match.length - 1);
                mem.push({ type: 'format', raw: match, prefix: '%{', suffix: '}', content, variable: content.trim() })
              } else if (match.indexOf('@:') === 0) {
               const content = match.substring(2, match.length);
               mem.push({ type: 'link', raw: match, prefix: '@:', suffix: '', content, variable: content.trim() })
             }
            }
            return mem;
          }, []) : [];
          // console.warn(JSON.stringify(newChildren, null, 2));
          child.children = newChildren;
        }
      }

      if (child.children) updateChildren(child.children);
    });
  }

  updateChildren(ast);

  return ast;
}
