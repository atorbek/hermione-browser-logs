"use strict";

const rootPath = require("app-root-path");
const { root, section, option } = require("gemini-configparser");

const ENV_PREFIX = "hermione_browser_logs_";
const CLI_PREFIX = "--browser-logs-";

const assertRequestedType = (name, type) => {
  type = [].concat(type);

  return (v) => {
    const result = type.some((t) => v.constructor.name === t);

    if (!result) {
      throw new Error(
        `"${name}" option must be: ${type.join(" or ")}, but got ${typeof v}`
      );
    }
  };
};

const assertString = (name) => assertRequestedType(name, "String");
const assertArray = (name) => assertRequestedType(name, "Array");

const getParser = () => {
  return root(
    section({
      path: option({
        defaultValue: rootPath,
        validate: assertString("path"),
      }),
      types: option({
        defaultValue: [],
        validate: assertArray("types"),
      }),
    }),
    { envPrefix: ENV_PREFIX, cliPrefix: CLI_PREFIX }
  );
};

module.exports = (options) => {
  const { env, argv } = process;

  return getParser()({ options, env, argv });
};
