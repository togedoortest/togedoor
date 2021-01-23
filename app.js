


const express = require("express");
var path = require('path');
var indexRouter = require('./routes/vindex');
var http = require('http');
const app = express();
var httpServer = http.createServer(app);

//require("dotenv").config();
require("./config/db")();

//  console.log(path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
var cors = require('cors')  //use this
// mdw
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()) 
//app.use(logger('dev'));
app.use("/uploads", express.static("uploads"));

//app.use(express.static('uploads'));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,OPTIONS,POST,PUT,PATCH"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   next();
// });
app.use('/', indexRouter);
//app.get("/", (req, res) => res.status(200).json({ message: "Atlantis App" }));
//app.get("/", (req, res) =>res.render('vindex', { title: 'Express' }));

app.use("/sendemail",require("./routes/sendEmail"))
app.use("/users", require("./routes/users"));
app.use("/services", require("./routes/services"));
app.use("/categories", require("./routes/categories"));
//app.use("users/categories", require("./routes/categories"));
app.use("/payments", require("./routes/payments"));
app.use("/subcategories", require("./routes/subCategories"));
// app.use("/ServiceGigProvider", require("./routes/ServiceGigProvider"));

const port = process.env.PORT || 9000;

//app.listen(PORT, () => {
  httpServer.listen(port, () => {
  console.log("Server started on port " + port + "...");
});
