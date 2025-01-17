/// <reference path="../pb_data/types.d.ts" />

onRecordUpdate((event) => {
  const item = event.record;

  if (!item.get("completed") && item.get("active") != "") {
    item.set("active", new Date().toISOString());

    const items = event.app.findRecordsByFilter(
      "items",
      `board_id = '${item.get("board_id")}' && id != '${
        item.get("id")
      }' && active != '' && completed = false`,
    );

    // Iterate over the fetched items and update them
    items.forEach((item) => {
      item.set("completed", true);
      event.app.save(item);
    });
  }

  event.next();
}, "items");
