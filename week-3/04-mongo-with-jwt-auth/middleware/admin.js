// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const authorization = req.headers.authorization;
  const words = authorization.split(" "); // ["Bearer", "token"]
  const jwtToken = words[1]; // take the first index string from words i.e 1 token
  try {
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    if (decodedValue.username) {
      next();
    } else {
      res.status(403).json({
        msg: "You are not authenticated",
      });
    }
  } catch (e) {
    res.json({
      msg: "Incorrect inputs",
    });
  }
  // try {
  //   if (verification) {
  //     next();
  //   } else {
  //     res.status(404).json({
  //       message:
  //         "The verification token is incorrect, provide correct credentials to get one or fix it",
  //     });
  //   }
  // } catch (error) {}
}

module.exports = adminMiddleware;
