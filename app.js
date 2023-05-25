const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const app = express();
const port = 8080;
const teacherRouter = require("./routes/teacherRoute");
const childRouter = require("./routes/childRoute");
const classRouter = require("./routes/classRoute");
const authenicatedRouter = require("./routes/authenticationRoute");
const authMW = require("./middlewares/validations/authenicatedMW");

// Connection With DataBase
mongoose
  .connect(process.env.DB_Connection)
  .then(() => {
    console.log("DB Connected 👌");
    app.listen(port, () => console.log(` app listening on port ${port}!`));
  })
  .catch((error) => console.log("DB Connection Failed ❌" + error));

// CORS MW : (cross origin resource sharing) => allow to share data within mutiple origin with different port number
// front work on port 3000, but data stored on server on port 8080

// app.use(cors(options)); //  if empty : any origin can access my data

// Morgan MW  =>>> HTTP request logger middleware
app.use(morgan("tiny")); // gives info about End Point(GET /"name") and status(404) , Timeof getting data(8 ms)

// morgan("combined") =>>>> gives date, request method, full URL, status code, os
// morgan("dev") =>>>> same as `Tiny` but status is colored
// morgan("common") =>>>> same as `combined` but briefed

// Settings

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/image", express.static("uploads")); // to get imgs

// Routes
app.use(authenicatedRouter); // Log-in
// app.use(authMW); // Authorization : Admin Or User ?

app.use(teacherRouter);
app.use(childRouter);
app.use(classRouter);

// Not Found MW
app.use((request, response, next) => {
  response.status(404).json({ message: "Page Not Found " }); // 404 :  indicates that the page not found
  // let error = new Error("Can't Find This Page ");
  // next(error);
});
// Errot MW
app.use((error, request, response, next) => {
  response.status(error.status || 500).json({ message: error + "" }); // 500 : indicates an internal server error.
});
