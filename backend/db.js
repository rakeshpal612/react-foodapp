const mongoose = require("mongoose");
const mongoURI =
  "mongodb://swdsm100042:Rakesh0614@ac-bvjsevl-shard-00-00.ejmbu2i.mongodb.net:27017,ac-bvjsevl-shard-00-01.ejmbu2i.mongodb.net:27017,ac-bvjsevl-shard-00-02.ejmbu2i.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-q9grll-shard-0&authSource=admin&retryWrites=true&w=majority";

const mongoDb = async () => {
  await mongoose
    .connect(mongoURI)
    .then(async () => {
      console.log("connected successfully");

      // new wway to retrieve data

      const fetchData = await mongoose.connection.db
        .collection("food_items")
        .find({});

      fetchData
        .toArray()
        .then(async (data) => {
          // console.log(data);
          const foodCategory = await mongoose.connection.db
            .collection("foodCategory")
            .find({});
          foodCategory
            .toArray()
            .then((catData) => {
              global.food_items = data;
              global.foodCategory = catData;
            })
            .catch((err) => console.log(err));
          // global.food_items = data;
        })
        .catch((err) => console.log(err));

      // global.food_items = fetchData;

      // old way to retrive data from db collection

      // fetchData.find({}).toArray(function (err, data) {
      // if (err) console.log("---", err);
      // else {
      // console.log(data);
      // global.food_items = data;
      // console.log(global.food_items);
      // }
      // });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoDb;
