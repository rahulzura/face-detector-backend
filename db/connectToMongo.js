module.exports = async (mongoose) => {
  mongoose.set('useFindAndModify', false);
  const uri = `${process.env.MONGO_HOST}`;
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, // for the deprecation warning of ensureIndex, use create index
  });
};
