import { motion } from "framer-motion";
import { Edit2, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { getAllCourses, deleteCourse } from "../api/courseAPI"; 
import { useNavigate } from "react-router-dom"; 

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(5); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
        alert("Error fetching courses, please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    try {
      await deleteCourse(courseId); 
      setCourses(courses.filter(course => course._id !== courseId));
      setShowDeletePopup(false); 
    } catch (error) {
      console.error("Error deleting course:", error.message);
      alert("Error deleting course. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading courses...</div>;
  }

  const indexOfLastCourse = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(courses.length / itemsPerPage);

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
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Image
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Course Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {currentCourses.map((course) => (
              <tr key={course._id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={`http://localhost:5000/${course.image}`}
                    alt={course.name}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{course.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{course.price.toFixed(2)} DT/Month</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {/* Edit button now navigates to the edit page */}
                  <button 
                    className="text-blue-400 hover:text-blue-300 mr-3"
                    onClick={() => {
                      navigate(`/edit-course/${course._id}`, {
                        state: { courseData: course }
                      });
                    }}
                  >
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

      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-gray-700 hover:bg-gray-600 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-3 text-sm text-black">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white bg-gray-700 hover:bg-gray-600 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm">
            <h2 className="text-lg font-medium text-white mb-4">Confirm Delete</h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this Course?
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
                onClick={() => handleDelete(courseToDelete?._id)}
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
