/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("dv9dz4t5add38hy");

  // remove votes_hidden field
  collection.fields.removeById("votes_hidden");

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("dv9dz4t5add38hy");

  // add back votes_hidden field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "votes_hidden",
    "name": "votes_hidden",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }));

  return app.save(collection);
});