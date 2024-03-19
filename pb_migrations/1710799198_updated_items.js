/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("iw25ffex4g59v9n");

  collection.createRule = "";
  collection.updateRule = "";
  collection.deleteRule = "";

  return dao.saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("iw25ffex4g59v9n");

  collection.createRule = null;
  collection.updateRule = null;
  collection.deleteRule = null;

  return dao.saveCollection(collection);
});
