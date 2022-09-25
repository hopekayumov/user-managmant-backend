const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const adminTableRoutes = require("./routes/adminTableRoutes");
const User = require("./models/user.model");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(
    "mongodb+srv://umidjon:umidjon1332@cluster0.7klne2e.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() =>
    app.listen(process.env.PORT || 1337, () => {
      console.log("Server is running");
    })
  )
  .catch((err) => console.log(err));

app.use(authRoutes);
app.use(adminTableRoutes);
