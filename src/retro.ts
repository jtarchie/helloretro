import { Signal, signal } from "@preact/signals";
import PocketBase, { RecordModel } from "pocketbase";

class Retro {
  client: PocketBase;
  id: string;
  itemSignals: Map<string, Signal<RecordModel[]>>;

  constructor(id: string) {
    this.id = id;

    this.client = new PocketBase();
    this.client.autoCancellation(false);

    this.itemSignals = new Map<string, Signal<RecordModel[]>>();
  }

  items(category: string): Signal<RecordModel[]> {
    if (!this.itemSignals.has(category)) {
      const items = signal<RecordModel[]>([]);
      this.itemSignals.set(category, items);

      // load the initial list
      this.client.collection("items").getFullList({
        sort: "-votes",
        filter: `board_id="${this.id}" && category="${category}"`,
      }).then((results) => {
        items.value = results;
      });

      // subscribe to the latest items
      this.client.collection("items").subscribe("*", (event) => {
        if (event.action == "create") {
          items.value = [...items.value, event.record].sort((a, b) =>
            b.votes - a.votes
          );
        }

        if (event.action == "update") {
          items.value = items.value.map((item) => {
            if (item.id == event.record.id) {
              return event.record;
            } else {
              return item;
            }
          }).sort((a, b) => b.votes - a.votes);
        }

        if (event.action == "delete") {
          items.value = items.value.filter((item) =>
            item.id != event.record.id
          );
        }
      }, {
        filter: `board_id = "${this.id}" && category = "${category}"`,
      });
    }

    return this.itemSignals.get(category) as Signal<RecordModel[]>;
  }

  addItem(description: string, category: string) {
    this.client.collection("items").create({
      description: description,
      votes: 0,
      category: category,
      board_id: this.id,
    });
  }

  deleteItem(id: string) {
    this.client.collection("items").delete(id);
  }

  updateDescription(id: string, description: string) {
    this.client.collection("items").update(id, {
      description: description,
    });
  }

  vote(id: string, delta: number) {
    this.client.collection("items").update(id, {
      "votes+": delta,
    });
  }

  setActiveItem(id: string) {
    this.client.collection("items").update(id, {
      "active": new Date().toISOString(),
    });
  }
}

export { Retro };
