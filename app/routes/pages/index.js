module.exports = {
  path: 'home/',
  childRoutes: [
    {
      path: 'main/:page',
      getComponent (nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./home.jsx'))
        })
      }
    },
    {
      path: '*',
      getComponent (nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('../404.js'))
        })
      }
    },
   
    
  ]
}
