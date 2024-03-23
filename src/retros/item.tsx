import { Signal, useSignal } from "@preact/signals";
import { Retro } from "../retro";
import { RecordModel } from "pocketbase";
import { EditItem } from "./items/edit";
import { ViewItem } from "./items/view";
import { ActiveItem } from "./items/active";

function Item({ retro, item }: { retro: Signal<Retro>; item: RecordModel }) {
  let defaultState = "view";
  if (!item.completed && item.active != "") {
    defaultState = "active";
  }
  const state = useSignal(defaultState);

  switch (state.value) {
    case "edit":
      return (
        <div role="listitem">
          <EditItem retro={retro} item={item} state={state} />
        </div>
      );
    case "active":
      return (
        <div role="listitem">
          <ActiveItem retro={retro} item={item} state={state} />
        </div>
      );
    default:
      return (
        <div role="listitem">
          <ViewItem retro={retro} item={item} state={state} />
        </div>
      );
  }
}

export { Item };
