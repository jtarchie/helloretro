import { Signal, signal } from "@preact/signals";
import { Retro } from "../../retro";
import { RecordModel } from "pocketbase";

function EditItem(
  { retro, item, editable }: {
    retro: Signal<Retro>;
    item: RecordModel;
    editable: Signal<boolean>;
  },
) {
  const description = signal(item.description);
  const onSubmit = (event: SubmitEvent) => {
    retro.value.updateDescription(item.id, description.value);
    editable.value = false;
    event.preventDefault();
  };

  return (
    <div class="bg-white p-2 rounded shadow flex items-center justify-between">
      <form class="w-full" onSubmit={onSubmit}>
        <label class="flex items-center gap-2 w-full">
          <textarea
            class="textarea textarea-bordered w-full"
            placeholder="Description"
            value={description}
            onInput={(event) => description.value = event.currentTarget.value}
          >
          </textarea>
          <button type="submit" class="btn btn-circle btn-sm btn-outline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5 opacity-70 shrink-0"
            >
              <path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                clip-rule="evenodd"
              >
              </path>
            </svg>
          </button>
        </label>
      </form>
    </div>
  );
}

export { EditItem };
