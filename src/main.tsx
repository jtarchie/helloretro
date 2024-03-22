import { render } from "preact";
import "./index.css";
import { Board } from "./board";
import Router from "preact-router";
import { Home } from "./home";

function App() {
  return (
    <>
      <Router>
        <Home path="/" />
        <Board path="/retros/:id" />
      </Router>
      <footer class="footer p-10 bg-base-300 text-base-content">
        <nav>
          <h6 class="footer-title">Company</h6>
          <a
            class="link link-hover"
            href="https://www.termsfeed.com/live/7cac2a09-dea0-4c4e-bda6-401aedd87fd5"
            target="_blank"
          >
            Terms of Service
          </a>
          <a
            class="link link-hover"
            href="https://www.termsfeed.com/live/4d790e25-f499-427f-a3b2-a661e1db5b75"
            target="_blank"
          >
            Privacy Policy
          </a>
        </nav>
      </footer>
      <footer class="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
        <aside class="items-center grid-flow-col">
          <p>
            Copyright © 2024 -{" "}
            <a href="https://jtarchie.com" class="link link-hover" data-native>
              JT Archie
            </a>
          </p>
        </aside>
      </footer>
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
              Start a new retro and share the link with team members.
            </li>
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
