const mongoose = require("mongoose");
// mongooseはNode.jsのMongoDBオブジェクトモデリングツールで、MongoDBとNode.jsアプリケーションを簡単に連携させるためのライブラリです。require("mongoose")は、mongooseモジュールをインポートして変数mongooseに代入しています。

const Schema = mongoose.Schema;
// mongoose.Schemaは、MongoDBのドキュメントの構造を定義するためのクラスです。Schemaを使用して、データベースに保存されるドキュメントのフィールドやデータ型を指定することができます。

const campgroundSchema = new Schema({
  title: String,
  price: Number,
  image: String,
  description: String,
  location: String,
});

module.exports = mongoose.model("Campground", campgroundSchema);
// mongoose.model("Campground", campgroundSchema)は、"Campground"という名前のモデルを作成し、campgroundSchemaを使用してその構造を定義しています。
// これにより、Campgroundモデルを使用してMongoDBのコレクションにドキュメントを保存したり、クエリを実行したりすることができます。module.exportsは、このモデルを他のファイルで使用できるようにエクスポートしています。
