const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1/TeachrateDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("Database connected successfully");
});

const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
