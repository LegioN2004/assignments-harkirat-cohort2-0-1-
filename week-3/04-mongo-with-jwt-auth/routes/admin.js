const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require("jsonwebtoken");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  const userExists = await Admin.findOne({
    username: username,
  });
  if (!userExists) {
    const user = new Admin({
      username: username,
      password: password,
    });
    user.save();
    res.json({
      message: "Admin created successfully",
    });
  } else {
    res.status(404).json({
      message: "User already exists, give different credentials",
    });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  const userExists = await Admin.findOne({
    username: username,
  });
  if (userExists) {
    const token = jwt.sign(
      { username: username, password: password },
      password,
    );
    res.json({
      message: "Admin account is present in db, you will get you token" + token,
    });
  } else {
    res.status(404).json({
      message: "User doesn't already exist, signin first with your credentials",
    });
  }
});

router.post("/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic
});

router.get("/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
});

module.exports = router;

