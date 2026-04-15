// index.jsは、MongoDBに接続してCampgroundモデルを使用してデータを操作するためのコードが含まれています。
//ここにはexpressやpathないのは、index.jsはデータベースのシード（初期データの投入）を目的としているため、
// サーバーの設定やルーティングなどのコードは必要ありません。index.jsはMongoDBに接続し、Campgroundモデルを使用してデータを操作するためのコードが含まれています。
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/nomadcamp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB connection open!");
  })
  .catch((err) => {
    console.log("MongoDB connection error:");
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 21; i++) {
    const randomCityIndex = Math.floor(Math.random() * cities.length);
    const price = Math.floor(Math.random() * 2000) + 1000;
    const camp = new Campground({
      location: `${cities[randomCityIndex].prefecture}, ${cities[randomCityIndex].city}`,
      title: `${sample(descriptors)}・${sample(places)}`,
      image: `https://picsum.photos/400?random=${Math.random()}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque! Doloribus, voluptate. Voluptas, eaque! Doloribus, voluptate. Voluptas, eaque! Doloribus, voluptate.",
      price,
      // price: price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
