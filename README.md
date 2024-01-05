# Logging

![npm](https://img.shields.io/npm/v/%40co-digital%2Flogging)
![Static Badge](https://img.shields.io/badge/test_coverage-%E2%89%A595%25-green)

## Overview and Scope

The logging is a dedicated component in the software project responsible for recording and managing log entries for NodeJS projects. It separates the concerns of logging from the core application code and offers several advantages like clean code, customisation configurations of levels, formats etc and it can can be easily integrated with log analysis tools and external services. It will give us a reusable and consistent format and structure throughout the application/s, and thanks to that we can improve performance monitoring and security auditing.

The logger module integrates other best practice configurations and tools, such as Prettier for code formatting, a linter for code quality, and includes a Makefile for task automation, and other tools. These tools help maintain code quality, consistency, and automate routine development tasks.

## Installing

```sh
npm i @co-digital/logging
```

### Config variables

Following configs will need to be added as environment variables to the application

Key             |  Description               | Example Value            |  Required |
----------------|--------------------------- |------------------------- |---------- |
LOG_LEVEL       | Logging levels        | `info` (Log only if info.level is less than or equal to this level)        | True |
HUMAN           | Formatting messages form (default JSON) | `true` (Enable human formatting for log messages)        | False |

## Files Structure

Directory Path | Description
--- | ---
`./formatting/` | This folder contains formatting available for the Winston module, humanFormat.ts and jsonFormat.ts  as basic format.
`./config/` | This folder contains configuration settings for the logger module. It is essential for customising the behaviour of the logger according to the application's requirements. The configuration options are (levels, colours, level, humanReadable and others)
`./type/` | This folder defines data types, includes TypeScript interfaces that describe the structure and shape of various objects used in the module, for example LoggerOptions, LogMetaData and others
`./util/` | This folder contains utility functions that are used throughout the logger module
`./ApplicationLogger.ts` | ApplicationLogger is the only class on the logging module. It is a class that wraps a Logger instance and provides default  and request logging methods for each defined set levels (error, info and debug).
`./index.ts` | Contains the createLogger(namespace: string): ApplicationLogger, and it is a function used by the application to initialise the logger and create the log methods, and it returns an instance of ApplicationLogger
`./test` | Jest Test files (`*.spec.ts`, `setup.ts`, and `*.mocks.ts`)
Others files | Other files related to modules dependency, CI/CD, *git, dockerization, lint, test/typescript configs …

## Formatting

The `createFormat(options: LoggerOptions): Logger` function is used to create a logging format for the logger module, and it can generate logs in either human-readable or JSON format, depending on the provided `LoggerOptions`.

- `options` (parameter): An object of type LoggerOptions that defines the format and behavior of the logger.

- `Logger` (return type): The function returns an instance of a Logger that is configured based on the provided options. The Logger would have methods for various log levels (e.g., debug, info, error) and be responsible for creating log entries in the specified format.

## Logger Class

`ApplicationLogger` is the only class on the logging module. It is a class that wraps a Logger instance and provides default and request logging methods for each defined set levels (`error`, `info` and `debug`).

It has a constructor that takes a Logger instance as a parameter to initialise the logger attribute.
It provides methods for different logging levels, including `debug()`, `info()`, and `error()`, which take a message as input.
We could add more levels but I think those three will cover all our scenario.
It also provides methods for request-based logging at each level, such as `debugRequest()`, `infoRequest()`, and `errorRequest()`, which take a `Request` (express object) and a `message` as input.

## Integration

```sh
npm i @co-digital/logging
```

Once it is installed, you need to create a `logger.ts` utility, as shown below, and use it when required. Obviously we are going to use the singleton pattern.

```typescript
// logger.ts
import { ApplicationLogger } from "@co-digital/logging/lib/ApplicationLogger";
import { createLogger } from "@co-digital/logging";

import { APPLICATION_NAME } from "../config";

let logger: ApplicationLogger | undefined = undefined;

export const log = (!logger) ? (logger = createLogger(APPLICATION_NAME)) : logger;

// Middleware example
import { NextFunction, Request, Response } from 'express';
import { log } from '../utils/logger';

export const logger = (req: Request, _res: Response, next: NextFunction) => {
    log.infoRequest(req, `${req.method} ${req.path}`);
    next();
};
```

## Contributing

```sh
## Set Node/NPM env
nvm use

## Installing & Building
make build

## Testing & Coverage
make test
#or
make coverage
```
