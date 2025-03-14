import type { RecordModel } from "pocketbase";
import { SimpleFormat } from "../../simple_format";
import { useEffect, useState } from "preact/hooks";
import { useRetro } from "../../retro";
import type { ItemStatus } from "./status";

function ActiveItem(
  { item, setState }: {
    item: RecordModel;
    setState: (value: ItemStatus) => void;
  },
) {
  const retro = useRetro();
  const [timeDisplay, setTimeDisplay] = useState("");

  const setCompleted = async () => {
    setState("view");
    await retro?.setCompletedItem(item.id);
  };
  const setInactive = async () => {
    setState("view");
    await retro?.setInactiveItem(item.id);
  };

  useEffect(() => {
    // Calculate the difference between the current time and the timestamp
    const updateTimer = () => {
      const timestamp = new Date(item.active);

      // Check if the timestamp is a valid date
      if (isNaN(timestamp.valueOf())) {
        setTimeDisplay("00:00");
        return;
      }

      const now = Date.now();
      const elapsedTime = Math.floor((now - timestamp.valueOf()) / 1000); // in seconds

      // If the timestamp is in the future or elapsedTime is negative, reset to "00:00"
      if (elapsedTime < 0) {
        setTimeDisplay("00:00");
        return;
      }

      if (elapsedTime >= 3600) {
        setTimeDisplay("99:99+");
        return;
      }

      const minutes = Math.floor(elapsedTime / 60).toString().padStart(2, "0");
      const seconds = (elapsedTime % 60).toString().padStart(2, "0");
      setTimeDisplay(`${minutes}:${seconds}`);
    };

    // Update immediately and every second thereafter
    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [item.active]);

  return (
    <div class="flex flex-col">
      <div class="bg-white p-2 rounded-sm shadow-xl flex items-center justify-between relative transform scale-110 -rotate-1 transition duration-300 ease-in">
        <div>
          <SimpleFormat classes="text-black" text={item.description} />
        </div>
        <div class="badge badge-primary badge-lg ml-2 w-[3.5rem] flex-none">
          {timeDisplay}
        </div>
      </div>
      <div class="flex justify-start space-x-2 p-2 bg-white rounded-b shadow-xl transform scale-110 -rotate-1 transition duration-300 ease-in">
        <button
          type="button"
          class="btn btn-sft btn-circle btn-xs btn-success"
          aria-label="Complete"
          onClick={setCompleted}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="w-4 h-4"
          >
            <title>Completed</title>
            <path d="M2.09 15a1 1 0 0 0 1-1V8a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM5.765 13H4.09V8c.663 0 1.218-.466 1.556-1.037a4.02 4.02 0 0 1 1.358-1.377c.478-.292.907-.706.989-1.26V4.32a9.03 9.03 0 0 0 0-2.642c-.028-.194.048-.394.224-.479A2 2 0 0 1 11.09 3c0 .812-.08 1.605-.235 2.371a.521.521 0 0 0 .502.629h1.733c1.104 0 2.01.898 1.901 1.997a19.831 19.831 0 0 1-1.081 4.788c-.27.747-.998 1.215-1.793 1.215H9.414c-.215 0-.428-.035-.632-.103l-2.384-.794A2.002 2.002 0 0 0 5.765 13Z" />
          </svg>
        </button>
        <button
          type="button"
          class="btn btn-sft btn-circle btn-xs btn-error"
          aria-label="Stop"
          onClick={setInactive}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="w-4 h-4"
          >
            <title>Stop</title>
            <rect width="10" height="10" x="3" y="3" rx="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export { ActiveItem };
