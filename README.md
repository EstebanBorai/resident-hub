<div align="center">
  <img src="./docs/logo.png" height="160" width="160" />
  <h1>thruway-parking</h1>
  <h4 align="center">
    🅿️ Parking Lot management web application for multiple purposes, with slot
    reservation, users and guests capabilities
  </h4>
</div>

<div align="center">

![Build](https://github.com/EstebanBorai/thruway-parking/workflows/build/badge.svg)
![Test](https://github.com/EstebanBorai/thruway-parking/workflows/test/badge.svg)
![Lint](https://github.com/EstebanBorai/thruway-parking/workflows/lint/badge.svg)

</div>

# Stack

This application is completely build with TypeScript using Fastify and NextJS
to power up a server with Server Side Rendering capabilities for ReactJS.

Docker is also used to host a MongoDB instance.

For ReactJS components styles we are using TailwindCSS, composing utilities
with the `@apply` and `@screen` features.

Learn more here: [Composing Utilities with @apply](https://v1.tailwindcss.com/course/composing-utilities-with-apply)

# Usage

## Development

> You will need NodeJS v14.15.4 or greather installed to run this project.

1. Install dependencies

```bash
yarn install
```

This command will download all required dependencies for your project.

2. Run the development server

```bash
yarn run dev
```

Sources will be built and the project will be served on http://localhost:3000/.

## Production

For production use you must build both client and server source into plain
JavaScript.

A configuration for this come OOTB with the `build:production` npm script
will build both client and server sources separately and prepare a directory
with the files

1. Execute `yarn run build:production` to generate `./dist` directory
2. Execute `node ./dist/main.js`

The following output should be printed in your terminal

```log
$ node ./dist/main.js

> event - compiled successfully
```

## Docker

Run this project with Docker using the `Dockerfile` included.
First you must build the image using `docker build` command:

```bash
PORT=3000 docker build -t thruway .
```

Then run the container by using the `./bin/docker_run_default` script.

## Environment Variables

Check on `.env.sample` for an example of environment variable settings and
create a new `.env` file for your environment variable during development.

| Key                             | Description                                                                                                                                                                                                                                                          |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ADMIN_EMAIL`                   | Keep the `Email` value consistent for `bootstraping` to run successfully as this email is checked against database in order to create or not the admin user                                                                                                          |
| `ADMIN_PASSWORD`                | Admin password should only be defined the first time the application runs (when creating the admin user). Remember to updated this password in the future. If no password is defined the first time the application runs, `root` will be used as "fallback" password |
| `NEXT_TELEMETRY_DISABLED`       | Enable/Disable NextJS Telemery. https://nextjs.org/telemetry                                                                                                                                                                                                         |
| `JWT_TOKEN_COOKIE_NAME`         | JWT cookie name for HTTP Requests                                                                                                                                                                                                                                    |
| `JWT_REFRESH_TOKEN_COOKIE_NAME` | JWT refresh token cookie name for HTTP Requests                                                                                                                                                                                                                      |
| `JWT_REFRESH_TOKEN_EXPIRATION`  | JWT refresh token expiration times. The value provided is parsed with [zeit/ms](https://github.com/vercel/ms#examples) package. Make sure you provide a compatible value.                                                                                            |
| `APPLICATION_DOMAIN`            | Public application URL used for setting cookies on HTTP responses                                                                                                                                                                                                    |
| `COOKIE_SIGNATURE`              | Secret to sign the cookie using [cookie-signature](https://www.npmjs.com/package/cookie-signature)                                                                                                                                                                   |
| `JWT_EXPIRATION`                | JWT Expiration Time. The value provided is parsed with [zeit/ms](https://github.com/vercel/ms#examples) package. Make sure you provide a compatible value.                                                                                                           |
| `JWT_PRIVATE_KEY`               | JWT Private Key. [Read more](https://jwt.io/introduction/)                                                                                                                                                                                                           |
| `PORT`                          | Port to bind the server                                                                                                                                                                                                                                              |
| `MONGO_URL`                     | MongoDB Connection URL                                                                                                                                                                                                                                               |
| `MONGO_INITDB_ROOT_USERNAME`    | MongoDB Root Username                                                                                                                                                                                                                                                |
| `MONGO_INITDB_ROOT_PASSWORD`    | MongoDB Root Password                                                                                                                                                                                                                                                |

# Contributing

Every kind of contribution to this project is welcome, please, don't hesitate
to open a Pull Request or Issue. I will be happy to help!
