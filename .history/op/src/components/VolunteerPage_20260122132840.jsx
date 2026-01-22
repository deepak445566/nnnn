

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

 import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const VolunteerPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  const volunteers = [
    // ... same volunteers array
  ];

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1);
        setIsMobile(true);
      } else if (width < 768) {
        setVisibleCount(2);
        setIsMobile(true);
      } else if (width < 1024) {
        setVisibleCount(3);
        setIsMobile(false);
      } else {
        setVisibleCount(4);
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % volunteers.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [volunteers.length]);

  const nextVolunteer = () => {
    setCurrentIndex((prev) => (prev + 1) % volunteers.length);
  };

  const prevVolunteer = () => {
    setCurrentIndex((prev) => (prev - 1 + volunteers.length) % volunteers.length);
  };

  // Get array of volunteers starting from currentIndex
  const getVisibleVolunteers = () => {
    const visibleVolunteers = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % volunteers.length;
      visibleVolunteers.push(volunteers[index]);
    }
    return visibleVolunteers;
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 exo">
      <div className="max-w-7xl mx-auto">
        {/* Header (same as above) */}

        {/* Slider Container */}
        <div className="relative mb-16 md:mb-20">
          {/* Navigation Buttons */}
          <button
            onClick={prevVolunteer}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-gray-700" />
          </button>

          <button
            onClick={nextVolunteer}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-gray-700" />
          </button>

          {/* Volunteers Container */}
          <div className="overflow-hidden">
            <div className="transition-all duration-500 ease-in-out">
              <div className={`grid ${isMobile ? 'grid-cols-1' : visibleCount === 3 ? 'grid-cols-3' : 'grid-cols-4'} gap-6 md:gap-8 lg:gap-10`}>
                {getVisibleVolunteers().map((volunteer, index) => (
                  <div key={`${volunteer.id}-${index}`} className="group text-center">
                    {/* Volunteer Card (same as above) */}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 md:mt-10 space-x-2">
            {volunteers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-[#50C779] w-6 md:w-8" 
                    : "bg-gray-300 hover:bg-gray-400 w-2 md:w-3"
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA Section (same as above) */}
      </div>
    </div>
  );
};

export default VolunteerPage;