import { motion } from "framer-motion";
import { Edit2, Trash } from "lucide-react";
import { useState } from "react";

const CoursesList = () => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const courses = [
    {
      id: 1,
      name: "Web Development",
      price: 199.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Data Science",
      price: 249.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Graphic Design",
      price: 149.99,
      image: "https://via.placeholder.com/150",
    },
  ];

  const handleDelete = (courseId) => {
    console.log("Deleting course with ID:", courseId);
    setShowDeletePopup(false);
  };

  return (
    <>
      <motion.div
        className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Course Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={course.image}
                    alt={course.name}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">
                    {course.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    {course.price.toFixed(2)} DT/Month
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-400 hover:text-blue-300 mr-3">
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => {
                      setCourseToDelete(course);
                      setShowDeletePopup(true);
                    }}
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm">
            <h2 className="text-lg font-medium text-white mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this Course ?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-gray-600 text-gray-300 px-4 py-2 rounded-md mr-2 hover:bg-gray-500"
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => handleDelete(courseToDelete?.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoursesList;
