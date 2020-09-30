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

async function listUsersByEmail(filterUser) {
    let filter = {};
    if (filterUser !== null) {
        filter = {email: filterUser}
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

async function deleteUser(id) {
    const data = await Model.findByIdAndDelete(id)
    return data
}

async function updateUser(id, data) {
    await Model.findByIdAndUpdate(id, data);
    const updatedUser = listUsers(id);
    return updatedUser
}

module.exports = {
    add: addUser,
    list: listUsers,
    delete: deleteUser,
    getAuth: getAuthUser,
    update: updateUser,
    listUsersByEmail:listUsersByEmail
}