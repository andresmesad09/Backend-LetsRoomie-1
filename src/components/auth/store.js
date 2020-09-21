const Model = require('./model');

function addUser(user) {
    const myUser = new Model(user);
    myUser._id = user._id;
    myUser.save();
}

async function listUsers(filterUser) {
    let filter = {};
    if (filterUser !== null) {
        filter = {name: filterUser}
    }
    const users = await Model.find(filter);
    return users
}

module.exports = {
    add: addUser,
    list: listUsers
}