/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("iw25ffex4g59v9n");

  // add
  collection.schema.addField(
    new SchemaField({
      "system": false,
      "id": "xdkba4df",
      "name": "active",
      "type": "date",
      "required": false,
      "presentable": false,
      "unique": false,
      "options": {
        "min": "",
        "max": "",
      },
    }),
  );

  return dao.saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("iw25ffex4g59v9n");

  // remove
  collection.schema.removeField("xdkba4df");

  return dao.saveCollection(collection);
});
