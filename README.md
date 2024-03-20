# HelloRetro

[Live deployment](https://helloretro.app)

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
