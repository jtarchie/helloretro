import { useRetro } from "../../retro";
import type { RecordModel } from "pocketbase";
import { SimpleFormat } from "../../simple_format";
import type { ItemStatus } from "./status";
import { useSignal } from "@preact/signals";

function ViewItem(
  { item, setState, showVotes }: {
    item: RecordModel;
    setState: (value: ItemStatus) => void;
    showVotes: boolean;
  },
) {
  const retro = useRetro();
  const boardId = item.board || item.boardId || item.board_id;
  const votesKey = boardId ? `retro-votes-${boardId}` : null;
  const votedItems = votesKey
    ? JSON.parse(localStorage.getItem(votesKey) || "[]")
    : [];
  // Use a signal for local voted state
  const hasVotedSignal = useSignal(votedItems.includes(item.id));

  const upvote = async () => {
    if (hasVotedSignal.value) return;
    hasVotedSignal.value = true; // Update local state immediately
    if (votesKey) {
      const updated = [...votedItems, item.id];
      localStorage.setItem(votesKey, JSON.stringify(updated));
    }
    await retro?.vote(item.id, 1);
  };
  const setActive = async () => {
    await retro?.setActiveItem(item.id);
    setState("active");
  };

  return (
    <div
      class={`bg-white p-2 rounded shadow flex items-center justify-between relative ${
        item.completed && "opacity-70 cursor-not-allowed"
      }`}
    >
      <div class="flex items-center">
        {!item.completed && (
          <div
            class="absolute bottom-1 right-1"
            role="status"
            aria-live="polite"
          >
            <button
              type="button"
              class="flex items-center p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              aria-label="Start discussing this item"
              title="Click to begin discussing this item"
              onClick={() => setActive()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-4 h-4 text-blue-500"
                aria-hidden="true"
                role="img"
              >
                <title>Start Discussion</title>
                <path
                  fill-rule="evenodd"
                  d="M3.43 2.524A41.29 41.29 0 0 1 10 2c2.236 0 4.43.18 6.57.524 1.437.231 2.43 1.49 2.43 2.902v5.148c0 1.413-.993 2.67-2.43 2.902a41.202 41.202 0 0 1-5.183.501.78.78 0 0 0-.528.224l-3.579 3.58A.75.75 0 0 1 6 17.25v-3.443a41.033 41.033 0 0 1-2.57-.33C1.993 13.244 1 11.986 1 10.573V5.426c0-1.413.993-2.67 2.43-2.902Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="sr-only">Start discussing this item</span>
            </button>
          </div>
        )}
        <button
          type="button"
          class={`flex flex-col items-center ${
            item.completed && "btn-disabled"
          }`}
          onClick={upvote}
          aria-label="Like"
          disabled={item.completed || hasVotedSignal.value} // Disable if already voted
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
          <span class="text-red-500 mr-2">
            {showVotes ? item.votes : hasVotedSignal.value ? "1" : "?"}
          </span>
        </button>

        <SimpleFormat classes="text-black" text={item.description} />
      </div>
      <button
        type="button"
        class={`absolute top-2 right-2 text-gray-400 hover:text-gray-600 ${
          item.completed && "btn-disabled"
        }`}
        onClick={() => setState("edit")}
        aria-label="Edit"
        disabled={item.completed}
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
