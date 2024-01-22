const mongoose = require("mongoose");
let dotenv = require("dotenv");
dotenv.config();
var url = process.env.MONGOLAB_URL;

mongoose.connect(url);

const user = mongoose.model("Users", {
  username: String,
  password: String,
});

const todo = mongoose.model("Todos", {
  name: String,
  desc: String,
  interest1: String,
  interest2: String,
  interest3: String,
  linkedin: String,
  instagram: String,
});

module.exports({
  todo: todo,
});
