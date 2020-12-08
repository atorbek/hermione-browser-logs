"use strict";

const fs = require("fs");
const globalHook = require("hermione-global-hook");
const parseConfig = require("./config");

const getBrowserLogs = (opts) => {
  return async function () {
    const { path, types } = parseConfig(opts);

    console.log(path, types);

    const logTypes = ["browser", "driver", "client", "server"];

    for (const type of types) {
      if (logTypes.includes(type)) {
        const msg = await this.browser.log(type);
        let logFile;

        try {
          logFile = fs.openSync(`${path}/${type}.log`, "a");
          fs.appendFileSync(logFile, `${JSON.stringify(msg)}\n\n`, "utf8");
        } catch (err) {
          console.error(err);
        } finally {
          if (logFile !== undefined) {
            fs.closeSync(logFile);
          }
        }
      }
    }
  };
};

module.exports = function (hermione, opts) {
  globalHook(hermione, {
    enabled: true,
    afterEach: getBrowserLogs(opts),
  });
};
