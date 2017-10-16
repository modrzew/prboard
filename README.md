# prboard

Simple React app for displaying list of pull requests grouped by assignee,
in board format.

## Setup

This repo was created using
[create-react-app](https://github.com/facebookincubator/create-react-app),
so all commands are available.

To install all dependencies, run after clonning: (you can also use `npm`)

```js
yarn install
```

To run in development mode:

```js
yarn start
```

To build:

```js
yarn build
```

## Config

Copy `src/config.js.example` to `src/config.js` and fill your values.

## Continuous delivery

In one terminal window, run `yarn prod`. This will run [serve](https://github.com/zeit/serve),
and restart every time file changes using [nodemon](https://github.com/remy/nodemon).

In another window, run `yarn cd`. This will check every 5 minutes for changes in
upstream git branch, and pull & rebuild when necessary.

## License

See [LICENSE](LICENSE).
