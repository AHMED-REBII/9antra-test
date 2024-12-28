import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, Upload } from "lucide-react";
import { createCourse, updateCourse, getCourseById } from "../api/courseAPI"; 

const CreateUpdateCourseForm = () => {
  const { courseId } = useParams(); 
  const location = useLocation(); 
  const [course, setCourse] = useState({
    name: "",
    price: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // To redirect to /admin
  const isEditMode = Boolean(courseId); 

  useEffect(() => {
    if (location.state?.courseData) {
      setCourse({
        name: location.state.courseData.name,
        price: location.state.courseData.price,
        image: null,
      });
    } else if (isEditMode) {
      const fetchCourseData = async () => {
        try {
          const response = await getCourseById(courseId);
          setCourse({
            name: response.name,
            price: response.price,
            image: null,
          });
        } catch (error) {
          console.error("Error fetching course:", error);
          alert("Error fetching course data.");
        }
      };
      fetchCourseData();
    }
  }, [courseId, location.state, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!course.image && !isEditMode) {
      alert("Please upload an image.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", course.name);
    formData.append("price", course.price);
    if (course.image) formData.append("image", course.image);

    try {
      let response;
      if (isEditMode) {
        response = await updateCourse(courseId, formData); 
      } else {
        response = await createCourse(formData); 
      }

      alert(response.message); 
      setCourse({ name: "", price: "", image: null });

      // Redirect to /admin after update
      navigate("/admin"); 

    } catch (error) {
      console.error(error);
      alert("Error processing the course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourse({ ...course, image: file });
    }
  };

  const isFormValid =
    course.name && course.price && (isEditMode || course.image);

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-principal">
          {isEditMode ? "Update Course" : "Create New Course"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Course Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={course.name}
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-principal focus:border-principal"
              required
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-300"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={course.price}
              onChange={(e) => setCourse({ ...course, price: e.target.value })}
              step="0.01"
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-principal focus:border-principal"
              required
            />
          </div>

          <div className="mt-1 flex items-center">
            <input
              type="file"
              id="image"
              className="sr-only"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label
              htmlFor="image"
              className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-principal"
            >
              <Upload className="h-5 w-5 inline-block mr-2" />
              Upload Image
            </label>
            {course.image && (
              <span className="ml-3 text-sm text-gray-400">Image uploaded</span>
            )}
          </div>

          {isEditMode && course.image && (
            <div className="mt-2">
              <img
                src={`http://localhost:5000/${course.image}`}
                alt={course.name}
                className="w-20 h-20 rounded-md"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-principal hover:bg-principal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-principal disabled:opacity-50"
            disabled={loading || !isFormValid}
          >
            {loading ? (
              <>
                <span className="mr-2 h-5 w-5 animate-spin">⏳</span>
                Loading...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-5 w-5" />
                {isEditMode ? "Update Course" : "Create Course"}
              </>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateUpdateCourseForm;
