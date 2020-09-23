const auth = require('../components/auth/network');
const profile = require('../components/profiles/network');
const place = require('../components/places/network');
const routes = function(app) {
    app.use('/auth', auth)
    app.use('/', profile)
    app.use('/', place)
}

module.exports = routes;