import Logo from "../assets/Logo.png";
import Hero from "../assets/Hero.png";
import Course from "../components/Course";
import Angular from "../assets/Courses/angular.png";
import React from "../assets/Courses/react.png";
import Flutter from "../assets/Courses/flutter.png";
import BI from "../assets/Courses/BI.png";
import AI from "../assets/Courses/AI.png";
import Devops from "../assets/Courses/devops.png";
import Contact from "../components/Contact";
const Home = () => {
  return (
    <div className="flex flex-col ">
      <div className="p-3">
        <img src={Logo} alt="logo" className="w-1/3 h-44" />
      </div>
      <div className="relative">
        <img
          src={Hero}
          alt="hero"
          className="w-full md:h-[500px] lg:h-[700px]"
        />
        <div className="absolute md:py-5 lg:py-0 rounded-md bg-white/65 w-1/2 lg:h-1/2 top-[150px] left-1/2 -translate-x-1/2 items-center justify-center flex flex-col text-center">
          <p className=" md:text-[44px] lg:text-[56px] font-bold text-black">
            Improve your skills on your own
          </p>
          <p className="  text-[40px] lg:text-[52px] font-bold text-black">
            To prepare for a better future
          </p>
          <button className="flex items-center justify-center rounded-full w-1/2 md:mt-5 lg:mt-8">
            <p className="text-white bg-principal rounded-full py-2 px-5 font-medium text-[16px] ">
              REGISTER NOW
            </p>
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-10 px-16 w-full">
        <div className="flex justify-between  items-center w-full px-[200px]">
          <p className="text-black font-bold text-[60px]">
            Discover Our Courses
          </p>
          <button className="flex items-center justify-center rounded-full mt-5">
            <p className="text-white bg-principal rounded-full py-2 px-5 font-medium text-[16px] ">
              View More
            </p>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-5  mt-10">
          <Course image={Angular} title="Spring Boot / Angular" price="350" />
          <Course image={React} title="NodeJS / React" price="350" />
          <Course image={Flutter} title="Flutter / Firebase" price="350" />
          <Course image={BI} title="Business Intelligence" price="350" />
          <Course image={AI} title="Artificial Intelligence" price="350" />
          <Course image={Devops} title="Devops" price="350" />
        </div>
      </div>
      <div className="mt-10 p-8 flex items-center justify-center">
        <Contact />
      </div>
    </div>
  );
};

export default Home;
