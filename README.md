# hermione-browser-logs

Plugin for [hermione](https://github.com/gemini-testing/hermione), which gets and aggregate logs of browser to a file.
More info about hermione plugins in [hermione](https://github.com/gemini-testing/hermione#plugins).

## Installation

```bash
$ npm install hermione-browser-logs
```

__Note! Package isn't published in npm__

## Usage

Plugin has following configuration:

* **enabled** (optional) `Boolean` – enable/disable the plugin, by default plugin is enabled;
* **path** (optional) `String` - save logs by path;
* **types** (required) `Array` - a list of browser log types;


Add plugin to your `hermione` config file:

```js
module.exports = {
    // ...

    plugins: {
        'hermione-browser-logs': {
            enabled: true, // by default
            path: 'rootPath', // by default
            types: ['browser', 'driver', 'client', 'server']  // by default empty list
        }
    },

    // ...
};
```
