import { removeStartOrEndCharFn } from 'common/helpers';

const LINE_BREAK = '\n';
const CSV_COLUMN_BREAK = ',';

const removeWrappedDoubleQuote = removeStartOrEndCharFn('"');

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
    .map(link => [link.title, link.url, link.favIconUrl]
      .map(wrapWithDoubleQuotes)
      .join(CSV_COLUMN_BREAK))
    .join(LINE_BREAK)
);

// When split, choose the pattern '","' but not ',', to avoid comma inside text,
// and then just remove the possibly wrapped double quotes
export const importLinksFromCsv = (csvText) => {
  try {
    return csvText.split(LINE_BREAK).map((line) => {
      const [title, url, favIconUrl] = line
        .split(`"${CSV_COLUMN_BREAK}"`)
        .map(field => removeWrappedDoubleQuote(field));
      return { title, url, favIconUrl };
    });
  } catch (err) {
    return null;
  }
};
