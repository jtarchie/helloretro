import { Signal } from "@preact/signals";
import { Retro } from "../../retro";
import { RecordModel } from "pocketbase";
import { SimpleFormat } from "../../simple_format";

function ViewItem(
  { retro, item, editable }: {
    retro: Signal<Retro>;
    item: RecordModel;
    editable: Signal<boolean>;
  },
) {
  const upvote = () => retro.value.vote(item.id, 1);

  return (
    <div class="bg-white p-2 rounded shadow flex items-center justify-between relative">
      <div class="flex items-center">
        <button
          class="flex flex-col items-center"
          onClick={upvote}
          aria-label="Like"
        >
          <span class="text-red-500 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
              aria-hidden="true"
            >
              <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
            </svg>
          </span>
          <span class="text-red-500 mr-2">{item.votes}</span>
        </button>
        <div class="flow flow-row">
          <SimpleFormat classes="text-black" text={item.description} />
        </div>
      </div>
      <button
        class="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        onClick={() => editable.value = true}
        aria-label="Edit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-3 h-3"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </button>
    </div>
  );
}

export { ViewItem };
