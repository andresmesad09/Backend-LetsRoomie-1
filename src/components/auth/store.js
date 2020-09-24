const Model = require('./model');

function addUser(user) {
    const myUser = new Model(user);
    myUser.save();
    return myUser
}

async function listUsers(filterUser) {
    let filter = {};
    if (filterUser !== null) {
        filter = {_id: filterUser}
    }
    const users = await Model.find(filter);
    return users
}

async function getAuthUser(filterUid) {
    let filter = {};
    if (filterUid !== null) {
        filter = {uid: filterUid}
    }
    const users = await Model.find(filter);
    return users
}

module.exports = {
    add: addUser,
    list: listUsers,
    getAuth: getAuthUser
}