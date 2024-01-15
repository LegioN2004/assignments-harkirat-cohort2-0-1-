const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "AeV8Gh$1kW*9Lp&zQ!bY2sNv5^F3rT8y";
const { Admin, Course } = require("../solution/db");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  // await Admin.create({
  //   username: username,
  //   password: password,
  // });
  // res.json({
  //   message: "Admin created successfully",
  // });

  const userExists = await Admin.findOne({
    username: username,
    password: password,
  });

  if (userExists) {
    res.json({
      message: "User already exists, give different credentials",
    });
  } else {
    const user = new Admin({
      username: username,
      password: password,
    });
    user.save();
    res.json({
      message: "Admin created successfully",
    });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  const userExists = await Admin.find({
    username,
    password,
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

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;
  const courseId = Math.floor(Math.random() * 10000).toString();
  // zod
  const newCourse = await Course.create({
    title,
    description,
    imageLink,
    price,
    courseId,
  });
  newCourse.save();
  res.json({
    message: "Course created successfully",
    courseId: courseId,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const courses = await Course.find({});
  res.json({
    courses: courses,
  });
});

module.exports = router;
