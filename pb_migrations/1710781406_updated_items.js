/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("iw25ffex4g59v9n");

  // update
  collection.schema.addField(
    new SchemaField({
      "system": false,
      "id": "swjczdxn",
      "name": "board_id",
      "type": "relation",
      "required": true,
      "presentable": false,
      "unique": false,
      "options": {
        "collectionId": "dv9dz4t5add38hy",
        "cascadeDelete": true,
        "minSelect": null,
        "maxSelect": 1,
        "displayFields": null,
      },
    }),
  );

  return dao.saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("iw25ffex4g59v9n");

  // update
  collection.schema.addField(
    new SchemaField({
      "system": false,
      "id": "swjczdxn",
      "name": "board_id",
      "type": "relation",
      "required": false,
      "presentable": false,
      "unique": false,
      "options": {
        "collectionId": "dv9dz4t5add38hy",
        "cascadeDelete": false,
        "minSelect": null,
        "maxSelect": 1,
        "displayFields": null,
      },
    }),
  );

  return dao.saveCollection(collection);
});
