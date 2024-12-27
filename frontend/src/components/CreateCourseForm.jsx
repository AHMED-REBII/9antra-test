import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload } from "lucide-react";

const CreateCourseForm = () => {
  const [course, setCourse] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Course created successfully!");
      setCourse({ name: "", price: "", image: "" });
      setLoading(false);
    }, 1500);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setCourse({ ...course, image: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-principal">Create New Course</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
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
          <label htmlFor="price" className="block text-sm font-medium text-gray-300">
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
          {course.image && <span className="ml-3 text-sm text-gray-400">Image uploaded</span>}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-principal hover:bg-principal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-principal disabled:opacity-50"
          disabled={loading}
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
