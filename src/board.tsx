import { Nav } from "./components/nav";
import { Retro } from "./retro";
import { Panel } from "./retros/panel";
import { useSignal } from "@preact/signals";

function Board({ id = "example" }: { path?: string; id?: string }) {
  const retro = useSignal(new Retro(id));

  return (
    <>
      <Nav>
        <a
          class="btn btn-ghost btn-sm"
          href={`/retros/${id}/markdown`}
          data-native
        >
          Export
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
            <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
          </svg>
        </a>
      </Nav>
      <div class="flex-grow flex overflow-hidden">
        <div class="flex-grow flex flex-col">
          <div class="flex-grow grid grid-cols-3 gap-4 p-4 h-full overflow-auto">
            <Panel
              retro={retro}
              category="happy"
              emoji="😃"
              prompt="I'm glad that..."
              bg={["bg-teal-500", "bg-teal-400", "placeholder-teal-200"]}
            />
            <Panel
              retro={retro}
              category="meh"
              emoji="🤨"
              prompt="I'm wondering about.."
              bg={["bg-yellow-500", "bg-yellow-400", "placeholder-yellow-200"]}
            />
            <Panel
              retro={retro}
              category="sad"
              emoji="😢"
              prompt="It wasn't so great that..."
              bg={["bg-red-500", "bg-red-400", "placeholder-red-200"]}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export { Board };
