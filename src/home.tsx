function Home({}: { path?: string }) {
  return (
    <>
      <div class="flex justify-between items-center bg-gray-800 p-4 text-white">
        <h1 class="text-xl">
          <a href="/">HelloRetro</a>
        </h1>
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
      <main class="p-4 flex-grow">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold mb-4">What is a Retrospective?</h2>
          <p class="mb-4">
            A retrospective is a meeting held by a project team at the end of a
            development cycle in which they discuss the successes and failures
            of the project. The aim is to reflect on what went well, what did
            not, and what could be improved for future cycles.
          </p>
          <p class="mb-4">
            HelloRetro is a tool that helps teams run retrospectives more
            effectively. It's designed to foster open communication and
            collaborative discussion, allowing team members to share their
            thoughts and ideas on how to move forward.
          </p>
          <a href="/retros/new" class="btn btn-primary btn-lg" data-native>
            Start new retro
          </a>
        </div>
      </main>
    </>
  );
}

export { Home };
