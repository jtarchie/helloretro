import { type Signal, signal } from "@preact/signals";
import type { Retro } from "../../retro";
import type { RecordModel } from "pocketbase";
import type { ItemStatus } from "./status";

function EditItem(
  { retro, item, state }: {
    retro: Signal<Retro>;
    item: RecordModel;
    state: Signal<ItemStatus>;
  },
) {
  const description = signal(item.description);
  const updatedDescription = (event: SubmitEvent) => {
    retro.value.updateDescription(item.id, description.value);
    state.value = "view";
    event.preventDefault();
  };
  const deleteItem = () => {
    retro.value.deleteItem(item.id);
    state.value = "view";
  };

  return (
    <div class="bg-white p-2 rounded shadow flex items-center justify-between">
      <form class="w-full" onSubmit={updatedDescription}>
        <label class="flex items-center gap-2 w-full">
          <textarea
            class="textarea textarea-bordered w-full"
            placeholder="Description"
            value={description}
            onInput={(event) => description.value = event.currentTarget.value}
          >
          </textarea>
          <div class="flex flex-col items-center">
            <button
              type="submit"
              class="btn btn-circle btn-sm btn-outline"
              aria-label="Update the description"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5 opacity-70 shrink-0"
              >
                <title>Checkmark</title>
                <path
                  fill-rule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clip-rule="evenodd"
                >
                </path>
              </svg>
            </button>
            <button
              type="button"
              class="btn btn-circle btn-xs btn-outline mt-2"
              aria-label="Delete the description"
              onClick={deleteItem}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4"
              >
                <title>Trash can</title>
                <path
                  fill-rule="evenodd"
                  d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </label>
      </form>
    </div>
  );
}

export { EditItem };
