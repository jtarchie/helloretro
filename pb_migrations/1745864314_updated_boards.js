/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("dv9dz4t5add38hy");

  // update collection data
  unmarshal({
    "createRule": "",
    "viewRule": "",
  }, collection);

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("dv9dz4t5add38hy");

  // update collection data
  unmarshal({
    "createRule": null,
    "viewRule": null,
  }, collection);

  return app.save(collection);
});
