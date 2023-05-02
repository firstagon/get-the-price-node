const UserSession = require("../models/user");

module.exports = defaultRequest = async (req) => {

    // console.log(UserSession.log().then(res => console.log(res)))
    console.log(req.session);
}