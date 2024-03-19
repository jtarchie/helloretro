/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("iw25ffex4g59v9n");

  collection.indexes = [
    "CREATE INDEX `idx_cWfSoXR` ON `items` (\n  `board_id`,\n  `column`\n)",
  ];

  // add
  collection.schema.addField(
    new SchemaField({
      "system": false,
      "id": "dvfg4hs0",
      "name": "column",
      "type": "text",
      "required": true,
      "presentable": false,
      "unique": false,
      "options": {
        "min": null,
        "max": null,
        "pattern": "",
      },
    }),
  );

  return dao.saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("iw25ffex4g59v9n");

  collection.indexes = [];

  // remove
  collection.schema.removeField("dvfg4hs0");

  return dao.saveCollection(collection);
});
