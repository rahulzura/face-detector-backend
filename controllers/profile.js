const UserModel = require('../db/models/user.js');

const handleProfile = (req, res) => {
  const { id } = req.params;

  
  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
      res.json(user[0]);
      } else {
        throw Error;
      }
    })
    .catch(err => res.status(400).json('Not Found!'));
}

module.exports = { 
  handleProfile: handleProfile
};