import { RecordModel } from "pocketbase";
import { SimpleFormat } from "../../simple_format";
import { useEffect, useState } from "preact/hooks";

function ActiveItem({ item }: { item: RecordModel }) {
  const [timeDisplay, setTimeDisplay] = useState("");

  useEffect(() => {
    // Calculate the difference between the current time and the timestamp
    const updateTimer = () => {
      const timestamp = new Date(item.active);

      const now = Date.now();
      const elapsedTime = Math.floor((now - timestamp.valueOf()) / 1000); // in seconds
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
    <div class="bg-white p-2 rounded shadow-xl flex items-center justify-between relative transform scale-110 -rotate-1 transition duration-300 ease-in">
      <div>
        <SimpleFormat classes="text-black" text={item.description} />
      </div>
      <div class="badge badge-primary badge-lg">{timeDisplay}</div>
    </div>
  );
}

export { ActiveItem };
