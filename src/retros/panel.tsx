import { useSignal } from "@preact/signals";
import { useRetro } from "../retro";
import { Item } from "./item";
import { useEffect, useState } from "preact/hooks";

function Panel(
  {
    category,
    prompt,
    emoji,
    bg: [bgPanel, bgText, bgPlaceholder],
    sortByVotes,
    searchTerm = "",
    showVotes,
  }: {
    category: string;
    emoji: string;
    prompt: string;
    bg: string[];
    sortByVotes: boolean;
    searchTerm?: string;
    showVotes: boolean;
  },
) {
  const retro = useRetro();

  const description = useSignal("");

  const addItem = async (event: SubmitEvent) => {
    event.preventDefault();
    await retro?.addItem(description.value, category);
    description.value = "";
  };
  const items = retro?.useItems(category);
  const [sortedItems, setSortedItems] = useState(items);

  useEffect(() => {
    let filtered = items;

    // Filter by search term if provided
    if (searchTerm && searchTerm.trim() !== "") {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = items?.filter((item) =>
        item.description.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Sort the filtered items
    if (sortByVotes) {
      setSortedItems(filtered?.concat().sort((a, b) => b.votes - a.votes));
    } else {
      setSortedItems(filtered);
    }
  }, [items, sortByVotes, searchTerm]);

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
          class={`input input-sm w-full p-2 rounded-sm ${bgText} focus:bg-white focus:text-black text-white ${bgPlaceholder}`}
        />
      </form>
      <ol class="space-y-2">
        {sortedItems?.map((item) => {
          return <Item key={item.id} item={item} showVotes={showVotes} />;
        })}
      </ol>
    </div>
  );
}

export { Panel };
