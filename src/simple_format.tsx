import { full as emoji } from "markdown-it-emoji";
import markdownit from "markdown-it";

const md = markdownit().use(emoji);

function SimpleFormat({ text, classes }: { text: string; classes: string }) {
  const html = md.render(text);
  return <div class={classes} dangerouslySetInnerHTML={{ __html: html }}></div>;
}

export { SimpleFormat };
