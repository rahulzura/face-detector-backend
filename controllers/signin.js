const bcrypt = require('bcrypt');
const UserModal = require('../db/models/user');

const handleSignin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('incorrect form submission')
  }

  const users = await UserModal.find({email}).select(['name', 'email', 'imageCount', 'password']);
  const user = users[0];
  if (user) {
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const {password, _id, ...userData} = user.toObject(); // change the mongoose doc to object then destructure
      res.json(userData); // send everything except password and _id
    }
    else res.json("Wrong email or password");
  } else {
    res.json("No such user");
  }
}

module.exports = { handleSignin };