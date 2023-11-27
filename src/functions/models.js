const modelsPath = require('../../package.json').modelsPath;
const User_Model = require(`${modelsPath}/User.js`);
const prueba = async () => {
   const users = await User_Model.find()
   console.log(users);

}
prueba()
module.exports = {
    User_Model
}