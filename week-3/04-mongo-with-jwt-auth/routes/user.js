const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const JWT_SECRET = "AeV8Gh$1kW*9Lp&zQ!bY2sNv5^F3rT8y";
const { User, Course } = require("../solution/db");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  await User.create({
    username: username,
    password: password,
  });
  res.json({
    message: "Admin created successfully",
  });
  // const userExists = await User.find({
  //   username,
  //   password,
  // });

  // if (userExists) {
  //   res.json({
  //     message: "User already exists, give new credentials",
  //   });
  // } else {

  //   res.json({
  //     message: "User created successfully",
  //   });
  // }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  const userExists = await User.find({
    username,
  });
  if (userExists) {
    const token = jwt.sign({ username: username }, JWT_SECRET);
    res.json({
      message:
        "Admin account is present in db, you will get you token " + token,
    });
  } else {
    res.status(411).json({
      message:
        "Incorrect email or password or the user doesn't already exist, provide proper credentials",
    });
  }
});

router.get("/courses", (req, res) => {
  // Implement listing all courses logic
  res.json({
    courses: Course,
  });
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
  const courseid = req.params.courseId;
  res.json({
    message: "course purchased successfully",
  });
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
  res.json({
    purchasedCourses: Course,
  });
});

module.exports = router;
