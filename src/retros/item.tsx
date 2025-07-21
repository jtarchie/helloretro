import type { RecordModel } from "pocketbase";
import { EditItem } from "./items/edit";
import { ViewItem } from "./items/view";
import { ActiveItem } from "./items/active";
import type { ItemStatus } from "./items/status";
import { useEffect, useState } from "preact/hooks";

function Item({ item, showVotes, userVotes, boardId }: { 
  item: RecordModel; 
  showVotes: boolean; 
  userVotes: Set<string>; 
  boardId: string; 
}) {
  const [state, setState] = useState<ItemStatus>("view");

  useEffect(() => {
    if (!item.completed && item.active != "") {
      setState("active");
    } else if (item.completed) {
      setState("view");
    }
  }, [item, item.completed, item.active]);

  switch (state) {
    case "edit":
      return (
        <li>
          <EditItem item={item} setState={setState} />
        </li>
      );
    case "active":
      return (
        <li>
          <ActiveItem item={item} setState={setState} />
        </li>
      );
    default:
      return (
        <li>
          <ViewItem item={item} setState={setState} showVotes={showVotes} userVotes={userVotes} boardId={boardId} />
        </li>
      );
  }
}

export { Item };
