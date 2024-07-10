/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("dv9dz4t5add38hy");

  collection.deleteRule = "";

  return dao.saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("dv9dz4t5add38hy");

  collection.deleteRule = null;

  return dao.saveCollection(collection);
});
