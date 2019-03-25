const LINE_BREAK = '\n';

export const exportLinksAsUrls = links => (
  links.map(link => link.url).join(LINE_BREAK)
);

export const exportLinksAsMarkdown = links => (
  links.map(link => `* [${link.title}](${link.url})`).join(LINE_BREAK)
);

const wrapWithDoubleQuotes = text => `"${text}"`;

// Wrap text with double quotes so that the inner comma won't break lines.
export const exportLinksAsCsv = links => (
  links
    .map(link => [link.title, link.url, link.favIconUrl].map(wrapWithDoubleQuotes).join(','))
    .join(LINE_BREAK)
);
