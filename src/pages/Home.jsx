// Home.jsx

import React from "react";

const Home = () => {
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Welcome to Quiz App</h2>
      <p className="text-lg mb-4">
        To take the quiz, please{" "}
        <span className="text-blue-500 hover:underline cursor-pointer">
          log in
        </span>{" "}
        or{" "}
        <span className="text-green-500 hover:underline cursor-pointer">
          sign up
        </span>
        .
      </p>
      {/* Additional content or links can be added here */}
    </div>
  );
};

export default Home;
