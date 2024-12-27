const Contact = () => {
  return (
    <div className="bg-contact rounded-xl w-[800px] h-auto p-5 flex flex-col items-center justify-center">
      <p className="text-black font-bold text-[50px] mb-5">Contact Us</p>
      <form className="flex flex-col w-full space-y-4">
        <label className="flex flex-col">
          <span className="text-black font-medium text-[18px]">Name</span>
          <input
            type="text"
            placeholder="Enter your name"
            className="border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-principal"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-black font-medium text-[18px]">Email</span>
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-principal"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-black font-medium text-[18px]">Message</span>
          <textarea
            placeholder="Enter your message"
            className="border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-principal"
            rows="5"
          ></textarea>
        </label>
        <button
          type="submit"
          className="bg-principal text-white rounded-md py-2 px-4 font-medium hover:bg-principal-dark"
        >
          Send the Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
