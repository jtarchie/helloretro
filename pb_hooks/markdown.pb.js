/// <reference path="../pb_data/types.d.ts" />

routerAdd("GET", "/retros/{id}/markdown", (event) => {
  const id = event.request.pathValue("id");

  const record = event.app.findRecordById("boards", id);

  const date = record.getDateTime("created").time().format("2006-01-02");
  const markdown = [`# ${date}`];

  const items = event.app.findRecordsByFilter("items", `board_id = '${id}'`);

  const itemsByCategory = {};
  items.forEach((item) => {
    const category = item.get("category");
    if (!itemsByCategory[category]) {
      itemsByCategory[category] = [];
    }
    itemsByCategory[category].push(item);
  });

  Object.keys(itemsByCategory).forEach((category) => {
    markdown.push(`\n## ${category}`);
    itemsByCategory[category].forEach((item) => {
      markdown.push(
        `- [${item.get("completed") ? "x" : " "}]${
          item.get("votes") == 0 ? "" : ` (${item.get("votes")}❤️)`
        } ${item.get("description").replace(/(\r\n|\n|\r)/gm, " ")}`,
      );
    });
  });

  const markdownText = markdown.join("\n");

  event.response.header().set(
    "Content-Disposition",
    `attachment; filename="retrospective-${date}.md"`,
  );
  event.response.header().set(
    "Content-Type",
    "text/markdown; charset=utf-8",
  );

  return event.string(200, markdownText);
});
