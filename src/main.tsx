import { render } from "preact";
import "./index.css";
import { Board } from "./board";
import Router from "preact-router";
import { Home } from "./home";

function App() {
  return (
    <div class="flex flex-col h-screen">
      <div class="flex justify-between items-center bg-gray-800 p-4 text-white">
        <h1 class="text-xl">HelloRetro</h1>
        <div class="flex gap-4">
          <button class="btn btn-ghost btn-sm">Usage</button>
        </div>
      </div>
      <Router>
        <Home path="/" />
        <Board path="/retros/:id" />
      </Router>
    </div>
  );
}

render(<App />, document.getElementById("app")!);
