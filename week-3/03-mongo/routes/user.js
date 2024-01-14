const { Router } = require("express");
const router = Router();
const { Admin, User, Course } = require("../db"); // this line also added by me
const userMiddleware = require("../middleware/user");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  // const username = "user";
  // const password = "pass";
  const userExists = await User.findOne({
    username: username,
  });
  if (!userExists) {
    const user = new User({
      username: username,
      password: password,
    });
    user.save();
    res.json({
      message: "User created successfully",
    });
  } else {
    res.status(404).json({
      message: "User already exists, give different credentials",
    });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const username = req.headers.username;
  const password = req.headers.password;

  const userExists = await User.findOne({
    username: username,
    password: password,
  });

  if (userExists) {
    try {
      const allCourses = await Course.find({});
      res.json({
        courses: allCourses,
      });
    } catch (error) {
      res.status(404).json({
        message: "User doesn't exist, create an account to see the courses",
      });
    }
  } else {
    res.status(404).json({
      message: "User doesn't exist, create an account to see the courses",
    });
  }
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
  res.json({ message: "Course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  try {
    const allCourses = await Course.find({});
    res.json({
      courses: allCourses,
    });
  } catch (error) {
    res.status(404).json({
      message: "User doesn't exist, create an account to see the courses",
    });
  }
});

module.exports = router;
