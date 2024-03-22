/// <reference path="../pb_data/types.d.ts" />

onModelBeforeUpdate((event) => {
  const item = event.model;

  if (!item.get("completed") && item.get("active") != "") {
    item.set("active", new Date().toISOString());

    const items = $app.dao().findRecordsByFilter(
      "items",
      `board_id = '${
        item.get("board_id")
      }' && id != '${item.getId()}' && active != '' && completed = false`,
    );

    // Iterate over the fetched items and update them
    items.forEach((item) => {
      item.set("completed", true);
      $app.dao().saveRecord(item);
    });
  }
}, "items");
