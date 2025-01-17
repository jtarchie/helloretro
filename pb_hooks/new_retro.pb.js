/// <reference path="../pb_data/types.d.ts" />

routerAdd("GET", "/retros/new", (event) => {
  const collection = $app.findCollectionByNameOrId("boards");

  const record = new Record(collection, {
    archived: false,
  });

  $app.save(record);

  return event.redirect(302, `/retros/${record.get("id")}`);
});
