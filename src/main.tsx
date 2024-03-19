import { render } from "preact";
import "./index.css";
import { Board } from "./board";
import Router from "preact-router";
import { Home } from "./home";

function App() {
  return (
    <>
      <div class="flex flex-col h-screen">
        <div class="flex justify-between items-center bg-gray-800 p-4 text-white">
          <h1 class="text-xl">HelloRetro</h1>
          <div class="flex gap-4">
            <button
              class="btn btn-ghost btn-sm"
              onClick={() =>
                (document.getElementById("about_modal") as HTMLDialogElement)
                  .showModal()}
            >
              About
            </button>
          </div>
        </div>
        <Router>
          <Home path="/" />
          <Board path="/retros/:id" />
        </Router>
      </div>
      <dialog id="about_modal" class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg">About HelloRetro</h3>
          <p class="mb-4">
            HelloRetro is a retrospective tool designed to facilitate agile
            retrospectives. This application allows teams to reflect on their
            recent work cycle, discuss what went well, and identify areas for
            improvement.
          </p>
          <h3 class="text-2xl font-semibold mb-4">How to Use</h3>
          <ul class="list-disc pl-8 mb-4">
            <li>
              Start by selecting the mood that best describes your retrospective
              point.
            </li>
            <li>
              Enter your thoughts into the text box provided under each mood
              section.
            </li>
            <li>
              You can submit your point by clicking the checkmark icon or delete
              it using the trash can icon.
            </li>
            <li>
              Vote on points by clicking the heart icon to show agreement or
              acknowledgment.
            </li>
            <li>
              The number next to the heart indicates how many votes a point has
              received.
            </li>
          </ul>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

render(<App />, document.getElementById("app")!);
