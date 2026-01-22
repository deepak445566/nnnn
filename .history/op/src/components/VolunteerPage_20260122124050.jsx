import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const VolunteerPage = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [isMobile, setIsMobile] = useState(false);

  const handleJoin = () => {
    navigate("/volunteer/register");
  };

  const volunteers = [
    {
      id: 1,
      name: "Sapna Sharma",
      image: "/images/vo1.jpg",
      role: "Education Volunteer",
      description: "5+ years experience in child education"
    },
    {
      id: 2,
      name: "Rinki Sharma",
      image: "/images/vo2.jpg",
      role: "Field Operations",
      description: "8+ years in community development"
    },
    {
      id: 3,
      name: "Sanjana Yadav",
      image: "/images/vo3.jpg",
      role: "Nutrition Specialist",
      description: "Nutritionist with 6+ years experience"
    },
    {
      id: 4,
      name: "Ravi Sharma",
      image: "/images/vo4.png",
      role: "Healthcare Volunteer",
      description: "Medical professional with 5+ years experience"
    },
    {
      id: 5,
      name: "Pooja Sharma",
      image: "/images/vo6.jpg",
      role: "Healthcare Volunteer",
      description: "Medical professional with 5+ years experience"
    },
    {
      id: 6,
      name: "Hirdesh",
      image: "/images/vo7.jpg",
      role: "Healthcare Volunteer",
      description: "Medical professional with 5+ years experience"
    },
    {
      id: 7,
      name: "Amit Patel",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      role: "Community Outreach",
      description: "3+ years in grassroots initiatives"
    },
    {
      id: 8,
      name: "Priya Singh",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      role: "Education Specialist",
      description: "7+ years teaching underprivileged children"
    }
  ];

  // Calculate total slides based on number of volunteers and slides to show
  const totalSlides = Math.ceil(volunteers.length / slidesToShow);

  // Handle responsive slides
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSlidesToShow(1);
        setIsMobile(true);
      } else if (width < 768) {
        setSlidesToShow(2);
        setIsMobile(true);
      } else if (width < 1024) {
        setSlidesToShow(3);
        setIsMobile(false);
      } else {
        setSlidesToShow(4);
        setIsMobile(false);
      }
      setCurrentSlide(0); // Reset to first slide on resize
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0); // Loop back to start
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else {
      setCurrentSlide(totalSlides - 1); // Loop to end
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Calculate which volunteers to show based on current slide
  const getVisibleVolunteers = () => {
    const startIndex = currentSlide * slidesToShow;
    return volunteers.slice(startIndex, startIndex + slidesToShow);
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 exo">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block bg-[#50C779]/10 text-[#50C779] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Dedicated Team
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6 exo">
            Meet Our <span className="text-[#50C779]">Volunteers</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate individuals committed to making a difference
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative mb-12 md:mb-16">
          {/* Navigation Buttons - Desktop */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-gray-700" />
          </button>

          {/* Slider */}
          <div ref={sliderRef} className="overflow-hidden">
            <div 
              className="transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`
              }}
            >
              <div className="flex">
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div 
                    key={slideIndex} 
                    className="flex-shrink-0 w-full"
                    style={{ width: `${100 / totalSlides}%` }}
                  >
                    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 px-2 md:px-0`}>
                      {volunteers
                        .slice(slideIndex * slidesToShow, slideIndex * slidesToShow + slidesToShow)
                        .map((volunteer) => (
                          <div key={volunteer.id} className="group text-center">
                            {/* Circular Container */}
                            <div className="relative mb-4">
                              {/* Outer Glow - Visible on hover for desktop */}
                              <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#50C779] to-[#3EAE66] rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-all duration-700 scale-0 group-hover:scale-110"></div>
                              
                              {/* Main Circle - Responsive sizing */}
                              <div className="relative h-32 w-32 sm:h-36 sm:w-36 md:h-40 md:w-40 lg:h-44 lg:w-44 xl:h-48 xl:w-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg md:shadow-xl group-hover:border-[#50C779] transition-all duration-300">
                                <img 
                                  src={volunteer.image} 
                                  alt={volunteer.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/200x200/50C779/ffffff?text=Volunteer";
                                  }}
                                />
                                
                                {/* Overlay on Hover - Desktop only */}
                                <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                  <div className="transform translate-y-8 group-hover:translate-y-30 transition-transform duration-300">
                                    <div className="text-white text-sm xl:text-base font-bold">{volunteer.name}</div>
                                    <div className="text-white/90 text-xs xl:text-sm mt-1">{volunteer.role}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Text Below Circle */}
                            <div className="max-w-full mx-auto px-1">
                              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1 group-hover:text-[#50C779] transition-colors duration-300">
                                {volunteer.name}
                              </h3>
                              <p className="text-sm md:text-base text-gray-600 font-medium mb-1">
                                {volunteer.role}
                              </p>
                              <p className="text-xs md:text-sm text-gray-500">
                                {volunteer.description}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 md:mt-10 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? "bg-[#50C779] w-6 md:w-8" 
                    : "bg-gray-300 hover:bg-gray-400 w-2 md:w-3"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="flex justify-center space-x-4 mt-6 md:hidden">
            <button
              onClick={prevSlide}
              className="bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Join Us CTA */}
        <div className="text-center mb-10">
          <div className="bg-gradient-to-r from-[#50C779]/10 to-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 max-w-4xl mx-auto border border-gray-100">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6 exo">
              Ready to Make a Difference?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
              Join our team of dedicated volunteers and help transform lives
            </p>
            <button 
              onClick={handleJoin} 
              className="bg-gradient-to-r from-[#50C779] to-[#3EAE66] hover:from-[#3EAE66] hover:to-[#50C779] text-white px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg lg:text-xl transition-all duration-300 shadow-lg md:shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
            >
              Join as Volunteer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerPage;