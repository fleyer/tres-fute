// preact-cli loads preact.config.js through the `esm` package, which crashes on
// recent Node versions. The config is CommonJS, so a plain require is enough.
const Module = require('module')
const originalLoad = Module._load

Module._load = function (request, ...args) {
  if (request === 'esm') return (mod) => mod.require.bind(mod)
  return originalLoad.call(this, request, ...args)
}
