```
 ____  _ _                                 _   _
| __ )| (_)___ ___  __ _ _ __ _____      _| |_| |__
|  _ \| | / __/ __|/ _` | '__/ _ \ \ /\ / / __| '_ \
| |_) | | \__ \__ \ (_| | | | (_) \ V  V /| |_| | | |
|____/|_|_|___/___/\__, |_|  \___/ \_/\_/  \__|_| |_|
                   |___/
```

[GitHub Project board](https://github.com/users/bettiolo/projects/1)

> FictionalAPI wants to build an API connection repository/manager. A service that allows developers to submit credentials for an integration, and then use the service to call the underlying integration. The vision is that the service would handle credentials life-cycle management, data transformations, end-user integration management and so on. Owning all parts of the API/Integrations management.

![~/call example](docs/example-call.png)
![Unit Tests](docs/tests--unit.png)
![E2E Tests](docs/tests--e2e.png)

## Setup

This project is built using [Nest](https://github.com/nestjs/nest) framework.

Learn about NestJS:

- https://youtu.be/0M8AYU_hPas
- https://youtu.be/4ZW9LQvUs9k
- https://youtu.be/C250DCwS81Q

## Installation

Tools used:
- `.nvmrc` with `fnm` for consistent nodejs versioning
- `prettier` for standardised code (auto)formatting
- `eslint` to find code issues
- `insomnia` to test the API endpoints
 
```bash
$ npm install
```

## Running the app

```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

To access the app visit [localhost:3000](http://localhost:3000) on your browser

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

This exercise is licensed under [Attribution-NonCommercial-ShareAlike 4.0 International](LICENSE). The code cannot used for commercial purposes.
