const auth = require('../components/auth/network');
const profile = require('../components/profiles/network');
const place = require('../components/places/network');
const upload = require('../services/aws-upload');
const favorites = require('../components/favorites/network');

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../../swagger.json');

const routes = function(app) {
    app.use('/auth', auth)
    app.use('/', profile)
    app.use('/', place)
    app.use('/api/profile', upload)
    app.use('/', favorites)
    // Config swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}

module.exports = routes;