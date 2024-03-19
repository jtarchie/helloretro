import { Signal, useSignal } from "@preact/signals";
import { Retro } from "../retro";
import { RecordModel } from "pocketbase";
import { EditItem } from "./items/edit";
import { ViewItem } from "./items/view";

function Item({ retro, item }: { retro: Signal<Retro>; item: RecordModel }) {
  const editable = useSignal(false);

  return (
    <div role="listitem">
      {editable.value
        ? <EditItem retro={retro} item={item} editable={editable} />
        : <ViewItem retro={retro} item={item} editable={editable} />}
    </div>
  );
}

export { Item };
