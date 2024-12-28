import { PlusCircle, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import CreateUpdateCourseForm from "../components/CreateUpdateCourseForm";
import CoursesList from "../components/CoursesList";

const tabs = [
  { id: "create", label: "Create Course", icon: PlusCircle },
  { id: "courses", label: "Courses", icon: ShoppingBasket },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold mb-8 text-principal text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Interface
        </motion.h1>

        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-principal text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "create" && (
          <CreateUpdateCourseForm isEditMode={false} />
        )}
        {activeTab === "courses" && <CoursesList />}
      </div>
    </div>
  );
};
export default AdminPage;
