/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "dv9dz4t5add38hy",
    "created": "2024-03-18 15:14:33.102Z",
    "updated": "2024-03-18 15:14:33.102Z",
    "name": "boards",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "k1wy3qnv",
        "name": "archived",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {},
      },
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {},
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("dv9dz4t5add38hy");

  return dao.deleteCollection(collection);
});
