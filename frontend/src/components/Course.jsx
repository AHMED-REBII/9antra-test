import PropTypes from "prop-types";

const Course = ({ image, title, price }) => {
  return (
    <div className="flex flex-col w-full h-[360px] bg-white rounded-md shadow-md p-5 m-5">
      <img src={image} alt={title} className="w-full h-[200px] rounded-md" />
      <div className="flex flex-col mt-5">
        <p className="text-black font-bold text-[24px]">{title}</p>
        <div className="flex items-center justify-between mt-5">
          <p className="text-principal font-bold text-[20px]">
            {price} DT/Month
          </p>
          <button className="flex items-center justify-center rounded-full">
            <p className="text-white bg-principal rounded-full py-2 px-5 font-medium text-[16px]">
              Register
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

Course.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Course;
