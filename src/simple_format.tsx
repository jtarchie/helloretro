import { marked } from "marked";

function SimpleFormat({ text, classes }: { text: string; classes: string }) {
  const html = marked.parse(text, { async: false });
  return <div class={classes} dangerouslySetInnerHTML={{ __html: html }}></div>;
}

export { SimpleFormat };
