const auth = require('../components/auth/network');

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../../swagger.json');

const routes = function(app) {
    app.use('/auth', auth);
    // Config swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

}

module.exports = routes;