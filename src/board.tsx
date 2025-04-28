import { Nav } from "./components/nav";
import { Retro, RetroContext } from "./retro";
import { Panel } from "./retros/panel";
import { useSignal } from "@preact/signals";
import { Tab } from "./retros/tab";
import MediaQuery from "react-responsive";
import { useState } from "preact/hooks";

function Board({ id = "example" }: { path?: string; id?: string }) {
  const columns = [
    {
      type: "happy",
      emoji: "😃",
      prompt: "I'm glad that...",
      colors: ["bg-teal-500", "bg-teal-400", "placeholder-teal-200"],
    },
    {
      type: "meh",
      emoji: "🤨",
      prompt: "I'm wondering about..",
      colors: ["bg-yellow-500", "bg-yellow-400", "placeholder-yellow-200"],
    },
    {
      type: "sad",
      emoji: "😢",
      prompt: "It wasn't so great that...",
      colors: ["bg-red-500", "bg-red-400", "placeholder-red-200"],
    },
    {
      type: "action items",
      emoji: "📝",
      prompt: "This is our next step...",
      colors: ["bg-purple-500", "bg-purple-400", "placeholder-purple-200"],
    },
  ];

  const retro = new Retro(id);
  const checked = useSignal("happy");
  const [sortByVotes, setSortByVotes] = useState(false); // New state for sorting

  const onShare = () => {
    navigator.clipboard.writeText(`${import.meta.env.BASE_URL}/retros/${id}`);
  };

  const confirmDelete = async () => {
    if (globalThis.confirm("Are you sure you want to delete this retro?")) {
      await retro.delete();
      globalThis.location.href = "/";
    }
  };

  return (
    <RetroContext.Provider value={retro}>
      <Nav>
        <div class="dropdown">
          <div tabIndex={0} role="button" class="btn btn-ghost btn-sm">
            Sort by: {sortByVotes ? "Votes" : "Time"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="ml-1"
              viewBox="0 0 16 16"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button
                type="button"
                onClick={() => setSortByVotes(false)}
                aria-selected={!sortByVotes}
              >
                Sort by time
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setSortByVotes(true)}
                aria-selected={sortByVotes}
              >
                Sort by votes
              </button>
            </li>
          </ul>
        </div>
        <button
          type="button"
          class="btn btn-ghost btn-sm tooltip tooltip-bottom hidden sm:inline-block"
          data-tip="Copy Link"
          aria-label="Copy Link"
          onClick={onShare}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <title>Clipboard</title>
            <path
              fill-rule="evenodd"
              d="M13.887 3.182c.396.037.79.08 1.183.128C16.194 3.45 17 4.414 17 5.517V16.75A2.25 2.25 0 0 1 14.75 19h-9.5A2.25 2.25 0 0 1 3 16.75V5.517c0-1.103.806-2.068 1.93-2.207.393-.048.787-.09 1.183-.128A3.001 3.001 0 0 1 9 1h2c1.373 0 2.531.923 2.887 2.182ZM7.5 4A1.5 1.5 0 0 1 9 2.5h2A1.5"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button
          type="button"
          class="btn btn-ghost btn-sm tooltip tooltip-bottom hidden sm:inline-block"
          aria-label="Export to Markdown"
          data-tip="Export to Markdown"
          onClick={() => globalThis.location.href = `/retros/${id}/markdown`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <title>Arrow down in the tray</title>
            <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
            <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
          </svg>
        </button>
        <button
          type="button"
          class="btn btn-ghost btn-sm tooltip tooltip-bottom hidden sm:inline-block"
          aria-label="Delete Retro"
          data-tip="Delete Retro"
          onClick={confirmDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <title>Trash can</title>
            <path
              fill-rule="evenodd"
              d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c."
              clip-rule="evenodd"
            >
              <title>Trash can</title>
            </path>
          </svg>
        </button>
      </Nav>
      <MediaQuery minWidth={768}>
        <div class="grow hidden md:block">
          <div class="grow grid grid-cols-4 gap-4 p-4 md:h-full">
            {columns.map((column) => {
              return (
                <Panel
                  bg={column.colors}
                  category={column.type}
                  emoji={column.emoji}
                  prompt={column.prompt}
                  sortByVotes={sortByVotes} // Pass the sorting state
                />
              );
            })}
          </div>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={768}>
        <div
          role="tablist"
          class="tabs tabs-box md:hidden"
        >
          {columns.map((column) => {
            return (
              <Tab
                bg={column.colors}
                category={column.type}
                checked={checked}
                emoji={column.emoji}
                prompt={column.prompt}
                sortByVotes={sortByVotes}
              />
            );
          })}
        </div>
      </MediaQuery>
    </RetroContext.Provider>
  );
}

export { Board };
