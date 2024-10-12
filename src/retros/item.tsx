import { type Signal, useSignal } from "@preact/signals";
import type { Retro } from "../retro";
import type { RecordModel } from "pocketbase";
import { EditItem } from "./items/edit";
import { ViewItem } from "./items/view";
import { ActiveItem } from "./items/active";
import type { ItemStatus } from "./items/status";

function Item({ retro, item }: { retro: Signal<Retro>; item: RecordModel }) {
  let defaultState: ItemStatus = "view";
  if (!item.completed && item.active != "") {
    defaultState = "active";
  }
  const state = useSignal<ItemStatus>(defaultState);

  switch (state.value) {
    case "edit":
      return (
        <li>
          <EditItem retro={retro} item={item} state={state} />
        </li>
      );
    case "active":
      return (
        <li>
          <ActiveItem retro={retro} item={item} state={state} />
        </li>
      );
    default:
      return (
        <li>
          <ViewItem retro={retro} item={item} state={state} />
        </li>
      );
  }
}

export { Item };
