// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const username = req.body.username;
  const password = req.body.password;

  const userExists = await Admin.findOne({
    username: username,
    password: password,
  });

  if (userExists) {
    next();
  } else {
    res.status(404).json({
      message: "User doesn't exist, create an admin account to create courses",
    });
  }
}

module.exports = adminMiddleware;

