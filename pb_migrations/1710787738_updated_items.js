/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("iw25ffex4g59v9n");

  collection.listRule = "";

  return dao.saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("iw25ffex4g59v9n");

  collection.listRule = null;

  return dao.saveCollection(collection);
});
