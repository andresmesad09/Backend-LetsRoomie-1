const auth = require('../components/auth/network');

const routes = function(app) {
    app.use('/auth', auth)
}

module.exports = routes;