const jwt = require("jsonwebtoken");
const password = 1412412;

const value = {
  name: "Harkirat",
  email: "dummy@gmail.com",
  accountNumber: 3141234,
};

const token = jwt.sign(value, password);
