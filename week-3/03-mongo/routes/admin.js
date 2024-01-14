const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { default: mongoose } = require("mongoose");
const { Admin, User, Course } = require("../db");
const router = Router();

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

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageLink = req.body.imageLink;
  const id = Math.floor(Math.random() * 10000).toString();

  const course = new Course({
    id: id,
    title: title,
    description: description,
    price: price,
    imageLink: imageLink,
  });
  course.save();

  res.json({
    message: "Course created successfully",
    courseId: id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const username = req.headers.username;
  const password = req.headers.password;

  const userExists = await Admin.findOne({
    username: username,
    password: password,
  });

  if (userExists) {
    // TODO: don't forget to use 'try-catch' with 'find' to find as well as print(if needed) all the elements from the mongoose object
    try {
      const allCourses = await Course.find({}); // this line just prints all the users so it doesn't take any input at the first brace and the second brace indicates that it should not show any password
      res.status(200).json({ allCourses });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(404).json({
      message: "User doesn't exist, create an account to see the courses",
    });
  }
});

module.exports = router;
