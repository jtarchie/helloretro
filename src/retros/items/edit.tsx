import { signal } from "@preact/signals";
import { useRetro } from "../../retro";
import type { RecordModel } from "pocketbase";
import type { ItemStatus } from "./status";

function EditItem(
  { item, setState }: {
    item: RecordModel;
    setState: (value: ItemStatus) => void;
  },
) {
  const retro = useRetro();
  const description = signal(item.description);
  const updatedDescription = async (event: SubmitEvent) => {
    event.preventDefault();
    await retro?.updateDescription(item.id, description.value);
    setState("view");
  };
  const deleteItem = async () => {
    await retro?.deleteItem(item.id);
    setState("view");
  };

  return (
    <div class="bg-base-100 p-2 rounded shadow flex items-center justify-between">
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
              class="btn btn-circle btn-success"
              aria-label="Update the description"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                class="size-6"
              >
                <title>Checkmark</title>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </button>
            <button
              type="button"
              class="btn btn-circle btn-error mt-2"
              aria-label="Delete the description"
              onClick={deleteItem}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                class="size-6"
              >
                <title>Trash can</title>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
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
