/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("dv9dz4t5add38hy");

  // add field
  collection.fields.addAt(
    2,
    new Field({
      "cascadeDelete": false,
      "collectionId": "_pb_users_auth_",
      "hidden": false,
      "id": "relation3725765462",
      "maxSelect": 1,
      "minSelect": 0,
      "name": "created_by",
      "presentable": false,
      "required": false,
      "system": false,
      "type": "relation",
    }),
  );

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("dv9dz4t5add38hy");

  // remove field
  collection.fields.removeById("relation3725765462");

  return app.save(collection);
});
