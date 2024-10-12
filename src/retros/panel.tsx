import { computed, type Signal, useSignal } from "@preact/signals";
import type { Retro } from "../retro";
import { Item } from "./item";

function Panel(
  {
    retro,
    category,
    prompt,
    emoji,
    bg: [bgPanel, bgText, bgPlaceholder],
    sortByVotes,
  }: {
    category: string;
    emoji: string;
    retro: Signal<Retro>;
    prompt: string;
    bg: string[];
    sortByVotes: Signal<boolean>; // New prop
  },
) {
  const description = useSignal("");

  const addItem = (event: SubmitEvent) => {
    retro.value.addItem(description.value, category);
    description.value = "";
    event.preventDefault();
  };

  const items = computed(() => {
    const items = retro.value.items(category).value;

    if (sortByVotes.value) {
      return items.concat().sort((a, b) => b.votes - a.votes);
    }

    return items;
  });

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
      <ol class="space-y-2">
        {items.value.map((item) => {
          return <Item key={item.id} retro={retro} item={item} />;
        })}
      </ol>
    </div>
  );
}

export { Panel };
