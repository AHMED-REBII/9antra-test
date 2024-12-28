import express from "express";
import multer from "multer";
import {
  createCourse,
  getallCourses,
  updateCourse,
  deleteCourse,
  getCourseById
} from "../controllers/course.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); 
  },
});

const upload = multer({ storage });

router.get("/", getallCourses);
router.get("/:id", getCourseById);
router.post("/create", upload.single("image"), createCourse);
router.patch("/:id", upload.single("image"), updateCourse); 
router.delete("/:id", deleteCourse);

export default router;
