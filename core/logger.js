if (process.env.BROWSER) {
  console.debug = console.log.bind(console, '%cDBG', 'color: #00893f; font-weight: bold')
  console.info = console.log.bind(console,  '%cINF', 'color: #007bff; font-weight: bold')
} else {
  const {inspect} = require('util')
  function logger(name, color) {
    return function() {
      // Get arguments without deoptimizing v8
      const args = []
      for (let i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] === 'object') {
          args.push(inspect(arguments[i], {
            colors: true,
            depth: 4,
            breakLength: Infinity
          }))
        } else {
          args.push(arguments[i])
        }
      }
      console.log('\u001b[3' + color + ';1m' + name + '\u001b[0m', ...args)
    }
  }

  // Enable color logging
  console.debug = logger('DBG', 6).bind(console)
  console.info = logger('INF', 2).bind(console)
  console.warn = logger('WRN', 3).bind(console)
  console.error = logger('ERR', 1).bind(console)
}
