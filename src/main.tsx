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
          <h6 class="footer-title">Legal</h6>
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
        <nav>
          <h6 class="footer-title">Company</h6>
          <a
            class="link link-hover"
            href="https://github.com/jtarchie/helloretro"
            target="_blank"
          >
            GitHub
          </a>
          <a
            class="link link-hover"
            href="mailto:oh@helloretro.app"
            target="_blank"
          >
            Contact
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
    </>
  );
}

render(<App />, document.getElementById("app")!);
