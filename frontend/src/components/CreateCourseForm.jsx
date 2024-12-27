import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload } from "lucide-react";
import { createCourse } from "../api/courseAPI"; // Import createCourse function

const CreateCourseForm = () => {
  const [course, setCourse] = useState({
    name: "",
    price: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Log course data before submission
    console.log('Course data before submission:', course);

    // Check if image is selected, if not, alert user
    if (!course.image) {
      alert("Please upload an image.");
      setLoading(false);
      return;
    }

    // Create a FormData object to handle image file
    const formData = new FormData();
    formData.append("name", course.name);
    formData.append("price", course.price);
    formData.append("image", course.image); // Append image correctly

    // Log form data before sending
    console.log("Sending the following data to the server:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]); // Debugging to see data before sending
    }

    try {
      // Call createCourse with the formData
      const response = await createCourse(formData); 
      console.log(response);

      // Handle success response
      alert(response.message);  // Assuming 'message' is returned on success
      setCourse({ name: "", price: "", image: null });  // Reset the form

    } catch (error) {
      console.error("Error creating course:", error.response ? error.response.data : error.message);
      alert("Error creating course, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file);
    if (file) {
      setCourse({ ...course, image: file });
    }
  };

  // Check if all fields are valid before enabling the submit button
  const isFormValid = course.name && course.price && course.image;

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-principal">
        Create New Course
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

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-principal hover:bg-principal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-principal disabled:opacity-50"
          disabled={loading || !isFormValid} // Disable if not valid or loading
        >
          {loading ? (
            <>
              <span className="mr-2 h-5 w-5 animate-spin">⏳</span>
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Course
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateCourseForm;
