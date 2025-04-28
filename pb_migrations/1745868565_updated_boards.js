/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("dv9dz4t5add38hy");

  // update collection data
  unmarshal({
    "deleteRule": '@request.auth.id = created_by.id || created_by = ""',
    "listRule": "@request.auth.id = created_by.id",
    "updateRule": '@request.auth.id = created_by.id || created_by = ""',
  }, collection);

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("dv9dz4t5add38hy");

  // update collection data
  unmarshal({
    "deleteRule": "",
    "listRule": null,
    "updateRule": null,
  }, collection);

  return app.save(collection);
});
