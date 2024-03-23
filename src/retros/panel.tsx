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
      <div
        class="w-full text-6xl text-center drop-shadow-lg -mt-8 tooltip"
        aria-label={`Emoji representing ${category}`}
        data-tip={`Emoji representing ${category}`}
      >
        {emoji}
      </div>
      <form onSubmit={addItem}>
        <label class="sr-only" for={category}>{prompt}</label>
        <input
          type="text"
          id={category}
          value={description}
          onInput={(event) => description.value = event.currentTarget.value}
          placeholder={prompt}
          class={`input input-sm w-full p-2 rounded ${bgText} focus:bg-white focus:text-black text-white ${bgPlaceholder}`}
        />
      </form>
      <div class="space-y-2" role="list">
        {retro.value.items(category).value.map((item) => {
          return <Item key={item.id} retro={retro} item={item} />;
        })}
      </div>
    </div>
  );
}

export { Panel };
