const { User } = require("../db");
// this thing also got imported

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const username = req.headers.username;
  const password = req.headers.password;
  const courseId = req.params.courseId;
  const userExists = await User.findOne({
    username: username,
    password: password,
    // id: Course
  });

  if (userExists) {
    next();
  } else {
    res.status(404).json({
      msg: "Give proper course id or credentials or make a new one",
    });
  }
}

module.exports = userMiddleware;
