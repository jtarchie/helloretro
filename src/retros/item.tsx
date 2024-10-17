import { useSignal } from "@preact/signals";
import type { RecordModel } from "pocketbase";
import { EditItem } from "./items/edit";
import { ViewItem } from "./items/view";
import { ActiveItem } from "./items/active";
import type { ItemStatus } from "./items/status";

function Item({ item }: { item: RecordModel }) {
  let defaultState: ItemStatus = "view";
  if (!item.completed && item.active != "") {
    defaultState = "active";
  }
  const state = useSignal<ItemStatus>(defaultState);

  switch (state.value) {
    case "edit":
      return (
        <li>
          <EditItem item={item} state={state} />
        </li>
      );
    case "active":
      return (
        <li>
          <ActiveItem item={item} state={state} />
        </li>
      );
    default:
      return (
        <li>
          <ViewItem item={item} state={state} />
        </li>
      );
  }
}

export { Item };
