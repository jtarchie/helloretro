import { Signal, useSignal } from "@preact/signals";
import { Retro } from "../retro";
import { Item } from "./item";

function Panel(
  { retro, category, prompt, emoji, bg: [bgPanel, bgText, bgPlaceholder] }: {
    category: string;
    emoji: string;
    retro: Signal<Retro>;
    prompt: string;
    bg: string[];
  },
) {
  const description = useSignal("");

  const addItem = (event: SubmitEvent) => {
    retro.value.addItem(description.value, category);
    description.value = "";
    event.preventDefault();
  };

  return (
    <div class={`${bgPanel} p-4 rounded-lg space-y-4`}>
      <h2 class="text-6xl text-center drop-shadow-lg">{emoji}</h2>
      <form onSubmit={addItem}>
        <input
          type="text"
          value={description}
          onInput={(event) => description.value = event.currentTarget.value}
          placeholder={prompt}
          class={`input input-sm w-full p-2 rounded ${bgText} text-white ${bgPlaceholder}`}
        />
      </form>
      <div class="space-y-2">
        {retro.value.items(category).value.map((item) => {
          return <Item retro={retro} item={item} />;
        })}
      </div>
    </div>
  );
}

export { Panel };
