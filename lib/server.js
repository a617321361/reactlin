'use strict'

let os = require('os')

function getIp () {
  var interfaces = os.networkInterfaces()
  for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
      var address = interfaces[k][k2]
      if (address.family === 'IPv4' && !address.internal) {
        return address.address
      }
    }
  }
  return '127.0.0.1'
}

module.exports = function (options) {
  var express = require('express')
  var bodyParser = require('body-parser')
  var path = require('path')

  // require the page rendering logic
  var Renderer = options.prerender ? require('../build/prerender/main.js') : require('../config/SimpleRenderer.js')
console.log(111,options)
  // load bundle information from stats
  var stats = require('../build/stats.json')

  var publicPath = stats.publicPath

  var indexRenderer = new Renderer({
    styleUrl: options.separateStylesheet && (publicPath + 'main.css?' + stats.hash),
    scriptUrl: publicPath + [].concat(stats.assetsByChunkName.index)[0],
    commonsUrl: publicPath + [].concat(stats.assetsByChunkName.commons)[0]
  }, 'react')
 
  var app = express()
 
  // serve the static assets
  app.use('/_assets', express.static(path.join(__dirname, '..', 'build', 'public'), {
    maxAge: '200d' // We can cache them as they include hashes(我们可以缓存它们，因为它们包含哈希)
  }))
  
  app.use('/static', express.static(path.join(__dirname, '..', 'static'), {}))

  app.use(bodyParser.json())

  // load REST API
  require('./api')(app)

  // application
  app.get('/*', function (req, res) {
    let renderer = indexRenderer

    renderer.render(
      function (err, html) {
        if (err) {
          res.statusCode = 500
          res.contentType = 'text; charset=utf8'
          res.end(err.message)
          return
        }
        res.contentType = 'text/html; charset=utf8'
        res.end(html)
      }
    )
  })

  var port = process.env.PORT || options.defaultPort || 18080
  app.listen(port, function () {
    console.log('Server listening on http://' + getIp() + ':' + port)
  })
}
