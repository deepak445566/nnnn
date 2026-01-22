import React from 'react'
import { useNavigate } from 'react-router-dom'

function Focus() {
  const navigate = useNavigate()

  const focusAreas = [
    {
      id: 1,
      title: "Education",
      image: "/images/mc1.avif",
      path: "/education",
      description: "Providing educational support and resources"
    },
    {
      id: 2,
      title: "Clothes",
      image: "/images/mc2.jpg",
      path: "/clothes",
      description: "Clothing assistance for those in need"
    },
    {
      id: 3,
      title: "Food",
      image: "/images/mc3.jpg",
      path: "/food",
      description: "Food distribution and nutritional support"
    },
    {
      id: 4,
      title: "Home & Shelter",
      image: "/images/mc4.jpg",
      path: "/shelter",
      description: "Providing safe shelter and housing"
    },
    {
      id: 5,
      title: "Animal Feed",
      image: "/images/mc5.jpg",
      path: "/animal-feed",
      description: "Animal feed distribution and welfare"
    }
  ]

  const handleFocusAreaClick = (path, title) => {
    // Navigate to the specific focus area page
    navigate(path)
    // Optional: Scroll to top when navigating
    window.scrollTo(0, 0)
  }

  return (
   <>
    <section className="py-16 px-8 lg:px-20 bg-white">
        <div className="container mx-auto" id="programs">
          <div className="text-center lg:mb-10">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 exo">
              Our Focus Areas
            </h2>
            <p className="text-xl text-gray-600 new max-w-3xl mx-auto">
              We are dedicated to providing comprehensive support for children, youth, and animal welfare
            </p>
          </div>

          {/* Services Grid - Circle Design */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap- md:gap-12 px-1 lg:px-4 -mt-10 lg:mt-0">
            {focusAreas.map((area) => (
              <div 
                key={area.id}
                className="flex flex-col items-center text-center group cursor-pointer"
                onClick={() => handleFocusAreaClick(area.path, area.title)}
                title={`Click to view ${area.title} programs`}
              >
                <div className="relative mb-4">
                  {/* Outer circle with hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#50C779] to-[#3EAE66] rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-all duration-500 scale-0 group-hover:scale-110"></div>
                  
                  {/* Main circle with image */}
                  <div className="relative h-32 w-32 md:h-36 md:w-36 lg:h-44 lg:w-44 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:border-[#50C779] transition-all duration-300 group-hover:shadow-2xl">
                    <img 
                      src={area.image} 
                      alt={area.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%2350C779'/%3E%3Cpath d='M50 30 L65 50 L60 70 L40 70 L35 50 Z' fill='white'/%3E%3Ccircle cx='50' cy='30' r='5' fill='%233EAE66'/%3E%3C/svg%3E";
                      }}
                    />
                    
                  </div>
                  
                  {/* Click indicator */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-[#50C779] text-white text-xs px-3 py-1 rounded-full shadow-lg">
                      View Details
                    </div>
                  </div>
                </div>
                
                {/* Content below circle */}
                <h3 className="text-lg md:text-xl font-bold mb-2 exo text-gray-800 group-hover:text-[#50C779] transition-colors duration-300">
                  {area.title}
                </h3>
                <p className="text-sm text-gray-600 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-[140px]">
                  {area.description}
                </p>
              </div>
            ))}
          </div>

          {/* Optional: Info text */}
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              Click on any focus area to learn more about our programs and initiatives
            </p>
          </div>
        </div>
      </section>
   </>
  )
}

export default Focus