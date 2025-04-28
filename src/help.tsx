import { Nav } from "./components/nav";

function Help({}: { path?: string }) {
  return (
    <>
      <Nav />
      <div class="container mx-auto p-8">
        <h1 class="font-bold text-3xl mb-6">About HelloRetro</h1>
        <p class="mb-4">
          HelloRetro is a retrospective tool designed to facilitate agile
          retrospectives. This application allows teams to reflect on their
          recent work cycle, discuss what went well, and identify areas for
          improvement.
        </p>
        <h2 class="text-2xl font-semibold mb-4">How to Use</h2>
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
      </div>
    </>
  );
}

export { Help };
