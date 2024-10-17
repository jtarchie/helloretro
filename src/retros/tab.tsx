import { type Signal, useSignal } from "@preact/signals";
import { useRetro } from "../retro";
import { Item } from "./item";

function Tab(
  {
    category,
    prompt,
    emoji,
    checked,
    bg: [bgPanel, bgText, bgPlaceholder],
  }: {
    category: string;
    emoji: string;
    prompt: string;
    checked: Signal<string>;
    bg: string[];
  },
) {
  const retro = useRetro();
  const description = useSignal("");

  const addItem = (event: SubmitEvent) => {
    event.stopPropagation();
    retro?.addItem(description.value, category);
    description.value = "";
    event.preventDefault();
  };

  const items = retro?.items(category);

  return (
    <>
      <input
        type="radio"
        name="panel-tab"
        role="tab"
        class="tab"
        aria-label={`${emoji} (${items?.value.length})`}
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
        <ol class="space-y-2">
          {items?.value.map((item) => {
            return <Item key={item.id} item={item} />;
          })}
        </ol>
      </div>
    </>
  );
}

export { Tab };
