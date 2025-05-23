import { render } from "preact";
import "./index.css";
import { Board } from "./board";
import { LocationProvider, Router } from "preact-iso";
import { Home } from "./home";
import { Help } from "./help";
import { Login } from "./login";
import { SignupPage } from "./signup";
import { Profile } from "./profile";
import { AuthProvider } from "./services/auth";

function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <Router>
          <Home path="/" />
          <Board path="/retros/:id" />
          <Help path="/help" />
          <Login path="/login" />
          <SignupPage path="/signup" />
          <Profile path="/profile" />
        </Router>

        <footer class="footer sm:footer-horizontal p-10 bg-base-300 text-base-content">
          <nav>
            <h6 class="footer-title">Legal</h6>
            <a
              class="link link-hover"
              href="https://www.termsfeed.com/live/7cac2a09-dea0-4c4e-bda6-401aedd87fd5"
              target="_blank"
              rel="noreferrer"
            >
              Terms of Service
            </a>
            <a
              class="link link-hover"
              href="https://www.termsfeed.com/live/4d790e25-f499-427f-a3b2-a661e1db5b75"
              target="_blank"
              rel="noreferrer"
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
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              class="link link-hover"
              href="mailto:oh@helloretro.app"
              target="_blank"
              rel="noreferrer"
            >
              Contact
            </a>
            <a
              class="link link-hover"
              href="/help"
              target="_blank"
              rel="noreferrer"
            >
              Help
            </a>
          </nav>
        </footer>
        <footer class="footer footer-center px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
          <aside>
            <p>
              Made with ❤️ for ❄️ in Colorado{" "}
              <a href="https://www.buymeacoffee.com/jtarchie" target="_blank">
                <img
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                  alt="Buy Me A Coffee"
                  style="height: 60px !important;width: 217px !important;"
                />
              </a>
            </p>
          </aside>
        </footer>
        <footer class="footer footer-center px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
          <aside>
            <p>
              Copyright © {new Date().getFullYear()} -&nbsp;
              <a
                href="https://jtarchie.com"
                class="link link-hover"
                data-native
              >
                JT Archie
              </a>
            </p>
          </aside>
        </footer>
      </LocationProvider>
    </AuthProvider>
  );
}

render(<App />, document.getElementById("app")!);
