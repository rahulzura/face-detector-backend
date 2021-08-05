const Clarifai = require("clarifai");
const UserModel = require('../db/models/user.js');

const app = new Clarifai.App({
  apiKey: process.env.API_CLARIFAI
});

const handleApiCall = async (req, res) => {
  console.log(req.body.input)
  const data = await app.models.predict("a403429f2ddf4b49b307e318f00e528b", req.body.input);
  res.json(data);
};

const handleImage = async (req, res) => {
  const { email } = req.body;
  console.log("email", email)
  await UserModel.updateMany({email}, { $inc: { imageCount: 1 }});
  const user = await UserModel.findOne({email});
  res.json(user.imageCount);
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
};
