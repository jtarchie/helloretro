import { Signal, useSignal } from "@preact/signals";
import { Retro } from "../retro";
import { Item } from "./item";

function Tab(
  {
    retro,
    category,
    prompt,
    emoji,
    checked,
    bg: [bgPanel, bgText, bgPlaceholder],
  }: {
    category: string;
    emoji: string;
    retro: Signal<Retro>;
    prompt: string;
    checked: Signal<string>;
    bg: string[];
  },
) {
  const description = useSignal("");

  const addItem = (event: SubmitEvent) => {
    event.stopPropagation();
    retro.value.addItem(description.value, category);
    description.value = "";
    event.preventDefault();
  };

  return (
    <>
      <input
        type="radio"
        name="panel-tab"
        role="tab"
        class="tab"
        aria-label={`${emoji} (${retro.value.items(category).value.length})`}
        checked={checked.value == category}
        onClick={() => checked.value = category}
      />
      <div
        role="tabpanel"
        class={`${bgPanel} tab-content p-4 rounded-lg space-y-4 min-h-screen`}
      >
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
    </>
  );
}

export { Tab };
