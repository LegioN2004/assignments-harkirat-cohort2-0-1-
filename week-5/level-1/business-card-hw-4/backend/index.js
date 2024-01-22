const express = require("express");
const { db } = require("./db.js");
const { types } = require("./types.js");
const app = express();

app.use(express.json());

app.post("/signup", function (req, res) {
  const username = types.safeParse(req.body.username);
  const password = types.safeParse(req.body.password);

  db.create({});
});
app.get("/signin");
app.put("/todos");
app.delete("/todos");
