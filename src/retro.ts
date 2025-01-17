import PocketBase, { type RecordModel } from "pocketbase";
import { createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";

export const RetroContext = createContext<Retro | null>(null);
export function useRetro() {
  return useContext(RetroContext);
}

class Retro {
  client: PocketBase;
  id: string;

  constructor(id: string) {
    this.id = id;

    this.client = new PocketBase();
    this.client.autoCancellation(false);
  }

  useItems(category: string) {
    const [items, setItems] = useState<RecordModel[]>([]);

    // subscribe to the latest items
    useEffect(
      (async () => {
        this.client.collection("items").getFullList({
          sort: "created",
          filter: this.client.filter(
            "board_id={:board_id} && category={:category}",
            { board_id: this.id, category: category },
          ),
        }).then((results) => {
          setItems(results);
        });

        const unsubscribe = await this.client.collection("items").subscribe(
          "*",
          (event) => {
            if (event.action === "create") {
              setItems((prevItems) => [...prevItems, event.record]);
            } else if (event.action === "update") {
              setItems((prevItems) =>
                prevItems.map((
                  item,
                ) => (item.id === event.record.id ? event.record : item))
              );
            } else if (event.action === "delete") {
              setItems((prevItems) =>
                prevItems.filter((item) => item.id !== event.record.id)
              );
            }
          },
          {
            filter: this.client.filter(
              "board_id={:board_id} && category={:category}",
              { board_id: this.id, category: category },
            ),
          },
        );

        return () => unsubscribe();
      }) as () => void,
      [],
    );

    return items;
  }

  async addItem(description: string, category: string) {
    await this.client.collection("items").create({
      description: description,
      votes: 0,
      category: category,
      board_id: this.id,
    });
  }

  async deleteItem(id: string) {
    await this.client.collection("items").delete(id);
  }

  async updateDescription(id: string, description: string) {
    await this.client.collection("items").update(id, {
      description: description,
    });
  }

  async vote(id: string, delta: number) {
    await this.client.collection("items").update(id, {
      "votes+": delta,
    });
  }

  async setActiveItem(id: string) {
    await this.client.collection("items").update(id, {
      "active": new Date().toISOString(),
    });
  }

  async setInactiveItem(id: string) {
    await this.client.collection("items").update(id, {
      "active": "",
    });
  }

  async setCompletedItem(id: string) {
    await this.client.collection("items").update(id, {
      "completed": true,
    });
  }

  async delete() {
    return await this.client.collection("boards").delete(this.id);
  }
}

export { Retro };
