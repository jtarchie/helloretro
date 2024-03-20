/// <reference path="../pb_data/types.d.ts" />

routerAdd("GET", "/retros/new", (context) => {
  const collection = $app.dao().findCollectionByNameOrId("boards");

  const record = new Record(collection, {
    archived: false,
  });

  $app.dao().saveRecord(record);

  return context.redirect(302, `/retros/${record.get("id")}`);
});

routerAdd("GET", "/retros/:id/markdown", (context) => {
  const id = context.pathParam("id");

  const record = $app.dao().findRecordById("boards", id);

  const date = record.getDateTime("created").time().format("2006-01-02");
  const markdown = [`# ${date}`];

  const items = $app.dao().findRecordsByFilter("items", `board_id = '${id}'`);

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
      markdown.push(`- ${item.get("description")}`);
    });
  });

  const markdownText = markdown.join("\n");

  context.response().header().set(
    "Content-Disposition",
    `attachment; filename="retrospective-${date}.md"`,
  );
  context.response().header().set(
    "Content-Type",
    "text/markdown; charset=utf-8",
  );

  return context.string(200, markdownText);
});
