/// <reference path="../pb_data/types.d.ts" />

cronAdd("cleanup unused boards", "0 0 * * 0", () => {
  const ago = new Date(
    new Date().getTime() - (7 * 24 * 60 * 60 * 1000),
  );

  const boards = $app.findRecordsByFilter(
    "boards", // collection
    "created < {:ago}", // filter
    "", // sort
    0, // limit
    0, // offset
    { ago: ago.toISOString() }, // optional filter params
  );

  boards.forEach((record) => {
    const items = $app.findRecordsByFilter(
      "items", // collection
      "board_id = {:board_id}", // filter
      "", // sort
      1, // limit
      0, // offset
      { board_id: record.id }, // optional filter params
    );

    if (items.length == 0) {
      console.log("record", record.id, record.getCreated());
      $app.delete(record);
    }
  });
});
