import { useState } from "react";
import { Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (section: string) => {
    if (["Review", "Gallery", "Services"].includes(section)) {
      if (location.pathname !== "/") {
        // If we're not on the home page, navigate there first
        navigate("/", { state: { scrollTo: section.toLowerCase() } });
      } else {
        // If we're already on the home page, just scroll
        const element = document.getElementById(section.toLowerCase());
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes wiggle {
            0%, 100% { transform: rotate(-1deg) scale(1.1); }
            50% { transform: rotate(1deg) scale(1.1); }
          }
          .quote-button {
            transition: all 0.3s ease;
          }
          .quote-button:hover {
            animation: wiggle 0.2s ease-in-out infinite;
          }
        `}
      </style>
      <header
        className={`bg-[#005389] w-full relative ${
          isMenuOpen ? "z-[60]" : "z-50"
        }`}
      >
        <div className="w-full px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 ml-4">
              <Link
                to="/"
                className="hover:scale-110 transform transition-transform duration-300 inline-block"
              >
                <img
                  src="/logo.png"
                  alt="BeachClean Logo"
                  className="h-10 w-auto"
                  draggable="false"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-1 items-center justify-center">
              <div className="flex space-x-16">
                {["Review", "Gallery", "Services", "Contact", "FAQ"].map(
                  (item) =>
                    ["Review", "Gallery", "Services"].includes(item) ? (
                      <button
                        key={item}
                        onClick={() => handleNavigation(item)}
                        className="text-white relative group py-1 cursor-pointer"
                      >
                        <span className="relative inline-block transform transition-transform group-hover:scale-110 duration-300">
                          {item}
                        </span>
                        <span
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ff8c28] transform scale-x-0 
                                     group-hover:scale-x-100 transition-transform duration-300 origin-center"
                        />
                      </button>
                    ) : (
                      <Link
                        key={item}
                        to={`/${item.toLowerCase()}`}
                        className="text-white relative group py-1"
                      >
                        <span className="relative inline-block transform transition-transform group-hover:scale-110 duration-300">
                          {item}
                        </span>
                        <span
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ff8c28] transform scale-x-0 
                                     group-hover:scale-x-100 transition-transform duration-300 origin-center"
                        />
                      </Link>
                    )
                )}
              </div>
            </nav>

            {/* Desktop CTA Button */}
            <div className="hidden md:block flex-shrink-0 mr-4">
              <Link
                to="/contact"
                className="bg-[#ff8c28] text-white px-6 py-2 rounded quote-button inline-block"
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden text-white p-2 relative z-50 ${
                isMenuOpen ? "bg-[#0095cc]" : ""
              }`}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Dark Overlay */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Side Panel */}
          <div
            className={`fixed top-16 right-0 w-1/2 bg-white shadow-lg 
                          h-auto pb-6
                          transform transition-all duration-300 ease-out
                          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            {/* Mobile Navigation Links */}
            <div className="flex flex-col pt-8 px-6">
              {["Review", "Gallery", "Services", "Contact", "FAQ"].map((item) =>
                ["Review", "Gallery", "Services"].includes(item) ? (
                  <button
                    key={item}
                    onClick={() => {
                      handleNavigation(item);
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-700 py-4 text-lg hover:text-[#00b0f0] transition-colors duration-200 text-left"
                  >
                    {item}
                  </button>
                ) : (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase()}`}
                    className="text-gray-700 py-4 text-lg hover:text-[#00b0f0] transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                )
              )}
              <div className="h-px bg-gray-200 my-4" />
              <Link
                to="/contact"
                className="bg-[#ff8c28] text-white py-3 px-6 rounded text-center quote-button inline-block"
                onClick={() => setIsMenuOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
