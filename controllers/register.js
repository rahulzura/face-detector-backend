const UserModel = require('../db/models/user.js');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
  const { email, name, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json('Incorrect form submission');
  }

  const hash = await bcrypt.hash(password, 10);
  try {
    const existingUsers = await UserModel.find({email});
    if (existingUsers.length) {
      res.json({status: 'fail', msg: "User already exists"});
      return;
    }

    const userData = {name, email, password: hash};
    const result = await UserModel.insertMany([userData]);
    console.log(result);
    res.json({status: 'ok', user: {name: result.name, email: result.email, imageCount: result.imageCount}});
  } catch (err) {
    console.error(err);
    res.status(400).json('unable to register');
  }
}

module.exports = {
  handleRegister: handleRegister
}