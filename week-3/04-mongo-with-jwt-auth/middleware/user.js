function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const authorization = req.headers.authorization;
  const verification = jwt.verify(authorization, JWT_SECRET);

  if (verification) {
    next();
  } else {
    res.status(404).json({
      message:
        "The verification token is incorrect, provide correct credentials to get one or fix it",
    });
  }
}

module.exports = userMiddleware;

