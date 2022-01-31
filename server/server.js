require("dotenv/config");
require("./db/index.js");

//Variables
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4777;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");



const path = require('path')
app.use(express.static(path.join(__dirname, "public"))) // MIDDLEWARE DE CONFIGURACIÓN

//Middleware de body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Middleware de sessions
require("./config/session.config")(app);


app.use("/api", require("./routes/auth.js"));

// error handling
app.use((req, res, next) => {
  // this middleware runs whenever requested page is not available
  res.status(404).json({errorMessage: "not-found"});
});


app.use((err, req, res, next) => {
  // whenever you call next(err), this middleware will handle the error
  console.error("ERROR", req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500).render("error");
  }
});

//App listener
app.listen(PORT, () => {
  console.log((`Server running in port ${PORT}`));
});