const express = require("express");
// expressはNode.jsのWebアプリケーションフレームワークで、簡単にサーバーを構築することができます。require("express")は、expressモジュールをインポートして変数expressに代入しています。
const app = express();
// express()は、Expressアプリケーションのインスタンスを作成するための関数です。これにより、app変数にExpressアプリケーションが格納されます。

const path = require("path");
// pathはNode.jsの組み込みモジュールで、ファイルパスを操作するための機能を提供します。require("path")は、pathモジュールをインポートして変数pathに代入しています。

const methodOverride = require("method-override");
// method-overrideは、HTMLフォームでPUTやDELETEなどのHTTPメソッドを使用できるようにするためのミドルウェアです。require("method-override")は、method-overrideモジュールをインポートして変数methodOverrideに代入しています。

const ejsMate = require("ejs-mate");
// ejs-mateは、EJSテンプレートエンジンの拡張機能で、レイアウトやパーシャルなどの機能を提供します。require("ejs-mate")は、ejs-mateモジュールをインポートして変数engineに代入しています。

const Campground = require("./models/campground");

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

app.set("view engine", "ejs");
// app.setは、Expressアプリケーションの設定を行うためのメソッドです。第一引数には設定の名前を指定し、第二引数には設定の値を指定します。
// ここでは、"view engine"という設定に対して"ejs"という値を指定しています。これにより、ExpressはEJSテンプレートエンジンを使用してビューをレンダリングするようになります。

app.set("views", path.join(__dirname, "views"));
// app.set("views", ...)は、Expressアプリケーションのビューのディレクトリを設定するためのコードです。
// path.join(__dirname, "views")は、現在のディレクトリ（__dirname）と"views"というサブディレクトリを結合して、ビューのパスを生成しています。
// これにより、Expressはビューを探す際にこのディレクトリを参照するようになります。

app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
// app.useは、Expressアプリケーションにミドルウェアを追加するためのメソッドです。ここでは、express.urlencoded({ extended: true })というミドルウェアを追加しています。

app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  // app.getはHTTP GETリクエストを処理するためのメソッドです。第一引数にはルートパスを指定し、第二引数にはリクエストとレスポンスを処理するためのコールバック関数を指定します。
  res.render("home");
  // res.renderは、ビューをレンダリングしてク
  // res.sendはレスポンスをクライアントに送信するためのメソッドです。引数には送信したいデータを指定します。ここでは文字列 "NomadCamp!!!" を送信しています。
});

app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find();
  res.render("campgrounds/index", { campgrounds });
  // {campgrounds}は、オブジェクトの短縮構文を使用して、campgroundsという変数をオブジェクトのプロパティとして渡しています。これにより、ビューでcampgroundsという名前でデータを参照できるようになります。
});

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

app.get("/campgrounds/:id", async (req, res) => {
  // :idは、URLパラメータを表すプレースホルダです。これにより、クライアントが/campgrounds/123のようなURLにアクセスした場合、:idは123に置き換えられます。
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/show", { campground });
});

app.post("/campgrounds", async (req, res) => {
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
  // res.redirectは、クライアントを指定したURLにリダイレクトするためのメソッドです。ここでは、保存されたキャンプ場のIDを使用して、そのキャンプ場の詳細ページにリダイレクトしています。
});

app.get("/campgrounds/:id/edit", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/edit", { campground });
});

app.put("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  //{id}の{}は、オブジェクトの分割代入を使用して、req.paramsからidプロパティを抽出しています。これにより、id変数にURLパラメータの値が格納されます。
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  // ...は、スプレッド構文を使用して、req.body.campgroundオブジェクトのプロパティを展開しています。これにより、更新するキャンプ場のデータが正しく渡されます。
  res.redirect(`/campgrounds/${campground._id}`);
});

app.delete("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
