import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing

const Header = () => {
  return (
    <header className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          Home
        </Link>

        {/* Navigation Buttons */}
        <nav className="space-x-4">
          {/* Play Quiz Button */}
          <Link to="/play-quiz" className="text-white hover:underline">
            Play Quiz
          </Link>

          {/* Signup Button */}
          <Link to="/signup" className="text-white hover:underline">
            Signup
          </Link>

          {/* Login Button */}
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;