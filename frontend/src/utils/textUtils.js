export const getSplitTitle = (title) => {
  if (!title) return { before: 'ARCHITECTING', highlighted: 'DISTRIBUTED', after: 'SYSTEMS.' };
  const words = title.split(' ').filter(Boolean);
  const len = words.length;
  if (len < 3) return { before: words[0] || '', highlighted: words[1] || '', after: '' };
  
  const midIndex = Math.floor(len / 2);
  const startHighlight = len % 2 === 0 ? midIndex - 1 : midIndex;
  const highlightCount = len % 2 === 0 ? 2 : 1;
  
  return {
    before: words.slice(0, startHighlight).join(' '),
    highlighted: words.slice(startHighlight, startHighlight + highlightCount).join(' '),
    after: words.slice(startHighlight + highlightCount).join(' ')
  };
};
