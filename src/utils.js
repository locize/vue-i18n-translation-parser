export function astStats(ast) {
  // console.warn(JSON.stringify(ast, null, 2))
  const stats = {
    format: 0,
    link: 0,
    tags: 0
  }

  function process(children) {
    if (!children) return;

    children.forEach(child => {
      if (child.type === 'tag') stats.tags++;
      if (child.type === 'format') stats.format++;
      if (child.type === 'link') stats.link++;

      if (child.children) process(child.children);
    });
  }

  process(ast);
  // console.warn(stats);
  return stats;
}
