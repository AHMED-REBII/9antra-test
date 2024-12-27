import Course from "../models/course.model.js";

export const createCourse = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price || !req.file) {
      return res
        .status(400)
        .json({ message: "All fields are required, including the image" });
    }

    const newCourse = new Course({
      name,
      price,
      image: req.file.path,
    });

    const savedCourse = await newCourse.save();

    res.status(201).json({
      message: "Course created successfully",
      course: savedCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getallCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    const updatedCourses = courses.map((course) => ({
      ...course.toObject(),
      image: course.image.replace(/\\/g, "/"),
    }));

    res.status(200).json({
      message: "Courses retrieved successfully",
      courses: updatedCourses,
    });
  } catch (error) {
    console.error("Error retrieving courses:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const updatedData = { name, price };

    if (req.file) {
      updatedData.image = req.file.path.replace(/\\/g, "/");
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      message: "Course deleted successfully",
      course: deletedCourse,
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
