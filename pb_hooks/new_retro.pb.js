/// <reference path="../pb_data/types.d.ts" />

routerAdd("GET", "/retros/new", (context) => {
  const collection = $app.dao().findCollectionByNameOrId("boards");

  const record = new Record(collection, {
    archived: false,
  });

  $app.dao().saveRecord(record);

  return context.redirect(302, `/retros/${record.get("id")}`);
});