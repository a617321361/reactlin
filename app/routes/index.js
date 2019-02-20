import BaseApplication from './base/BaseApplication'

module.exports = {
  name: 'app',
  component: BaseApplication,
  childRoutes: [{
      path: '/',
      childRoutes: [
        require('./pages'),
        require('./404')
      ]
    }
  ]
}
