# HelloRetro

Site: https://helloretro.app

## What is a Retro?

The retrospective is a meeting to discuss a situation's successes and failures.
A retro is meant to be constructive. There's an opportunity to present issues,
discuss them, and provide steps for action.

_It is not for complaining and commiserating._

There are
[different formats](https://miro.com/blog/best-retrospective-templates/) for a
retro. They assist in having patterns for starting, navigating, and concluding a
discussion.

HelloRetro supports the "Happy, Meh, Sad" / "Mad, Sad, Glad" pattern. It stems
from answering the questions:

- _Happy_: What went well?
- _Sad_: What was disappointing?
- _Mad_: What didn't go well?

## Features

- Easily create a retrospective to share with your team
- Add/edit retro items
- Vote on retro items
- Discussion timer (unopinionated)
- Realtime updates (using
  [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events))
- Built with accessability in mind
- Self hosted (no external database required)

## Motivation

This is a retrospective board built in similar style of
[Refacto](https://github.com/davidje13/Refacto) and
[Postfacto](https://github.com/vmware-archive/postfacto).

The purpose of this rewrite was purely to use the technologies of
[Vite](https://vitejs.dev/), [Pocketbase](https://pocketbase.io/), and
[PreactJS](https://preactjs.com/) together. A lean application that provides the
same functionality, but does not incur the same costs as being highly available.
Deployed to [fly.io](https://fly.io/) with a persisted disk, so the application
can scale down, but persist the sqlite database (provided by Pocketbase) between
startups.

## Development

```bash
brew bundle

yarn install
task -p build server
yarn test
```
