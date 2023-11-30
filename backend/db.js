const mongoose = require("mongoose");
const mongoURI =
  "mongodb://swdsm100042:Rakesh0614@ac-bvjsevl-shard-00-00.ejmbu2i.mongodb.net:27017,ac-bvjsevl-shard-00-01.ejmbu2i.mongodb.net:27017,ac-bvjsevl-shard-00-02.ejmbu2i.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-q9grll-shard-0&authSource=admin&retryWrites=true&w=majority";

const mongoDb = async () => {
  await mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(async () => {
      console.log("connected successfully");
      const fetchData = await mongoose.connection.db.collection("food_items");
      fetchData.find({}).toArray(function (err, data) {
        if (err) console.log("---", err);
        else console.log(data);
      });
    })
    .catch((err) => {
      console.error();
    });
};

module.exports = mongoDb;
