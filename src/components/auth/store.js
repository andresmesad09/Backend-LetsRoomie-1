const Model = require('./model');

function addUser(user) {
    const myUser = new Model(user);
    myUser.uid = user.uid;
    myUser.save();
}

async function listUsers(filterUser) {
    let filter = {};
    if (filterUser !== null) {
        filter = {uid: filterUser}
    }
    const users = await Model.find(filter);
    return users
}

module.exports = {
    add: addUser,
    list: listUsers
}