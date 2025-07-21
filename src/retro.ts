import PocketBase, { type RecordModel } from "pocketbase";
import { createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { pb } from "./services/auth";

export const RetroContext = createContext<Retro | null>(null);
export function useRetro() {
  return useContext(RetroContext);
}

class Retro {
  client: PocketBase;
  id: string;

  constructor(id: string) {
    this.id = id;

    // Use the shared PocketBase instance
    this.client = pb;
    this.client.autoCancellation(false);
  }

  useBoard() {
    const [board, setBoard] = useState<RecordModel | null>(null);

    useEffect(() => {
      let unsubscribe: () => Promise<void>;

      // Initial load
      this.client.collection("boards").getOne(this.id)
        .then(setBoard)
        .catch(() => {
          // Board doesn't exist, create it
          this.client.collection("boards").create({
            id: this.id,
          }).then(setBoard);
        });

      // Subscribe to board changes
      this.client.collection("boards").subscribe(
        this.id,
        (event) => {
          if (event.action === "update") {
            setBoard(event.record);
          }
        },
      ).then((unsub) => {
        unsubscribe = unsub;
      });

      return () => {
        if (unsubscribe) {
          unsubscribe().catch(() => {});
        }
      };
    }, []);

    return board;
  }

  useItems(category: string) {
    const [items, setItems] = useState<RecordModel[]>([]);

    // subscribe to the latest items
    useEffect(
      (async () => {
        const unsubscribeConnect = await this.client.realtime.subscribe(
          "PB_CONNECT",
          () => {
            this.client.collection("items").getFullList({
              sort: "created",
              filter: this.client.filter(
                "board_id={:board_id} && category={:category}",
                { board_id: this.id, category: category },
              ),
            }).then((results) => {
              setItems(results);
            });
          },
        );

        const unsubscribeItems = await this.client.collection("items")
          .subscribe(
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

        return () => {
          unsubscribeItems();
          unsubscribeConnect();
        };
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
