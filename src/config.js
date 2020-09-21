require('dotenv').config();

module.exports = {
    dbUrl: process.env.DB_URL || 'mongodb+srv://db_admin_user:PlatziMaster123@castordams.nocgb.mongodb.net/lets_rommie?retryWrites=true&w=majority',
    port: process.env.PORT || 4000,
    host: process.env.HOST || 'http//localhost'
}