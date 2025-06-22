/// <reference path="../pb_data/types.d.ts" />

cronAdd("cleanup unused boards", "0 0 * * 0", () => {
  const ago = new Date(
    new Date().getTime() - (3 * 31 * 24 * 60 * 60 * 1000),
  );

  const boards = $app.findRecordsByFilter(
    "boards", // collection
    "created < {:ago}", // filter
    "", // sort
    0, // limit
    0, // offset
    { ago: ago.toISOString().replace("T", " ") }, // optional filter params
  );

  boards.forEach((record) => {
    const createdBy = record.get("created_by");

    if (createdBy) {
      return; // skip if created by a user
    }

    $app.delete(record);
  });
});
