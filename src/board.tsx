import { Retro } from "./retro";
import { Panel } from "./retros/panel";
import { useSignal } from "@preact/signals";

function Board({ id = "example" }: { path?: string; id?: string }) {
  const retro = useSignal(new Retro(id));

  return (
    <>
      <div class="flex-grow grid grid-cols-3 gap-4 p-4">
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

      {
        /* <div class="bg-gray-200 p-4">
        <div class="flex justify-between items-center">
          <h2 class="font-bold">Action items</h2>
          <button class="btn btn-primary btn-sm">Add an action item</button>
        </div>
      </div> */
      }
    </>
  );
}

export { Board };
